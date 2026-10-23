const modules = [
  {
    id: "finances",
    title: "Mes finances",
    text: "Revenus, dépenses, budgets, comptes et patrimoine net, calculés au cent près.",
    status: "Prochain module",
    next: true,
    icon: (
      <path d="M3 17l5-5 4 4 8-8M14 8h6v6" />
    ),
  },
  {
    id: "organisation",
    title: "Organisation",
    text: "Tâches, calendrier, notes et rappels dans un espace privé.",
    status: "Prévu après les finances",
    next: false,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
  },
  {
    id: "marketplace",
    title: "Marketplace",
    text: "Services et applications numériques offerts par des gens d'ici.",
    status: "Prévu ensuite",
    next: false,
    icon: (
      <>
        <path d="M4 9l1.5-5h13L20 9" />
        <path d="M4 9h16v11H4zM9 20v-6h6v6" />
      </>
    ),
  },
];

const highlights = ["Calculé au cent près", "Fait au Québec", "Vos données restent privées"];

export default function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2.5 font-display text-xl font-extrabold">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-xl bg-gold text-lg text-gold-ink shadow-sm"
            >
              M
            </span>
            Marketance
          </a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-7 sm:flex">
            {modules.map((m) => (
              <a key={m.id} href={`#${m.id}`} className="font-bold text-muted transition-colors hover:text-ink">
                {m.title}
              </a>
            ))}
          </nav>
          <a
            href="#modules"
            className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            Découvrir
          </a>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-16 px-4 py-8 sm:px-6 sm:py-12">
        <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-hero-from to-hero-to px-6 py-14 text-white shadow-xl sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-gold opacity-25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-16 -z-10 size-72 rounded-full bg-[#4b6bd6] opacity-30 blur-3xl"
          />
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-bold">
            <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-gold" />
            Version de développement
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight font-extrabold text-balance sm:text-6xl">
            Vos finances, votre organisation et vos services, <span className="text-gold">au même endroit.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            L&apos;application est en cours de construction : aucun compte ne peut encore être créé.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#modules"
              className="rounded-full bg-gold px-6 py-3 font-bold text-gold-ink shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Voir les modules
            </a>
            <a
              href="#finances"
              className="rounded-full border border-white/30 px-6 py-3 font-bold transition-colors hover:bg-white/10"
            >
              Le prochain module →
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-gold">✓</span>
                {h}
              </li>
            ))}
          </ul>
        </section>

        <section id="modules" aria-labelledby="modules-titre" className="grid scroll-mt-24 gap-6">
          <div className="grid gap-2">
            <p className="text-sm font-bold tracking-wider text-gold-text uppercase">Ce qui s&apos;en vient</p>
            <h2 id="modules-titre" className="font-display text-3xl font-extrabold sm:text-4xl">
              Trois modules, une seule app
            </h2>
          </div>
          <ul className="grid gap-5 sm:grid-cols-3">
            {modules.map((m) => (
              <li
                key={m.id}
                id={m.id}
                className={`group grid scroll-mt-24 content-start gap-4 rounded-2xl border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                  m.next ? "border-gold" : "border-line"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid size-12 place-items-center rounded-xl ${
                    m.next ? "bg-gold text-gold-ink" : "bg-accent-soft text-accent"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {m.icon}
                  </svg>
                </span>
                <h3 className="font-display text-xl font-extrabold">{m.title}</h3>
                <p className="text-muted">{m.text}</p>
                <p
                  className={`w-fit rounded-full px-3 py-1 text-sm font-bold ${
                    m.next ? "bg-gold-soft text-gold-text" : "bg-accent-soft text-accent"
                  }`}
                >
                  {m.status}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted sm:px-6">
          © {new Date().getFullYear()} Marketance · Fait au Québec
        </p>
      </footer>
    </>
  );
}
