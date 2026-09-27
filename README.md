# EFMIE Tai Chi Chuan Website

Site web officiel de l'école EFMIE Tai Chi Chuan à Paris.

## 📋 À propos

Ce site est construit avec [Eleventy (11ty)](https://www.11ty.dev/), un générateur de site statique moderne, et déployé sur GitHub Pages.

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

# Démarrer le serveur de développement
npm start
```

Le site sera disponible à l'adresse : http://localhost:8080

### Build de production

```bash
npm run build
```

Les fichiers générés seront dans le dossier `_site/`.

## 📁 Structure du projet

```
.
├── src/                    # Source files
│   ├── _includes/          # Components (header, footer, etc.)
│   ├── _layouts/          # Page layouts
│   ├── _data/             # Global data (site.json)
│   ├── posts/             # Blog posts (Markdown)
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript (optional)
│   ├── images/            # Static images
│   ├── index.njk          # Home page
│   ├── a-propos.njk       # About page
│   ├── contact.njk        # Contact page
│   └── blog/              # Blog index
│       └── index.njk
├── .eleventy.js            # Eleventy configuration
├── package.json           # Dependencies and scripts
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml         # CI/CD pipeline
└── README.md              # This file
```

## 📝 Ajouter un article de blog

1. Créer un fichier Markdown dans `src/posts/` avec le format : `YYYY-MM-DD-slug.md`
2. Ajouter le front matter avec les métadonnées :

```markdown
---
title: "Titre de l'article"
date: 2024-01-01
description: "Description pour le SEO"
tags: [tag1, tag2]
image: /images/image.jpg
youtube_id: video_id (optionnel)
---

Contenu de l'article en Markdown...
```

3. Utiliser les shortcodes disponibles :
   - `{% youtube "ID", "Titre" %}` - Pour les vidéos YouTube
   - `{% image "src", "alt", "caption" %}` - Pour les images

## 🎨 Personnalisation

### Site metadata

Modifier les informations du site dans `src/_data/site.json` :
- Titre
- Description
- URL
- Contact (email, téléphone)
- Adresse

### Styles

Les styles principaux sont dans `src/css/styles.css`. Le site utilise des CSS Custom Properties (variables) pour une personnalisation facile.

### Couleurs

Les couleurs principales sont définies en haut du fichier CSS :

```css
:root {
  --color-primary: #1a237e;
  --color-secondary: #ffd700;
  --color-text: #212121;
  --color-bg: #fafafa;
  /* ... */
}
```

## 🔧 Configuration Eleventy

Le fichier `.eleventy.js` contient la configuration principale :
- Collections (posts)
- Shortcodes (youtube, image)
- Filters (date, excerpt)
- Passthrough copy

## ✅ Déploiement

Le site est automatiquement déployé sur GitHub Pages via GitHub Actions :

1. **Pull Request** : Une preview est générée pour chaque PR
2. **Merge sur main** : Le site est déployé en production

### Custom Domain

Le site utilise le domaine personnalisé : `efmie-taichi.fr`

Pour configurer un nouveau domaine :
1. Ajouter le domaine dans les paramètres GitHub Pages
2. Configurer les enregistrements DNS (CNAME ou A records)
3. Attendre la propagation (peut prendre jusqu'à 48h)

## 📊 SEO

Le site est optimisé pour le SEO avec :

- **Semantic HTML** : Utilisation appropriée des balises sémantiques
- **Meta tags** : Génération automatique des balises meta
- **Structured Data** : JSON-LD pour l'organisation
- **Sitemap** : Génération automatique (à configurer)
- **robots.txt** : Fichier présent à la racine
- **Performance** : Pas de JavaScript nécessaire, CSS optimisé

## 🤝 Contribution

Toutes les contributions sont les bienvenues !

1. Forker le dépôt
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalité`)
3. Commiter vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Pusher sur la branche (`git push origin feature/nouvelle-fonctionnalité`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence Unlicense - voir le fichier [LICENSE](LICENSE) pour plus de détails.
