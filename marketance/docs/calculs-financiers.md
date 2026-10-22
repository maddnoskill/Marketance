# Calculs financiers

Code : `src/lib/finance-engine/`. Tests : `tests/unit/finance-engine.test.ts`.

## Conventions

- Montants en **cents entiers**, toujours positifs sur une opération ; le sens vient du type (`income`, `expense`, `transfer`).
- Une opération a un statut : `planned` (prévue), `completed` (réalisée) ou `cancelled` (annulée).
- Une date d'opération est un jour calendrier `AAAA-MM-JJ` dans le fuseau de l'utilisateur.

## Définitions

| Indicateur | Formule | Remarques |
|---|---|---|
| Revenus du mois | Σ `income` réalisés du mois | Les prévus sont affichés à part |
| Dépenses du mois | Σ `expense` réalisées du mois | |
| Revenus − dépenses | Revenus − Dépenses | Ce n'est ni un bénéfice ni une variation de trésorerie |
| Solde calculé d'un compte | Solde de départ + revenus − dépenses − transferts sortants + transferts entrants (réalisés) | Peut différer du solde réel de la banque |
| Actifs | Σ soldes positifs des comptes + Σ valeurs d'actifs | Valeur d'un bien = estimation datée, pas une évaluation officielle |
| Passifs | Σ soldes négatifs des comptes (en positif) + Σ dettes saisies | Une dette suivie comme compte ne doit pas aussi être saisie comme dette |
| Patrimoine net | Actifs − Passifs | |
| % du budget utilisé | ⌊ dépensé × 100 ÷ budget ⌋ | Entier, arrondi vers le bas ; vide si budget = 0 $ |
| État du budget | « dépassé » si dépensé > budget, « attention » si % ≥ seuil (80 par défaut) | |
| Projection de fin de mois | arrondi(dépensé × jours du mois ÷ jours écoulés) | Estimation si le rythme continue, pas une garantie |

## Pourquoi les transferts sont exclus

Payer sa carte de crédit depuis le compte courant n'est pas une dépense : les achats faits avec la carte ont déjà été comptés. Le transfert réduit le compte courant et réduit la dette de la carte du même montant, donc le patrimoine net ne bouge pas. Un test le vérifie.

## Limites connues

- Pas encore de devises autres que le CAD.
- Pas encore de calcul d'intérêts sur les dettes (prévu avec les scénarios avalanche et boule de neige).
