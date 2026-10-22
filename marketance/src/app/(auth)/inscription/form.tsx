"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, FormMessage, SubmitButton } from "@/components/form";
import type { FormState } from "@/lib/validation/auth";
import { signUp } from "../actions";

export function SignUpForm() {
  const [state, action] = useActionState(signUp, {} as FormState);
  if (state.success) return <FormMessage success={state.success} />;
  return (
    <form action={action} className="grid gap-4" noValidate>
      <FormMessage error={state.error} />
      <Field id="displayName" label="Nom ou pseudonyme" autoComplete="nickname" maxLength={80} required error={state.fieldErrors?.displayName} />
      <Field id="email" label="Courriel" type="email" autoComplete="email" required error={state.fieldErrors?.email} />
      <Field
        id="password"
        label="Mot de passe"
        type="password"
        autoComplete="new-password"
        minLength={10}
        required
        hint="Au moins 10 caractères. Une courte phrase est plus sûre et plus facile à retenir."
        error={state.fieldErrors?.password}
      />
      <div className="grid gap-1">
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="consent" className="mt-1 size-4 accent-[var(--accent)]" aria-describedby="consent-erreur" />
          <span>
            J&apos;ai lu la <Link href="/confidentialite" className="text-accent underline">politique de confidentialité</Link> et
            j&apos;accepte que mes renseignements soient traités comme elle le décrit.
          </span>
        </label>
        {state.fieldErrors?.consent ? (
          <p id="consent-erreur" className="text-sm font-bold text-red-700 dark:text-red-400">{state.fieldErrors.consent}</p>
        ) : null}
      </div>
      <SubmitButton pendingLabel="Création du compte…">Créer mon compte</SubmitButton>
    </form>
  );
}
