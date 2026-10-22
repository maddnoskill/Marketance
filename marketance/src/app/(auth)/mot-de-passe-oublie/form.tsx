"use client";

import { useActionState } from "react";
import { Field, FormMessage, SubmitButton } from "@/components/form";
import type { FormState } from "@/lib/validation/auth";
import { requestPasswordReset } from "../actions";

export function ResetRequestForm() {
  const [state, action] = useActionState(requestPasswordReset, {} as FormState);
  if (state.success) return <FormMessage success={state.success} />;
  return (
    <form action={action} className="grid gap-4" noValidate>
      <FormMessage error={state.error} />
      <Field id="email" label="Courriel" type="email" autoComplete="email" required error={state.fieldErrors?.email} />
      <SubmitButton pendingLabel="Envoi…">Recevoir un lien</SubmitButton>
    </form>
  );
}
