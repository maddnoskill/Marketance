import Link from "next/link";

const modules = [
  {
    title: "Mes finances",
    text: "Revenus, dépenses, budgets, comptes et patrimoine net, calculés au cent près.",
    status: "En construction : prochain module",
  },
  {
    title: "Organisation",
    text: "Tâches, calendrier, notes et rappels dans un espace privé.",
    status: "Prévu après les finances",
  },
  {
    title: "Marketplace",
    text: "Services et applications numériques offerts par des gens d'ici.",
    status: "Prévu ensuite",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6">
      <header className="grid gap-3">
        <p className="text-sm font-bold uppercase tracking-wider text-muted">Version de développement</p>
        <h1 className="font-display text-4xl font-extrabold text-balance sm:text-5xl">Marketance</h1>
        <p className="max-w-prose text-lg text-muted">
          Vos services, vos finances et votre organisation au même endroit. L&apos;application est en cours de
          construction. Vous pouvez déjà créer un compte.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/inscription" className="rounded-lg bg-accent px-4 py-2 font-bold text-accent-ink">Créer un compte</Link>
          <Link href="/connexion" className="rounded-lg border border-line px-4 py-2 font-bold">Se connecter</Link>
        </div>
      </header>
      <ul className="grid gap-4 sm:grid-cols-3">
        {modules.map((m) => (
          <li key={m.title} className="grid content-start gap-2 rounded-xl border border-line bg-surface p-5">
            <h2 className="font-display text-xl font-semibold">{m.title}</h2>
            <p className="text-muted">{m.text}</p>
            <p className="text-sm font-bold text-accent">{m.status}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
