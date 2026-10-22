import { describe, expect, it } from "vitest";
import { transactionInputSchema } from "@/lib/validation/transaction";

const base = { kind: "expense", status: "completed", amountCents: 4250, occurredOn: "2026-10-20", accountId: "chq", categoryId: "epicerie", label: "Épicerie" } as const;

describe("transactionInputSchema", () => {
  it("accepte une dépense valide", () => {
    expect(transactionInputSchema.safeParse(base).success).toBe(true);
  });
  it("refuse un montant à virgule, nul ou négatif", () => {
    for (const amountCents of [42.5, 0, -100]) {
      expect(transactionInputSchema.safeParse({ ...base, amountCents }).success).toBe(false);
    }
  });
  it("refuse une date impossible", () => {
    expect(transactionInputSchema.safeParse({ ...base, occurredOn: "2026-02-30" }).success).toBe(false);
  });
  it("exige une catégorie pour une dépense", () => {
    const r = transactionInputSchema.safeParse({ ...base, categoryId: null });
    expect(r.success).toBe(false);
  });
  it("refuse un transfert vers le même compte", () => {
    const r = transactionInputSchema.safeParse({ ...base, kind: "transfer", categoryId: null, toAccountId: "chq" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].message).toMatch(/compte différent/);
  });
  it("accepte un transfert entre deux comptes", () => {
    expect(transactionInputSchema.safeParse({ ...base, kind: "transfer", categoryId: null, toAccountId: "epa" }).success).toBe(true);
  });
  it("refuse une description vide", () => {
    expect(transactionInputSchema.safeParse({ ...base, label: "   " }).success).toBe(false);
  });
});
