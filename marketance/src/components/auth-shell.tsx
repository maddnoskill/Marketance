import Link from "next/link";

export function AuthShell({ title, intro, children, footer }: { title: string; intro?: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <main className="mx-auto grid w-full max-w-md gap-6 px-4 py-12 sm:px-6">
      <Link href="/" className="font-display text-xl font-extrabold">
        Marketance
      </Link>
      <div className="grid gap-2">
        <h1 className="font-display text-3xl font-extrabold text-balance">{title}</h1>
        {intro ? <p className="text-muted">{intro}</p> : null}
      </div>
      <div className="grid gap-4 rounded-xl border border-line bg-surface p-5">{children}</div>
      {footer ? <div className="grid gap-2 text-sm">{footer}</div> : null}
    </main>
  );
}
