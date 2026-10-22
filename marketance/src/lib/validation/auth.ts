import { z } from "zod";

const email = z.string().trim().toLowerCase().email("Entrez une adresse courriel valide.").max(254);
const password = z
  .string()
  .min(10, "Le mot de passe doit contenir au moins 10 caractères.")
  .max(128, "Le mot de passe doit contenir au plus 128 caractères.");

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Entrez votre mot de passe."),
});

export const signUpSchema = z.object({
  displayName: z.string().trim().min(1, "Entrez votre nom ou un pseudonyme.").max(80, "80 caractères au maximum."),
  email,
  password,
  consent: z.literal("on", { error: "Vous devez accepter la politique de confidentialité pour créer un compte." }),
});

export const resetRequestSchema = z.object({ email });

export const newPasswordSchema = z
  .object({ password, confirm: z.string() })
  .refine((v) => v.password === v.confirm, { path: ["confirm"], message: "Les deux mots de passe ne correspondent pas." });

export const profileSchema = z.object({
  displayName: z.string().trim().min(1, "Entrez votre nom ou un pseudonyme.").max(80, "80 caractères au maximum."),
});

/** Ne garde qu'un chemin interne (« /compte ») pour éviter les redirections vers un autre site. */
export function safeNextPath(value: unknown, fallback = "/compte"): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallback;
  }
  return value;
}

export type FormState = {
  error?: string;
  success?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

export function fieldErrorsOf(error: z.ZodError): FormState["fieldErrors"] {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
