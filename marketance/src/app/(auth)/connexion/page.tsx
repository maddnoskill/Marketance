import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { safeNextPath } from "@/lib/validation/auth";
import { SignInForm } from "./form";

export const metadata: Metadata = { title: "Connexion" };

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ suite?: string; erreur?: string }> }) {
  const { suite, erreur } = await searchParams;
  return (
    <AuthShell
      title="Connexion"
      intro={erreur === "lien" ? "Ce lien est expiré ou a déjà été utilisé. Connectez-vous, ou demandez un nouveau lien." : undefined}
      footer={
        <>
          <Link href="/mot-de-passe-oublie" className="text-accent underline">Mot de passe oublié ?</Link>
          <p>
            Pas encore de compte ? <Link href="/inscription" className="text-accent underline">Créer un compte</Link>
          </p>
        </>
      }
    >
      <SignInForm next={safeNextPath(suite)} />
    </AuthShell>
  );
}
