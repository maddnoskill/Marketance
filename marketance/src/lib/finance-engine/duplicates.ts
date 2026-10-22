import type { Transaction } from "./types";

/**
 * Clé de détection de doublons : même jour, même type, même montant, même compte,
 * même description (sans accents ni majuscules). Sert à avertir avant d'importer
 * deux fois la même opération ; la base de données l'imposera avec un index unique.
 */
export function duplicateKey(tx: Pick<Transaction, "occurredOn" | "kind" | "amountCents" | "accountId" | "label">): string {
  const label = (tx.label ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  return [tx.occurredOn, tx.kind, tx.amountCents, tx.accountId, label].join("|");
}

/** Retourne les opérations de `incoming` qui existent déjà dans `existing`. */
export function findDuplicates<T extends Transaction>(existing: readonly Transaction[], incoming: readonly T[]): T[] {
  const seen = new Set(existing.map(duplicateKey));
  return incoming.filter((tx) => seen.has(duplicateKey(tx)));
}
