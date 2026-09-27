# Agents Instructions for EFMIE Tai Chi Website

This file contains instructions for AI agents and contributors working on the EFMIE Tai Chi Chuan website project.

## Project Overview

- **Framework**: Eleventy (11ty) static site generator
- **Templates**: Nunjucks (`.njk`)
- **Content**: Markdown files with YAML front matter
- **Styling**: Hand-written CSS (no frameworks)
- **Hosting**: GitHub Pages with custom domain
- **CI/CD**: GitHub Actions

## Content Guidelines

### Layout References

**CRITICAL**: When referencing layouts in front matter, **NEVER** use the `_layouts/` or `_includes/` prefix.

Eleventy's configuration in `.eleventy.js` defines the directories:
```javascript
dir: {
  input: "src",
  includes: "_includes",
  layouts: "_layouts",
  data: "_data",
}
```

**Correct usage:**
```yaml
---
layout: page.njk
---
```

**Incorrect usage (will cause build failures):**
```yaml
---
layout: _layouts/page.njk  # ❌ WRONG - will fail
---
```

### Template Files

- **Layouts** go in `src/_layouts/` (e.g., `base.njk`, `page.njk`, `post.njk`, `home.njk`)
- **Includes** go in `src/_includes/` (e.g., `header.njk`, `footer.njk`, `hero.njk`, `card.njk`)
- **Pages** go in `src/` (e.g., `index.njk`, `a-propos.njk`, `contact.njk`)
- **Blog posts** go in `src/posts/` as Markdown files (e.g., `2024-09-27-demo.md`)
- **Blog index** is at `src/blog/index.njk`

### Front Matter Requirements

All content files (pages and posts) **MUST** include proper front matter:

#### Pages (`.njk` files in `src/`)
```yaml
---
layout: page.njk          # or home.njk for homepage
title: "Page Title"
description: "SEO description for the page"
---
```

#### Blog Posts (`.md` files in `src/posts/`)
```yaml
---
layout: post.njk
title: "Post Title"
date: 2024-01-01           # Required for sorting
description: "SEO description"
tags: [tag1, tag2]        # Optional but recommended
image: /images/photo.jpg   # Optional for featured image
youtube_id: ABC123        # Optional for YouTube videos
---
```

### Available Layouts

| Layout | File | Usage |
|--------|------|-------|
| `base.njk` | `src/_layouts/base.njk` | Base HTML structure (extends `_includes/base.njk`) |
| `home.njk` | `src/_layouts/home.njk` | Homepage with hero section |
| `page.njk` | `src/_layouts/page.njk` | Standard page layout |
| `post.njk` | `src/_layouts/post.njk` | Blog post layout |

### Available Includes

| Include | File | Usage |
|---------|------|-------|
| `base.njk` | `src/_includes/base.njk` | HTML skeleton with head/body |
| `header.njk` | `src/_includes/header.njk` | Site header with navigation |
| `footer.njk` | `src/_includes/footer.njk` | Site footer |
| `hero.njk` | `src/_includes/hero.njk` | Hero section with background |
| `card.njk` | `src/_includes/card.njk` | Blog/post card component |

### Shortcodes

#### YouTube Embed
```njk
{% youtube "VIDEO_ID", "Video Title" %}
```
Example:
```njk
{% youtube "dQw4w9WgXcQ", "Démonstration EFMIE 2024" %}
```

#### Image
```njk
{% image "/path/to/image.jpg", "Alt text", "Optional caption" %}
```

#### Meta Tags (SEO)
```njk
{% meta page %}
```
Automatically generates title, description, OpenGraph, and Twitter meta tags from front matter.

### Data Files

Global site data is in `src/_data/site.json`:
```json
{
  "title": "EFMIE Tai Chi Chuan",
  "description": "École de Tai Chi Chuan à Paris",
  "url": "https://efmie-taichi.fr",
  "contact": {
    "email": "contact@efmie-taichi.fr"
  }
}
```

Access in templates via `site.title`, `site.contact.email`, etc.

