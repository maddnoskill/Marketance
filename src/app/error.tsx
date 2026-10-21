"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto grid max-w-xl gap-4 px-4 py-16 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-wider text-muted">Erreur</p>
      <h1 className="font-display text-3xl font-extrabold">Un problème est survenu</h1>
      <p className="text-muted">Vos données n&apos;ont pas été modifiées. Réessayez dans un instant.</p>
      <button type="button" onClick={reset} className="w-fit rounded-lg bg-accent px-4 py-2 font-bold text-accent-ink">
        Réessayer
      </button>
    </main>
  );
}
