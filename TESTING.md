# Tests

| Niveau | Outil | Commande | État |
|---|---|---|---|
| Unitaires | Vitest | `npm test` | 47 tests, tous réussis le 20 octobre 2026 |
| Types | TypeScript | `npm run typecheck` | Réussi |
| Qualité | ESLint | `npm run lint` | Réussi, 0 avertissement |
| Build | Next.js | `npm run build` | Réussi |
| Prototype | Playwright | voir `prototype/` et le dossier partagé du projet | 41/41 réussis |
| Bout en bout de l'application | Playwright | à venir en phase 2 | Non commencé |
| Politiques RLS | SQL + client Supabase | à venir avec la base | Non commencé |

## Ce que couvrent les tests unitaires

- Conversion des saisies en cents (virgule ou point, espaces, refus des négatifs, de zéro et de 3 décimales).
- Format québécois des montants.
- Dates : années bissextiles, mois précédent en janvier, date de Toronto autour du changement d'heure de novembre.
- Totaux du mois : réalisé, prévu, annulé, frontières de mois, transferts exclus.
- Soldes de comptes et patrimoine net, y compris le paiement de carte de crédit qui ne change pas le patrimoine.
- Budgets : seuil d'alerte, dépassement, budget de 0 $, projection de fin de mois.
- Détection de doublons malgré accents et majuscules.
- Validation des opérations (montant, date impossible, transfert vers le même compte).
