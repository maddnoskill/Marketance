# Tests

| Niveau | Outil | Commande | État |
|---|---|---|---|
| Unitaires | Vitest | `npm test` | 59 tests, tous réussis le 22 octobre 2026 |
| Types | TypeScript | `npm run typecheck` | Réussi |
| Qualité | ESLint | `npm run lint` | Réussi, 0 avertissement |
| Build | Next.js | `npm run build` | Réussi |
| Prototype | Playwright | voir `prototype/` et le dossier partagé du projet | 41/41 réussis |
| Bout en bout de l'application | Playwright | à venir en phase 2 | Non commencé |
| Politiques RLS | SQL (`supabase/tests/rls_profiles_roles.sql`) | à coller dans l'éditeur SQL de Supabase | Réussi le 22 octobre 2026 |

## Ce que couvrent les tests unitaires

- Conversion des saisies en cents (virgule ou point, espaces, refus des négatifs, de zéro et de 3 décimales).
- Format québécois des montants.
- Dates : années bissextiles, mois précédent en janvier, date de Toronto autour du changement d'heure de novembre.
- Totaux du mois : réalisé, prévu, annulé, frontières de mois, transferts exclus.
- Soldes de comptes et patrimoine net, y compris le paiement de carte de crédit qui ne change pas le patrimoine.
- Budgets : seuil d'alerte, dépassement, budget de 0 $, projection de fin de mois.
- Détection de doublons malgré accents et majuscules.
- Validation des opérations (montant, date impossible, transfert vers le même compte).

## Test des règles d'accès (RLS)

`supabase/tests/rls_profiles_roles.sql` crée deux utilisateurs fictifs dans une transaction annulée à la fin, puis vérifie qu'Alice :
ne voit que son profil, ne peut ni lire ni modifier celui de Bob, ne peut pas se donner le rôle administrateur,
ne peut pas changer son identifiant, et qu'un visiteur non connecté ne lit rien. Résultat attendu : `TOUS LES TESTS RÉUSSIS`.

## Parcours de connexion

Vérifié automatiquement : redirection de `/compte` vers `/connexion` sans session, messages d'erreur de l'inscription,
absence de défilement horizontal sur téléphone, lien de courriel invalide. **Pas encore vérifié de bout en bout** :
connexion réelle, modification du profil, déconnexion. L'environnement de développement de Claude n'a pas accès au
domaine `supabase.co` ; ce test se fera en local ou sur le premier déploiement Vercel.
