import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { ResetRequestForm } from "./form";

export const metadata: Metadata = { title: "Mot de passe oublié" };

export default function ResetRequestPage() {
  return (
    <AuthShell
      title="Mot de passe oublié"
      intro="Entrez votre courriel : nous vous enverrons un lien pour choisir un nouveau mot de passe."
      footer={<Link href="/connexion" className="text-accent underline">Retour à la connexion</Link>}
    >
      <ResetRequestForm />
    </AuthShell>
  );
}
