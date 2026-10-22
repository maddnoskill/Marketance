# Sécurité

## Signaler un problème

Écrivez au responsable du projet par courriel privé (pas dans une issue publique). Décrivez le problème et comment le reproduire.

## Règles en vigueur

- Aucun secret dans le code ni dans Git. Les clés vont dans `.env.local` (ignoré par Git) et dans les variables d'environnement de l'hébergeur. `.env.example` liste les noms sans valeurs.
- Les clés « service role » de Supabase et les clés secrètes Stripe ne sont **jamais** utilisées dans du code exécuté par le navigateur (pas de préfixe `NEXT_PUBLIC_`).
- Chaque table de données personnelles a une politique RLS testée en lecture, insertion, modification et suppression (`supabase/tests/`).
- Les rôles ne se modifient jamais depuis le navigateur : seul le serveur, avec la clé secrète, peut en ajouter.
- Les messages de connexion et de mot de passe oublié ne révèlent jamais si une adresse courriel a un compte.
- Les redirections après connexion n'acceptent que des chemins internes (pas de redirection vers un autre site).
- Toute saisie est validée côté serveur (Zod), même si le formulaire la valide déjà.
- Aucun numéro de carte ni code de sécurité n'est stocké : Stripe s'en charge.
- Les journaux ne contiennent ni secret ni donnée financière personnelle.

## Dépendances

`npm audit --omit=dev` : 0 vulnérabilité au 20 octobre 2026.
`npm audit` (outils de développement inclus) signale 5 alertes « high » dans `braces`, via `eslint-config-next`. Elles concernent uniquement l'outil de vérification du code, jamais le site publié, et aucun correctif compatible n'existe encore. À revérifier à chaque mise à jour.

## Obligations québécoises à traiter avant la publication

Loi 25 (responsable de la protection des renseignements personnels, politique de confidentialité, registre des incidents, évaluation des facteurs relatifs à la vie privée), Loi sur la protection du consommateur, règles TPS/TVQ des plateformes numériques, Loi canadienne anti-pourriel. Voir la section 7 du plan. Une relecture professionnelle est recommandée.
