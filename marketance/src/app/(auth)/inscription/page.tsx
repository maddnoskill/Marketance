import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { SignUpForm } from "./form";

export const metadata: Metadata = { title: "Créer un compte" };

export default function SignUpPage() {
  return (
    <AuthShell
      title="Créer un compte"
      intro="Gratuit. Vos données financières restent privées : personne d'autre ne peut les voir."
      footer={<p>Déjà un compte ? <Link href="/connexion" className="text-accent underline">Se connecter</Link></p>}
    >
      <SignUpForm />
    </AuthShell>
  );
}
