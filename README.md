# Cyberservice Québec

Site vitrine d'un service d'aide informatique pour aînés (Québec et Lévis).

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | La page d'accueil (design, sections, formulaire de réservation) |
| `merci.html` | Page affichée après l'envoi du formulaire |
| `content.json` | **Tout le texte modifiable** (titre, services, prix, couleurs, photo, téléphone) |
| `.pages.yml` | Configuration de l'éditeur visuel Pages CMS |
| `images/` | Photos ajoutées depuis l'éditeur |

## Modifier le site sans code

1. Aller sur https://app.pagescms.org et se connecter avec GitHub.
2. Ouvrir le dépôt `Marketance` → section **✏️ Mon site**.
3. Changer le texte, les prix, les couleurs ou la photo → **Save**.
4. Vercel republie le site automatiquement (environ 30 secondes).

## Comment ça marche

- `index.html` contient un texte par défaut. Au chargement, un petit script lit `content.json`
  et remplace le texte des éléments marqués `data-c="..."`. Si le fichier ne charge pas,
  le texte par défaut reste affiché.
- Le formulaire passe par FormSubmit et envoie chaque réservation par courriel.
  La toute première soumission déclenche un courriel d'activation à confirmer.
- Hébergement : Vercel, branché sur ce dépôt (chaque commit sur `main` = mise en ligne).

## Application Marketance

Le dossier [`marketance/`](marketance/) contient une autre application, indépendante de ce site : Marketance (finances personnelles, organisation et marketplace, en Next.js). Elle n'est pas mise en ligne par le projet Vercel de ce site, et ne change rien à son fonctionnement. Voir [marketance/README.md](marketance/README.md).
