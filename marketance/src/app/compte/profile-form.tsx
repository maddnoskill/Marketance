"use client";

import { useActionState } from "react";
import { Field, FormMessage, SubmitButton } from "@/components/form";
import type { FormState } from "@/lib/validation/auth";
import { updateProfile } from "./actions";

export function ProfileForm({ displayName }: { displayName: string }) {
  const [state, action] = useActionState(updateProfile, {} as FormState);
  return (
    <form action={action} className="grid gap-4" noValidate>
      <FormMessage error={state.error} success={state.success} />
      <Field id="displayName" label="Nom ou pseudonyme" defaultValue={displayName} maxLength={80} required error={state.fieldErrors?.displayName} />
      <SubmitButton pendingLabel="Enregistrement…">Enregistrer</SubmitButton>
    </form>
  );
}
