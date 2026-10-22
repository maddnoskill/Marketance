# Architecture

Le détail complet (diagramme, modèle de données, risques, budget) est dans [docs/PLAN-PHASE-0.md](docs/PLAN-PHASE-0.md).

## Décisions

| Sujet | Choix | Raison |
|---|---|---|
| Application | Next.js 16 (App Router), React 19, TypeScript strict | Pages et code serveur dans un seul projet, très bien documenté |
| Styles | Tailwind CSS 4, couleurs en variables (`globals.css`) | Cohérence, thème sombre automatique |
| Validation | Zod 4 | Mêmes règles pour les formulaires et le serveur |
| Tests | Vitest (unitaires), Playwright (bout en bout, à venir) | Gratuits et standards |
| Base de données | Supabase PostgreSQL, région Canada (à venir) | RLS pour isoler les données par utilisateur |
| Hébergement | Vercel (à venir) | Hobby gratuit en développement (non commercial), Pro au lancement commercial |

## Règles qui ne bougent pas

1. **Argent en cents entiers** (`number` entier sûr dans le code, `bigint` en base). Jamais de nombres à virgule.
2. **Dates d'opérations en jours calendrier** (`AAAA-MM-JJ`) dans le fuseau de l'utilisateur ; horodatages en UTC.
3. **Tous les calculs financiers passent par `src/lib/finance-engine`**, qui est pur (aucun accès réseau ni base) et testé.
4. **Le navigateur ne fait jamais foi** : prix, statuts, droits et montants sont revalidés côté serveur.
5. **Les données financières sont privées** : jamais visibles des autres utilisateurs, des vendeurs ni des pages publiques.
6. Code en anglais, interface 100 % en français.
