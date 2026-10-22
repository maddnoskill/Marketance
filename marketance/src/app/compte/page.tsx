import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "../(auth)/actions";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = { title: "Mon compte" };

const roleLabels: Record<string, string> = { client: "Client", provider: "Fournisseur", admin: "Administrateur" };

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) redirect("/connexion?suite=/compte");

  const [{ data: profile }, { data: roles }] = await Promise.all([
    supabase.from("profiles").select("display_name, timezone").single(),
    supabase.from("user_roles").select("role"),
  ]);

  return (
    <main className="mx-auto grid w-full max-w-2xl gap-6 px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="font-display text-xl font-extrabold">Marketance</Link>
        <form action={signOut}>
          <button type="submit" className="rounded-lg border border-line px-4 py-2 font-bold">Se déconnecter</button>
        </form>
      </div>
      <h1 className="font-display text-3xl font-extrabold">Mon compte</h1>

      <section className="grid gap-4 rounded-xl border border-line bg-surface p-5" aria-labelledby="h-profil">
        <h2 id="h-profil" className="font-display text-xl font-semibold">Profil</h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-muted">Courriel</dt>
          <dd className="min-w-0 break-words">{String(claims.claims.email ?? "")}</dd>
          <dt className="text-muted">Fuseau horaire</dt>
          <dd>{profile?.timezone ?? "America/Toronto"}</dd>
          <dt className="text-muted">Rôles</dt>
          <dd>{(roles ?? []).map((r) => roleLabels[r.role] ?? r.role).join(", ") || "Aucun"}</dd>
        </dl>
        <ProfileForm displayName={profile?.display_name ?? ""} />
      </section>

      <section className="grid gap-2 rounded-xl border border-line bg-surface p-5" aria-labelledby="h-securite">
        <h2 id="h-securite" className="font-display text-xl font-semibold">Sécurité</h2>
        <Link href="/compte/nouveau-mot-de-passe" className="w-fit text-accent underline">Changer mon mot de passe</Link>
      </section>
    </main>
  );
}
