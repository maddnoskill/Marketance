import type { IsoDate } from "@/lib/dates/calendar";

export type TransactionKind = "income" | "expense" | "transfer";
export type TransactionStatus = "planned" | "completed" | "cancelled";

export interface Transaction {
  id: string;
  kind: TransactionKind;
  status: TransactionStatus;
  /** Toujours positif ; le sens vient de `kind`. */
  amountCents: number;
  occurredOn: IsoDate;
  accountId: string;
  /** Obligatoire pour un transfert, absent sinon. */
  toAccountId?: string | null;
  /** Absent pour un transfert. */
  categoryId?: string | null;
  label?: string;
}

export interface Account {
  id: string;
  name: string;
  /** Solde au moment où l'utilisateur commence le suivi. Négatif pour une dette (carte de crédit). */
  openingBalanceCents: number;
}

export interface Asset {
  id: string;
  name: string;
  valueCents: number;
  valuedOn: IsoDate;
}

export interface Liability {
  id: string;
  name: string;
  balanceCents: number;
}
