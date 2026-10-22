import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function PrivacyPage() {
  return (
    <main className="mx-auto grid w-full max-w-2xl gap-5 px-4 py-12 sm:px-6">
      <Link href="/" className="font-display text-xl font-extrabold">Marketance</Link>
      <h1 className="font-display text-3xl font-extrabold">Politique de confidentialité</h1>
      <p role="note" className="rounded-lg border border-line bg-surface px-3 py-2 text-sm">
        Version préliminaire pour la phase de développement. Elle sera complétée et relue avant toute ouverture au public,
        conformément à la Loi 25 du Québec.
      </p>
      <section className="grid gap-2">
        <h2 className="font-display text-xl font-semibold">Ce que nous recueillons</h2>
        <p>Votre adresse courriel, votre mot de passe (enregistré sous forme chiffrée, jamais lisible), le nom ou pseudonyme que vous choisissez et votre fuseau horaire.</p>
      </section>
      <section className="grid gap-2">
        <h2 className="font-display text-xl font-semibold">Pourquoi</h2>
        <p>Uniquement pour créer votre compte, vous connecter et vous envoyer les courriels nécessaires (activation, mot de passe oublié). Aucune publicité, aucune revente.</p>
      </section>
      <section className="grid gap-2">
        <h2 className="font-display text-xl font-semibold">Où sont vos données</h2>
        <p>Dans une base de données hébergée au Canada (région Canada Central de Supabase). Chaque utilisateur ne peut voir que ses propres données.</p>
      </section>
      <section className="grid gap-2">
        <h2 className="font-display text-xl font-semibold">Vos droits</h2>
        <p>Vous pouvez consulter, corriger ou faire supprimer vos renseignements en tout temps. Une adresse de contact du responsable de la protection des renseignements personnels sera publiée ici avant l&apos;ouverture au public.</p>
      </section>
    </main>
  );
}
