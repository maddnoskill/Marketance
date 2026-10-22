import { assertCents } from "@/lib/money/cents";
import type { Account, Asset, Liability, Transaction } from "./types";

/**
 * Solde calculé d'un compte : solde de départ + opérations réalisées.
 * Un transfert retire du compte source et ajoute au compte destination ; il n'est donc
 * jamais compté deux fois (ex. paiement de carte de crédit depuis le compte courant).
 */
export function accountBalance(account: Account, transactions: readonly Transaction[]): number {
  let balance = assertCents(account.openingBalanceCents, "solde de départ");
  for (const tx of transactions) {
    if (tx.status !== "completed") continue;
    const amount = assertCents(tx.amountCents);
    if (tx.kind === "income" && tx.accountId === account.id) balance += amount;
    else if (tx.kind === "expense" && tx.accountId === account.id) balance -= amount;
    else if (tx.kind === "transfer") {
      if (tx.accountId === account.id) balance -= amount;
      if (tx.toAccountId === account.id) balance += amount;
    }
  }
  return balance;
}

export interface NetWorth {
  assetsCents: number;
  liabilitiesCents: number;
  /** Patrimoine net = actifs − passifs. */
  netWorthCents: number;
}

/**
 * Un compte au solde positif est un actif ; un compte au solde négatif (carte de crédit,
 * marge) est un passif. Les dettes saisies séparément (`liabilities`) ne doivent pas être
 * aussi suivies comme compte, sinon elles seraient comptées deux fois.
 */
export function netWorth(
  accounts: readonly Account[],
  transactions: readonly Transaction[],
  assets: readonly Asset[] = [],
  liabilities: readonly Liability[] = [],
): NetWorth {
  let assetsCents = 0;
  let liabilitiesCents = 0;
  for (const account of accounts) {
    const balance = accountBalance(account, transactions);
    if (balance >= 0) assetsCents += balance;
    else liabilitiesCents += -balance;
  }
  for (const asset of assets) assetsCents += assertCents(asset.valueCents, "valeur d'actif");
  for (const liability of liabilities) liabilitiesCents += assertCents(liability.balanceCents, "solde de dette");
  return { assetsCents, liabilitiesCents, netWorthCents: assetsCents - liabilitiesCents };
}
