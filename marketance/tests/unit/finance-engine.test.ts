import { describe, expect, it } from "vitest";
import {
  accountBalance,
  budgetStatus,
  compareTotals,
  expensesByCategory,
  findDuplicates,
  monthTotals,
  netWorth,
  projectEndOfPeriod,
  type Account,
  type Transaction,
} from "@/lib/finance-engine";

let seq = 0;
const tx = (t: Omit<Transaction, "id">): Transaction => ({ id: String(++seq), ...t });

const checking: Account = { id: "chq", name: "Compte courant", openingBalanceCents: 100_000 };
const savings: Account = { id: "epa", name: "Épargne", openingBalanceCents: 500_000 };
const card: Account = { id: "cc", name: "Carte de crédit", openingBalanceCents: -20_000 };

const october: Transaction[] = [
  tx({ kind: "income", status: "completed", amountCents: 215_000, occurredOn: "2026-10-02", accountId: "chq", categoryId: "salaire" }),
  tx({ kind: "income", status: "planned", amountCents: 60_000, occurredOn: "2026-10-28", accountId: "chq", categoryId: "autonome" }),
  tx({ kind: "expense", status: "completed", amountCents: 115_000, occurredOn: "2026-10-01", accountId: "chq", categoryId: "logement" }),
  tx({ kind: "expense", status: "completed", amountCents: 14_237, occurredOn: "2026-10-04", accountId: "cc", categoryId: "epicerie" }),
  tx({ kind: "expense", status: "completed", amountCents: 9_618, occurredOn: "2026-10-11", accountId: "cc", categoryId: "epicerie" }),
  tx({ kind: "expense", status: "cancelled", amountCents: 4_000, occurredOn: "2026-10-13", accountId: "cc", categoryId: "restaurants" }),
  tx({ kind: "transfer", status: "completed", amountCents: 30_000, occurredOn: "2026-10-03", accountId: "chq", toAccountId: "epa" }),
  tx({ kind: "transfer", status: "completed", amountCents: 20_000, occurredOn: "2026-10-20", accountId: "chq", toAccountId: "cc" }),
  tx({ kind: "expense", status: "completed", amountCents: 999, occurredOn: "2026-09-30", accountId: "chq", categoryId: "logement" }),
];

describe("monthTotals", () => {
  it("additionne seulement les opérations réalisées du mois", () => {
    expect(monthTotals(october, "2026-10")).toEqual({ incomeCents: 215_000, expenseCents: 138_855, netCents: 76_145 });
  });

  it("n'ajoute jamais un transfert aux revenus ou aux dépenses", () => {
    const onlyTransfers = october.filter((t) => t.kind === "transfer");
    expect(monthTotals(onlyTransfers, "2026-10")).toEqual({ incomeCents: 0, expenseCents: 0, netCents: 0 });
  });

  it("sépare le prévu du réalisé", () => {
    expect(monthTotals(october, "2026-10", "planned").incomeCents).toBe(60_000);
  });

  it("exclut les opérations annulées", () => {
    expect(monthTotals(october, "2026-10", "cancelled").expenseCents).toBe(4_000);
    expect(monthTotals(october, "2026-10").expenseCents).not.toBe(138_855 + 4_000);
  });

  it("respecte les frontières de mois", () => {
    expect(monthTotals(october, "2026-09").expenseCents).toBe(999);
  });

  it("refuse un montant qui n'est pas en cents entiers", () => {
    const bad = [tx({ kind: "income", status: "completed", amountCents: 10.5, occurredOn: "2026-10-01", accountId: "chq", categoryId: "x" })];
    expect(() => monthTotals(bad, "2026-10")).toThrow(TypeError);
  });

  it("compare deux périodes", () => {
    const diff = compareTotals(monthTotals(october, "2026-10"), monthTotals(october, "2026-09"));
    expect(diff).toEqual({ incomeCents: 215_000, expenseCents: 137_856, netCents: 77_144 });
  });
});

describe("expensesByCategory", () => {
  it("regroupe les dépenses réalisées", () => {
    const byCat = expensesByCategory(october, "2026-10");
    expect(byCat.get("epicerie")).toBe(23_855);
    expect(byCat.get("logement")).toBe(115_000);
    expect(byCat.has("restaurants")).toBe(false);
  });
});

describe("accountBalance et netWorth", () => {
  it("calcule chaque compte, transferts inclus", () => {
    // 100 000 + 215 000 − 115 000 − 30 000 − 20 000 − 999
    expect(accountBalance(checking, october)).toBe(149_001);
    expect(accountBalance(savings, october)).toBe(530_000);
    // −20 000 − 14 237 − 9 618 + 20 000
    expect(accountBalance(card, october)).toBe(-23_855);
  });

  it("un paiement de carte de crédit ne change pas le patrimoine net", () => {
    const withoutPayment = october.filter((t) => !(t.kind === "transfer" && t.toAccountId === "cc"));
    const a = netWorth([checking, savings, card], october).netWorthCents;
    const b = netWorth([checking, savings, card], withoutPayment).netWorthCents;
    expect(a).toBe(b);
  });

  it("patrimoine net = actifs − passifs", () => {
    const result = netWorth(
      [checking, savings, card],
      october,
      [{ id: "auto", name: "Automobile", valueCents: 1_450_000, valuedOn: "2026-09-01" }],
      [{ id: "pret", name: "Prêt auto", balanceCents: 980_000 }],
    );
    expect(result.assetsCents).toBe(149_001 + 530_000 + 1_450_000);
    expect(result.liabilitiesCents).toBe(23_855 + 980_000);
    expect(result.netWorthCents).toBe(result.assetsCents - result.liabilitiesCents);
    expect(result.netWorthCents).toBe(1_125_146);
  });
});

describe("budgetStatus", () => {
  it("signale l'approche de la limite", () => {
    expect(budgetStatus(45_000, 36_745)).toMatchObject({ remainingCents: 8_255, percentUsed: 81, state: "warning" });
  });
  it("signale le dépassement", () => {
    expect(budgetStatus(12_000, 13_000)).toMatchObject({ remainingCents: -1_000, percentUsed: 108, state: "over" });
  });
  it("reste « ok » sous le seuil choisi", () => {
    expect(budgetStatus(10_000, 8_500, 90).state).toBe("ok");
  });
  it("gère un budget de 0 $", () => {
    expect(budgetStatus(0, 0)).toMatchObject({ percentUsed: null, state: "ok" });
  });
});

describe("projectEndOfPeriod", () => {
  it("projette le rythme actuel", () => {
    expect(projectEndOfPeriod(30_000, 10, 31)).toBe(93_000);
    expect(projectEndOfPeriod(10_000, 3, 30)).toBe(100_000);
  });
  it("ne projette rien avant le début de la période", () => {
    expect(projectEndOfPeriod(0, 0, 30)).toBe(0);
  });
});

describe("findDuplicates", () => {
  it("repère une opération déjà enregistrée, malgré les accents et majuscules", () => {
    const incoming = [
      tx({ kind: "expense", status: "completed", amountCents: 14_237, occurredOn: "2026-10-04", accountId: "cc", categoryId: "epicerie", label: "EPICERIE metro" }),
      tx({ kind: "expense", status: "completed", amountCents: 14_237, occurredOn: "2026-10-05", accountId: "cc", categoryId: "epicerie", label: "Épicerie Metro" }),
    ];
    const existing = [{ ...october[3], label: "Épicerie  Metro" }];
    expect(findDuplicates(existing, incoming).map((t) => t.occurredOn)).toEqual(["2026-10-04"]);
  });
});
