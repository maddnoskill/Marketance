import { monthOf, type MonthKey } from "@/lib/dates/calendar";
import { assertCents } from "@/lib/money/cents";
import type { Transaction, TransactionStatus } from "./types";

export interface PeriodTotals {
  incomeCents: number;
  expenseCents: number;
  /** Revenus − dépenses. Ce n'est ni un bénéfice ni une variation de trésorerie. */
  netCents: number;
}

/**
 * Revenus et dépenses d'un mois, pour un statut donné (« completed » par défaut).
 * Les transferts entre comptes sont toujours exclus : ils déplacent de l'argent sans en créer.
 */
export function monthTotals(
  transactions: readonly Transaction[],
  month: MonthKey,
  status: TransactionStatus = "completed",
): PeriodTotals {
  let incomeCents = 0;
  let expenseCents = 0;
  for (const tx of transactions) {
    if (tx.status !== status || monthOf(tx.occurredOn) !== month) continue;
    assertCents(tx.amountCents);
    if (tx.kind === "income") incomeCents += tx.amountCents;
    else if (tx.kind === "expense") expenseCents += tx.amountCents;
  }
  return { incomeCents, expenseCents, netCents: incomeCents - expenseCents };
}

/** Dépenses réalisées du mois, regroupées par catégorie. */
export function expensesByCategory(transactions: readonly Transaction[], month: MonthKey): Map<string, number> {
  const out = new Map<string, number>();
  for (const tx of transactions) {
    if (tx.kind !== "expense" || tx.status !== "completed" || monthOf(tx.occurredOn) !== month) continue;
    const key = tx.categoryId ?? "sans-categorie";
    out.set(key, (out.get(key) ?? 0) + assertCents(tx.amountCents));
  }
  return out;
}

/** Écart entre deux périodes (courante − précédente). */
export function compareTotals(current: PeriodTotals, previous: PeriodTotals): PeriodTotals {
  return {
    incomeCents: current.incomeCents - previous.incomeCents,
    expenseCents: current.expenseCents - previous.expenseCents,
    netCents: current.netCents - previous.netCents,
  };
}
