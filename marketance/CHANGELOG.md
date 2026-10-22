# Journal des changements

## 0.2.0 — 22 octobre 2026

- Base de données Supabase (région Canada) : tables `profiles` et `user_roles`, RLS, création automatique du profil à l'inscription.
- Inscription avec consentement, connexion, déconnexion, mot de passe oublié, page Mon compte.
- Politique de confidentialité préliminaire.
- Test SQL des règles d'accès ; 59 tests unitaires.

## 0.1.0 — 20 octobre 2026

- Plan de phase 0 et prototype cliquable de phase 1.
- Nom de l'application : Marketance.
- L'application vit dans le dossier `marketance/` ; la racine du dépôt reste le site Cyberservice Québec.
- Squelette Next.js 16, TypeScript strict, Tailwind 4, ESLint, Vitest.
- Moteur de calcul financier : totaux mensuels, soldes, patrimoine net, budgets, projection, doublons.
- Validation des opérations avec Zod.
- Pages d'accueil, 404 et erreur en français.
- Vérifications automatiques sur GitHub (types, lint, tests, build) à chaque pull request.
