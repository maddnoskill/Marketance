"use client";

import { useActionState } from "react";
import { Field, FormMessage, SubmitButton } from "@/components/form";
import type { FormState } from "@/lib/validation/auth";
import { updatePassword } from "../../(auth)/actions";

export function NewPasswordForm() {
  const [state, action] = useActionState(updatePassword, {} as FormState);
  if (state.success) return <FormMessage success={state.success} />;
  return (
    <form action={action} className="grid gap-4" noValidate>
      <FormMessage error={state.error} />
      <Field id="password" label="Nouveau mot de passe" type="password" autoComplete="new-password" minLength={10} required hint="Au moins 10 caractères." error={state.fieldErrors?.password} />
      <Field id="confirm" label="Confirmez le mot de passe" type="password" autoComplete="new-password" required error={state.fieldErrors?.confirm} />
      <SubmitButton pendingLabel="Enregistrement…">Changer le mot de passe</SubmitButton>
    </form>
  );
}
