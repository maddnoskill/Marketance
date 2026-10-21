# Déploiement

Pas encore déployé. Procédure prévue (phase 2) :

1. Créer un compte Vercel gratuit (Hobby) et le relier au dépôt GitHub.
2. Importer le projet : Vercel détecte Next.js tout seul.
3. Ajouter les variables d'environnement de `.env.example` dans Vercel (Production et Preview séparés).
4. Chaque envoi sur `main` déploie en production ; chaque branche reçoit une adresse d'aperçu.
5. Retour en arrière : dans Vercel, « Deployments », choisir une version précédente, « Promote to Production ».

**Important :** Vercel Hobby interdit l'usage commercial. Passer à Vercel Pro (≈ 28 $ CA/mois) avant d'encaisser le premier dollar.
