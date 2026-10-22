import { assertCents } from "@/lib/money/cents";

export type BudgetState = "ok" | "warning" | "over";

export interface BudgetStatus {
  budgetCents: number;
  spentCents: number;
  /** Négatif en cas de dépassement. */
  remainingCents: number;
  /** Pourcentage consommé, arrondi à l'entier inférieur. Null si le budget est de 0 $. */
  percentUsed: number | null;
  state: BudgetState;
}

/**
 * État d'un budget. `alertPercent` (80 par défaut) déclenche l'état « warning ».
 * Le calcul du pourcentage reste en entiers pour éviter les arrondis imprévisibles.
 */
export function budgetStatus(budgetCents: number, spentCents: number, alertPercent = 80): BudgetStatus {
  assertCents(budgetCents, "budget");
  assertCents(spentCents, "montant dépensé");
  const remainingCents = budgetCents - spentCents;
  const percentUsed = budgetCents > 0 ? Math.floor((spentCents * 100) / budgetCents) : null;
  let state: BudgetState = "ok";
  if (spentCents > budgetCents) state = "over";
  else if (percentUsed !== null && percentUsed >= alertPercent) state = "warning";
  return { budgetCents, spentCents, remainingCents, percentUsed, state };
}

/**
 * Projection linéaire des dépenses en fin de période : si le rythme actuel continue.
 * C'est une estimation, pas une prévision garantie.
 */
export function projectEndOfPeriod(spentCents: number, daysElapsed: number, daysInPeriod: number): number {
  assertCents(spentCents);
  if (!Number.isInteger(daysElapsed) || !Number.isInteger(daysInPeriod) || daysInPeriod <= 0) {
    throw new RangeError("Les nombres de jours doivent être des entiers positifs.");
  }
  if (daysElapsed <= 0) return spentCents;
  const elapsed = Math.min(daysElapsed, daysInPeriod);
  return Math.round((spentCents * daysInPeriod) / elapsed);
}
