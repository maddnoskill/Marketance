"use client";

import { useActionState } from "react";
import { Field, FormMessage, SubmitButton } from "@/components/form";
import type { FormState } from "@/lib/validation/auth";
import { signIn } from "../actions";

export function SignInForm({ next }: { next: string }) {
  const [state, action] = useActionState(signIn, {} as FormState);
  return (
    <form action={action} className="grid gap-4" noValidate>
      <FormMessage error={state.error} />
      <input type="hidden" name="suite" value={next} />
      <Field id="email" label="Courriel" type="email" autoComplete="email" required error={state.fieldErrors?.email} />
      <Field id="password" label="Mot de passe" type="password" autoComplete="current-password" required error={state.fieldErrors?.password} />
      <SubmitButton pendingLabel="Connexion…">Se connecter</SubmitButton>
    </form>
  );
}
