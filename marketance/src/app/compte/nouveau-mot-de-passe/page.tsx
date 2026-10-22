import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { NewPasswordForm } from "./form";

export const metadata: Metadata = { title: "Nouveau mot de passe" };

export default function NewPasswordPage() {
  return (
    <AuthShell title="Nouveau mot de passe" footer={<Link href="/compte" className="text-accent underline">Retour à mon compte</Link>}>
      <NewPasswordForm />
    </AuthShell>
  );
}
