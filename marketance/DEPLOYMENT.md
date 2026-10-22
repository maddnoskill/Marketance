# Déploiement

Pas encore déployé. Procédure prévue (phase 2) :

1. Créer un compte Vercel gratuit (Hobby) et le relier au dépôt GitHub.
2. Importer le dépôt dans un **nouveau** projet Vercel et régler **Root Directory** sur `marketance`. Ne pas toucher au projet Vercel existant, qui publie le site Cyberservice Québec depuis la racine du dépôt.
3. Ajouter les variables d'environnement de `.env.example` dans Vercel (Production et Preview séparés).
4. Chaque envoi sur `main` qui modifie `marketance/` déploie en production ; chaque branche reçoit une adresse d'aperçu.
5. Retour en arrière : dans Vercel, « Deployments », choisir une version précédente, « Promote to Production ».

**Important :** Vercel Hobby interdit l'usage commercial. Passer à Vercel Pro (≈ 28 $ CA/mois) avant d'encaisser le premier dollar.

## Supabase

- Projet : `marketance`, région Canada (ca-central-1), forfait gratuit.
- Migrations : `supabase/migrations/`, appliquées dans l'ordre des noms de fichiers. Ne jamais modifier une migration déjà appliquée : en écrire une nouvelle.
- Avant la mise en ligne, dans Supabase > Authentication > URL Configuration :
  - **Site URL** : l'adresse publique du site.
  - **Redirect URLs** : ajouter `http://localhost:3000/**` et l'adresse publique suivie de `/**`.
- Variables à copier dans Vercel : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL`.
- Le forfait gratuit met le projet en pause après 7 jours sans activité : il se réveille depuis le tableau de bord Supabase.
