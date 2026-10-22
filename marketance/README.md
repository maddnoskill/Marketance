# Marketance

Application web en français pour le Québec : finances personnelles, organisation personnelle et, plus tard, marketplace de services.

> État : **phase 2 en cours** (socle technique). Aucun compte, aucune base de données ni paiement ne sont encore branchés.

## Démarrer sur ton ordinateur

Prérequis : [Node.js 22](https://nodejs.org) (version LTS) et Git.

```bash
git clone https://github.com/maddnoskill/Marketance.git
cd Marketance/marketance   # l'app vit dans ce sous-dossier ; la racine du dépôt est le site Cyberservice Québec
npx npm@11 install        # npm 11 : npm 10 (fourni avec Node 22) plante sur ce projet
npm run dev               # puis ouvre http://localhost:3000
```

## Commandes utiles

| Commande | Ce qu'elle fait |
|---|---|
| `npm run dev` | Lance le site en mode développement |
| `npm test` | Lance les tests unitaires (Vitest) |
| `npm run typecheck` | Vérifie les types TypeScript |
| `npm run lint` | Vérifie la qualité du code (ESLint) |
| `npm run build` | Construit la version de production |
| `npm run check` | Fait les quatre vérifications d'un coup, à lancer avant chaque envoi |

## Où trouver quoi

- `src/app/` : les pages.
- `src/lib/money/` : montants en cents et format « 1 234,56 $ ».
- `src/lib/dates/` : dates et fuseau America/Toronto.
- `src/lib/finance-engine/` : tous les calculs financiers (voir [docs/calculs-financiers.md](docs/calculs-financiers.md)).
- `src/lib/validation/` : règles de validation (Zod), réutilisées côté serveur.
- `tests/unit/` : tests automatisés.
- `prototype/index.html` : maquette cliquable de la phase 1 (s'ouvre d'un double-clic).
- `docs/` : plan, architecture, calculs.

Voir aussi : [ARCHITECTURE.md](ARCHITECTURE.md), [ROADMAP.md](ROADMAP.md), [SECURITY.md](SECURITY.md), [TESTING.md](TESTING.md), [DEPLOYMENT.md](DEPLOYMENT.md), [CHANGELOG.md](CHANGELOG.md).
