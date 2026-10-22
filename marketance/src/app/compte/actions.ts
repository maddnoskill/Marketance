"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { fieldErrorsOf, profileSchema, type FormState } from "@/lib/validation/auth";

export async function updateProfile(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = profileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: fieldErrorsOf(parsed.error) };

  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims.sub;
  if (!userId) return { error: "Votre session a expiré. Reconnectez-vous." };

  const { error } = await supabase.from("profiles").update({ display_name: parsed.data.displayName }).eq("id", userId);
  if (error) return { error: "Le profil n'a pas été enregistré. Réessayez dans un instant." };
  revalidatePath("/compte");
  return { success: "Profil enregistré." };
}
