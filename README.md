# EFMIE - École des Formes Martiales Internes et Externes

Site web officiel de l'École des Formes Martiales Internes et Externes (EFMIE) - Tai Chi Chuan et Qi Gong à Neuilly-sur-Seine.

## 📋 À propos

Ce site est construit avec [Eleventy (11ty)](https://www.11ty.dev/), un générateur de site statique moderne, et déployé sur GitHub Pages.

**Informations du club :**
- **Nom** : École des Formes Martiales Internes et Externes (EFMIE)
- **Disciplines** : Tai Chi Chuan et Qi Gong
- **Lieu** : Neuilly-sur-Seine, France
- **Email** : efmie92@gmail.com
- **URL** : https://mrkloan.github.io/efmie/

## 🚀 Développement local

### Prérequis

- Node.js 18+ (recommandé : 20+)
- npm ou yarn

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/mrkloan/efmie.git
cd efmie

# Installer les dépendances
npm install

# Builder le site
npm run build

# Démarrer le serveur de développement (optionnel)
npm start
```

Le site sera disponible à l'adresse : http://localhost:8080

## 📁 Structure du projet

```
.
├── AGENTS.md                   # Instructions pour les agents/contributeurs
├── README.md                   # Documentation du projet
├── package.json                # Dépendances et scripts
├── package-lock.json           # Fichier de lock
├── .eleventy.js                # Configuration Eleventy
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline CI/CD
├── src/
│   ├── _includes/             # Composants réutilisables
│   │   ├── base.njk           # Squelette HTML
│   │   ├── header.njk         # En-tête du site
│   │   ├── footer.njk         # Pied de page
│   │   ├── hero.njk           # Section hero
│   │   └── card.njk           # Composant carte
│   │
│   ├── _layouts/              # Modèles de pages
│   │   ├── base.njk           # Modèle de base
│   │   ├── home.njk           # Modèle homepage
│   │   ├── page.njk           # Modèle page standard
│   │   └── post.njk           # Modèle article de blog
│   │
│   ├── _data/                 # Données globales
│   │   └── site.json          # Métadonnées du site
│   │
│   ├── posts/                 # Articles de blog
│   │   └── 2024-01-01-test-article.md
│   │
│   ├── css/                   # Feuilles de style
│   │   └── styles.css         # Styles principaux
│   │
│   ├── images/                # Images statiques
│   ├── index.njk              # Page d'accueil
│   ├── a-propos.njk           # Page À propos
│   ├── contact.njk            # Page Contact
│   └── blog/
│       └── index.njk          # Index du blog
└── _site/                    # Sortie du build (gitignored)
```

## 📝 Gestion du contenu

### Ajouter un article de blog

1. Créer un fichier Markdown dans `src/posts/` avec le format : `YYYY-MM-DD-nom-article.md`
2. Ajouter le front matter avec les métadonnées :

```markdown
---
title: "Titre de l'article"
date: 2024-01-01
description: "Description pour le SEO"
tags: [tag1, tag2]
image: /images/nom-image.jpg
---

Contenu de l'article en Markdown...
```

### Utiliser les shortcodes

- **YouTube** : `{% youtube "ID_VIDEO", "Titre" %}`
- **Image** : `{% image "/chemin/image.jpg", "Texte alternatif", "Légende" %}`

## ✅ Déploiement

Le site est automatiquement déployé sur GitHub Pages via GitHub Actions.

- **Production** : Déclenché sur push vers `main`
- **URL** : https://mrkloan.github.io/efmie/

## 🤝 Contribution

Toutes les contributions sont les bienvenues ! Voir [AGENTS.md](AGENTS.md) pour les instructions détaillées.

1. Lire [AGENTS.md](AGENTS.md)
2. Créer une branche : `git checkout -b feature/ma-fonctionnalité`
3. Faire ses modifications
4. **Exécuter `npm run build` localement** (obligatoire avant push)
5. Corriger les erreurs si le build échoue
6. Commiter et pousser
7. Ouvrir une PR

## 📄 Licence

Ce projet est sous licence Unlicense - voir le fichier [LICENSE](LICENSE) pour plus de détails.
