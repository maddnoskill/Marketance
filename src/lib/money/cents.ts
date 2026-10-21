/**
 * Montants monétaires en unités mineures entières (cents).
 * Aucun calcul d'argent ne doit passer par des nombres à virgule.
 */

/** Plus grand montant accepté : 9 999 999,99 $. */
export const MAX_CENTS = 999_999_999;

/** Lève une erreur si la valeur n'est pas un nombre entier de cents. */
export function assertCents(value: number, label = "montant"): number {
  if (!Number.isSafeInteger(value)) {
    throw new TypeError(`Le ${label} doit être un nombre entier de cents (reçu : ${value}).`);
  }
  return value;
}

/**
 * Convertit une saisie en dollars (« 42,50 », « 42.50 », « 1 234,05 ») en cents positifs.
 * Retourne null si la saisie est vide, négative, nulle ou a plus de deux décimales.
 */
export function parseCadToCents(input: string): number | null {
  const normalized = input.trim().replace(/[\s  ]/g, "").replace(",", ".");
  const match = /^(\d{1,7})(?:\.(\d{1,2}))?$/.exec(normalized);
  if (!match) return null;
  const dollars = Number(match[1]);
  const cents = Number((match[2] ?? "0").padEnd(2, "0"));
  const total = dollars * 100 + cents;
  return total > 0 && total <= MAX_CENTS ? total : null;
}

const cadFormatter = new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" });

/** Formate des cents en dollars canadiens, à la québécoise : « 1 234,56 $ ». */
export function formatCad(cents: number): string {
  assertCents(cents);
  return cadFormatter.format(cents / 100);
}
