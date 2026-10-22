"use client";

import { useFormStatus } from "react-dom";

export function Field({
  id,
  label,
  error,
  hint,
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; error?: string; hint?: string }) {
  const describedBy = [error ? `${id}-erreur` : null, hint ? `${id}-aide` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-ink aria-invalid:border-red-600"
        {...input}
      />
      {hint && !error ? (
        <p id={`${id}-aide`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-erreur`} className="text-sm font-bold text-red-700 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SubmitButton({ children, pendingLabel }: { children: React.ReactNode; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-accent px-4 py-2 font-bold text-accent-ink disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export function FormMessage({ error, success }: { error?: string; success?: string }) {
  if (error) {
    return (
      <p role="alert" className="rounded-lg border border-red-600 px-3 py-2 font-bold text-red-700 dark:text-red-400">
        {error}
      </p>
    );
  }
  if (success) {
    return (
      <p role="status" className="rounded-lg border border-accent bg-accent-soft px-3 py-2 font-bold">
        {success}
      </p>
    );
  }
  return null;
}
