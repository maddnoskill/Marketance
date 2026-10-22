import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid max-w-xl gap-4 px-4 py-16 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-wider text-muted">Erreur 404</p>
      <h1 className="font-display text-3xl font-extrabold">Cette page n&apos;existe pas</h1>
      <p className="text-muted">Le lien est peut-être incomplet, ou la page a été déplacée.</p>
      <Link href="/" className="w-fit rounded-lg bg-accent px-4 py-2 font-bold text-accent-ink">
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