## Build Process

### Local Development
```bash
npm install
npm start      # Starts dev server at http://localhost:8080
npm run build  # Production build to _site/
```

### CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Runs on push to `main` or PR to `main`
2. Installs dependencies with `npm ci`
3. Builds the site with `npm run build`
4. Deploys to GitHub Pages

**Before pushing changes:**
- Test locally with `npm start`
- Ensure all layout references are correct
- Verify the build completes without errors

## Validation Checklist

Before committing or opening a PR, verify:

- [ ] **Layout references** do not include `_layouts/` or `_includes/` prefixes
- [ ] **Front matter** is present and valid in all content files
- [ ] **Required fields** are present (title, description, layout)
- [ ] **Blog posts** have `date` field for proper sorting
- [ ] **Images** use lazy loading (`loading="lazy"`)
- [ ] **YouTube embeds** use the `{% youtube %}` shortcode
- [ ] **Build completes** locally without errors
- [ ] **No console errors** in the browser

## Common Pitfalls

### 1. Layout Path Errors
**Symptom:** Build fails with `You're trying to use a layout that does not exist: _layouts/page.njk`

**Fix:** Remove the `_layouts/` prefix from the layout reference in front matter.

### 2. Missing Front Matter
**Symptom:** Page renders without title or with default values.

**Fix:** Add proper front matter with at least `layout`, `title`, and `description`.

### 3. Broken Links
**Symptom:** 404 errors for internal links.

**Fix:** Use relative paths without leading slashes for internal links (e.g., `a-propos/` not `/a-propos/`).

### 4. Missing Dependencies
**Symptom:** Build fails with module not found errors.

**Fix:** Run `npm install` and commit the updated `package-lock.json`.

## File Structure Reference

```
.
├── src/
│   ├── _includes/          # Reusable components
│   │   ├── base.njk        # HTML skeleton
│   │   ├── header.njk      # Site header
│   │   ├── footer.njk      # Site footer
│   │   ├── hero.njk        # Hero section
│   │   └── card.njk        # Card component
│   │
│   ├── _layouts/           # Page templates
│   │   ├── base.njk        # Base layout
│   │   ├── home.njk        # Homepage layout
│   │   ├── page.njk        # Standard page layout
│   │   └── post.njk        # Blog post layout
│   │
│   ├── _data/              # Global data
│   │   └── site.json       # Site metadata
│   │
│   ├── posts/              # Blog articles (Markdown)
│   │   ├── 2024-01-01-post.md
│   │   └── 2024-02-01-post.md
│   │
│   ├── css/                # Stylesheets
│   │   └── styles.css      # Main styles
│   │
│   ├── js/                 # JavaScript (optional)
│   ├── images/             # Static images
│   ├── index.njk           # Homepage
│   ├── a-propos.njk        # About page
│   ├── contact.njk         # Contact page
│   └── blog/
│       └── index.njk       # Blog index
│
├── .eleventy.js            # Eleventy configuration
├── package.json            # Dependencies
├── package-lock.json      # Lock file (keep in sync!)
├── .github/
│   ├── workflows/
│   │   └── deploy.yml      # CI/CD pipeline
│   └── AGENTS.md           # This file
├── .gitignore
└── README.md
```

## Testing

### Local Testing
1. Run `npm start`
2. Visit `http://localhost:8080`
3. Navigate through all pages
4. Check for console errors
5. Verify responsive design on different screen sizes

### Pre-Commit Checklist
- [ ] `npm run build` completes without errors
- [ ] All pages render correctly
- [ ] All links work
- [ ] Images load properly
- [ ] YouTube embeds work
- [ ] Mobile menu toggles correctly

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test locally
4. Commit with descriptive message
5. Push and open a PR
6. Wait for CI to pass
7. Address any review comments

## Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Nunjucks Documentation](https://mozilla.github.io/nunjucks/templating.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://pages.github.com/)

## Contact

For questions or issues, contact the project maintainers via GitHub issues or discussions.
