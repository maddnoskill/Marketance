import { z } from "zod";
import { isIsoDate } from "@/lib/dates/calendar";
import { MAX_CENTS } from "@/lib/money/cents";

/**
 * Validation d'une opération reçue du formulaire. Sera réutilisée côté serveur :
 * le navigateur ne fait jamais foi.
 */
export const transactionInputSchema = z
  .object({
    kind: z.enum(["income", "expense", "transfer"]),
    status: z.enum(["planned", "completed"]),
    amountCents: z
      .number()
      .int("Le montant doit être en cents entiers.")
      .positive("Le montant doit être supérieur à 0 $.")
      .max(MAX_CENTS, "Le montant est trop élevé."),
    occurredOn: z.string().refine(isIsoDate, "Choisissez une date valide."),
    accountId: z.string().min(1, "Choisissez un compte."),
    toAccountId: z.string().min(1).nullish(),
    categoryId: z.string().min(1).nullish(),
    label: z.string().trim().min(1, "Ajoutez une courte description.").max(80, "80 caractères au maximum."),
  })
  .superRefine((tx, ctx) => {
    if (tx.kind === "transfer") {
      if (!tx.toAccountId) {
        ctx.addIssue({ code: "custom", path: ["toAccountId"], message: "Choisissez le compte de destination." });
      } else if (tx.toAccountId === tx.accountId) {
        ctx.addIssue({ code: "custom", path: ["toAccountId"], message: "Choisissez un compte différent du compte de départ." });
      }
      if (tx.categoryId) {
        ctx.addIssue({ code: "custom", path: ["categoryId"], message: "Un transfert n'a pas de catégorie." });
      }
    } else if (!tx.categoryId) {
      ctx.addIssue({ code: "custom", path: ["categoryId"], message: "Choisissez une catégorie." });
    }
  });

export type TransactionInput = z.infer<typeof transactionInputSchema>;
