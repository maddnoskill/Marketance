# Déploiement

Pas encore déployé. Procédure prévue (phase 2) :

1. Créer un compte Vercel gratuit (Hobby) et le relier au dépôt GitHub.
2. Importer le dépôt dans un **nouveau** projet Vercel et régler **Root Directory** sur `marketance`. Ne pas toucher au projet Vercel existant, qui publie le site Cyberservice Québec depuis la racine du dépôt.
3. Ajouter les variables d'environnement de `.env.example` dans Vercel (Production et Preview séparés).
4. Chaque envoi sur `main` qui modifie `marketance/` déploie en production ; chaque branche reçoit une adresse d'aperçu.
5. Retour en arrière : dans Vercel, « Deployments », choisir une version précédente, « Promote to Production ».

**Important :** Vercel Hobby interdit l'usage commercial. Passer à Vercel Pro (≈ 28 $ CA/mois) avant d'encaisser le premier dollar.
