"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  fieldErrorsOf,
  newPasswordSchema,
  resetRequestSchema,
  safeNextPath,
  signInSchema,
  signUpSchema,
  type FormState,
} from "@/lib/validation/auth";

async function siteOrigin() {
  const h = await headers();
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

const GENERIC_ERROR = "Un problème est survenu. Réessayez dans un instant.";

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = signInSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: fieldErrorsOf(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    if (error.code === "email_not_confirmed") {
      return { error: "Confirmez d'abord votre adresse : ouvrez le lien reçu par courriel." };
    }
    if (error.status === 429) return { error: "Trop de tentatives. Patientez quelques minutes avant de réessayer." };
    return { error: "Courriel ou mot de passe incorrect." };
  }
  redirect(safeNextPath(formData.get("suite")));
}

export async function signUp(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: fieldErrorsOf(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { display_name: parsed.data.displayName },
      emailRedirectTo: `${await siteOrigin()}/auth/callback?suite=/compte`,
    },
  });
  if (error) {
    if (error.code === "weak_password") return { fieldErrors: { password: "Ce mot de passe est trop facile à deviner. Choisissez-en un autre." } };
    if (error.status === 429) return { error: "Trop de demandes. Patientez quelques minutes avant de réessayer." };
    // On ne révèle pas si l'adresse existe déjà.
    if (error.code !== "user_already_exists") return { error: GENERIC_ERROR };
  }
  return {
    success: "Presque terminé ! Ouvrez le courriel que nous venons d'envoyer et cliquez sur le lien pour activer votre compte.",
  };
}

export async function requestPasswordReset(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = resetRequestSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: fieldErrorsOf(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${await siteOrigin()}/auth/callback?suite=/compte/nouveau-mot-de-passe`,
  });
  if (error?.status === 429) return { error: "Trop de demandes. Patientez quelques minutes avant de réessayer." };
  // Même message que l'adresse existe ou non, pour ne rien révéler.
  return { success: "Si un compte existe avec cette adresse, un lien de réinitialisation vient d'y être envoyé." };
}

export async function updatePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = newPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: fieldErrorsOf(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) {
    if (error.code === "same_password") return { fieldErrors: { password: "Choisissez un mot de passe différent de l'ancien." } };
    if (error.code === "weak_password") return { fieldErrors: { password: "Ce mot de passe est trop facile à deviner. Choisissez-en un autre." } };
    return { error: GENERIC_ERROR };
  }
  return { success: "Votre mot de passe a été changé." };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/connexion");
}
