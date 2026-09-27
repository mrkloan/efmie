# Agents Instructions for EFMIE Tai Chi Website

This file contains instructions for AI agents and contributors working on the EFMIE Tai Chi Chuan website project.

## Project Overview

- **Framework**: Eleventy (11ty) static site generator
- **Templates**: Nunjucks (`.njk`)
- **Content**: Markdown files with YAML front matter
- **Styling**: Hand-written CSS (no frameworks)
- **Hosting**: GitHub Pages with custom domain
- **CI/CD**: GitHub Actions

---

## ⚠️ CRITICAL: Validation

**BEFORE PUSHING ANY COMMIT**, you **MUST** run:

```bash
npm run build
```

**If the build fails, DO NOT PUSH - fix the errors first!**

The CI pipeline will also run `npm run build` on every push and PR as a secondary check.
**Do NOT merge changes that fail the CI build.**

If CI build fails:
1. Check the CI logs for the exact error
2. Fix the issue in your branch
3. Run `npm run build` locally to verify the fix
4. Push the fix and wait for CI to pass
5. Only then request review/merge

---

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
layout: _layouts/page.njk  # ❌ WRONG - will fail with "layout does not exist"
---
```

### Include Statements with Objects

**CRITICAL**: Nunjucks does NOT support inline object literals in include statements.

**Incorrect (causes "expected block end in include statement" error):**
```njk
{% include "card.njk", {
  "title": "Test",
  "url": "/test/"
} %}
```

**Correct approach - separate variable declaration:**
```njk
{% set cardData = {
  "title": "Test",
  "url": "/test/"
} %}
{% include "card.njk", cardData %}
```

Or even simpler (if the include uses default values):
```njk
{% set cardData = {
  "title": "Test",
  "url": "/test/"
} %}
{% include "card.njk" %}
```

**NEVER use this syntax:**
```njk
{% include "file.njk", { key: "value" } %}  # ❌ WRONG
```

### Circular Layout References

**CRITICAL**: Layouts cannot reference themselves, directly or indirectly.

**Incorrect (causes "circular reference" error):**
```njk
# src/_layouts/base.njk
---
layout: base.njk  # ❌ WRONG - self-reference
---
```

**Correct:**
```njk
# src/_layouts/base.njk
---
layout: ../_includes/base.njk  # ✅ Points to the actual HTML skeleton
---
```

### Template Files

- **Layouts** go in `src/_layouts/` (e.g., `base.njk`, `page.njk`, `post.njk`, `home.njk`)
- **Includes** go in `src/_includes/` (e.g., `header.njk`, `footer.njk`, `hero.njk`, `card.njk`)
- **Pages** go in `src/` (e.g., `index.njk`, `a-propos.njk`, `contact.njk`)
- **Blog posts** go in `src/posts/` as Markdown files (e.g., `2024-09-27-demo.md`)
- **Blog index** is at `src/blog/index.njk`

---

## Layout Hierarchy

```
src/_includes/base.njk          # Root HTML skeleton (DOCTYPE, <html>, <head>, <body>)
    ↓
src/_layouts/base.njk         # Base layout (extends _includes/base.njk)
    ├─→ src/_layouts/home.njk    # Homepage layout (extends base.njk)
    ├─→ src/_layouts/page.njk    # Standard page layout (extends base.njk)
    └─→ src/_layouts/post.njk    # Blog post layout (extends base.njk)
```

**Rule**: Each layout level should extend the one above it. Never create circular dependencies.

---

## Front Matter Requirements

### Pages (`.njk` files in `src/`)
```yaml
---
layout: page.njk          # Required: page, home, or post
title: "Page Title"       # Required: for <title> and <h1>
description: "SEO description"  # Required: for meta description
---
```

### Blog Posts (`.md` files in `src/posts/`)
```yaml
---
layout: post.njk          # Required
title: "Post Title"       # Required
date: 2024-01-01         # Required: for sorting (YYYY-MM-DD format)
description: "SEO description"  # Required
image: /images/photo.jpg # Optional: for featured image
tags: [tag1, tag2]      # Optional: for categorization
youtube_id: ABC123      # Optional: for YouTube embed
---
```

---

## Shortcodes

### YouTube Embed
```njk
{% youtube "VIDEO_ID", "Video Title" %}
```
Example:
```njk
{% youtube "dQw4w9WgXcQ", "Démonstration EFMIE 2024" %}
```

**Note**: This shortcode is defined in `.eleventy.js` and generates a responsive, lazy-loaded iframe.

### Image
```njk
{% image "/path/to/image.jpg", "Alt text", "Optional caption" %}
```

### Meta Tags (SEO)
```njk
{% meta page %}
```
Automatically generates title, description, OpenGraph, and Twitter meta tags from front matter.

---

## Data Files

Global site data is in `src/_data/site.json`:
```json
{
  "title": "École des Formes Martiales Internes et Externes (EFMIE)",
  "short_title": "EFMIE",
  "description": "Tai Chi Chuan et Qi Gong à Neuilly-sur-Seine - Cours pour tous niveaux, démonstrations et événements",
  "url": "https://mrkloan.github.io/efmie/",
  "language": "fr",
  "contact": {
    "email": "efmie92@gmail.com",
  }
}
```

Access in templates via `site.title`, `site.contact.email`, etc.

---

## Build Process

### Local Development
```bash
npm install
npm run build  # Production build to _site/
```

### CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Runs on push to any branch
2. Installs dependencies with `npm ci`
3. Builds the site with `npm run build`
4. Fails if build errors occur

**Always check CI status before merging.**

---

## Validation Checklist

**MANDATORY**: Before committing or opening a PR, verify:

### Template & Layout Checks
- [ ] **Layout references** do NOT include `_layouts/` or `_includes/` prefixes
- [ ] **Include statements** with objects use separate `{% set %}` declaration
- [ ] **No circular layout references** (layout doesn't reference itself)
- [ ] **Front matter** is present and valid in ALL content files

### Content Checks
- [ ] **Required fields** are present (title, description, layout)
- [ ] **Blog posts** have `date` field in YYYY-MM-DD format
- [ ] **All pages** have unique, descriptive titles
- [ ] **Descriptions** are meaningful for SEO

### Build Validation
- [ ] **`npm run build` completes without errors** (run locally before pushing)
- [ ] **CI build passes** (check GitHub Actions status)
- [ ] **Images** use lazy loading (`loading="lazy"`)
- [ ] **YouTube embeds** use the `{% youtube %}` shortcode
- [ ] **package-lock.json** is up to date (if package.json changed)

### File Structure
- [ ] New layouts go in `src/_layouts/`
- [ ] New includes go in `src/_includes/`
- [ ] New pages go in `src/`
- [ ] New blog posts go in `src/posts/`

---

## Common Pitfalls & Fixes

### 1. Layout Path Errors
**Symptom:** Build fails with `You're trying to use a layout that does not exist: _layouts/page.njk`

**Cause:** Using `_layouts/` prefix in front matter layout reference.

**Fix:** Remove the prefix:
```yaml
# ❌ WRONG
layout: _layouts/page.njk

# ✅ CORRECT
layout: page.njk
```

### 2. Circular Layout References
**Symptom:** Build fails with `Your layouts have a circular reference, starting at page.njk!`

**Cause:** A layout file references itself (directly or indirectly).

**Fix:** Ensure layout hierarchy is correct. Base layouts should extend `_includes/base.njk`:
```njk
# src/_layouts/base.njk
---
layout: ../_includes/base.njk  # ✅ Correct
---
```

### 3. Include Statement Syntax Errors
**Symptom:** Build fails with `expected block end in include statement`

**Cause:** Using inline object literal in include statement.

**Fix:** Separate variable declaration from include:
```njk
# ❌ WRONG
{% include "card.njk", {
  "title": "Test",
  "url": "/test/"
} %}

# ✅ CORRECT
{% set cardData = {
  "title": "Test",
  "url": "/test/"
} %}
{% include "card.njk", cardData %}

# ✅ ALSO CORRECT (simplest)
{% set cardData = { "title": "Test", "url": "/test/" } %}
{% include "card.njk" %}
```

### 4. Undefined page.url
**Symptom:** Build fails with `Unable to call page["url"]["startswith"]`, which is undefined or falsey

**Cause:** Using `page.url` in includes (like header.njk) where it may not be available during build.

**Fix:** Move navigation active state logic to client-side JavaScript, or use a safer check:
```njk
# In templates where page.url might be undefined:
{% if page and page.url and page.url == '/' %}is-active{% endif %}

# OR BETTER: Handle in JavaScript
```

### 5. Missing Front Matter
**Symptom:** Page renders without title or with default values.

**Fix:** Add proper front matter with at least `layout`, `title`, and `description`.

### 6. Broken Links
**Symptom:** 404 errors for internal links.

**Fix:** Use correct path format:
- Internal links: `a-propos/` or `/a-propos/` (both work)
- External links: Full URL with `https://`

### 7. Missing Dependencies
**Symptom:** Build fails with module not found errors.

**Fix:** Run `npm install` and commit the updated `package-lock.json`.

### 8. Character Encoding Issues
**Symptom:** Strange characters in output (é, è, ç showing as codes).

**Fix:** Ensure files are saved as UTF-8. Use proper YAML escaping for special characters:
```yaml
title: "À propos"  # ✅ Correct
title: "\u00c0 propos"  # ✅ Also works
```

---

## File Structure Reference

```
.
├── AGENTS.md                   # This file - READ FIRST!
├── README.md                   # Project documentation
├── .eleventy.js                # Eleventy configuration
├── package.json                # Dependencies and scripts
├── package-lock.json           # Lock file (keep in sync!)
├── .gitignore
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── src/
│   ├── _includes/             # Reusable components
│   │   ├── base.njk           # HTML skeleton (root template)
│   │   ├── header.njk         # Site header with navigation
│   │   ├── footer.njk         # Site footer
│   │   ├── hero.njk           # Hero section component
│   │   └── card.njk           # Card component for blog posts
│   │
│   ├── _layouts/              # Page templates
│   │   ├── base.njk           # Base layout (extends _includes/base.njk)
│   │   ├── home.njk           # Homepage layout
│   │   ├── page.njk           # Standard page layout
│   │   └── post.njk           # Blog post layout
│   │
│   ├── _data/                 # Global data
│   │   └── site.json          # Site metadata
│   │
│   ├── posts/                 # Blog articles (Markdown)
│   │   ├── 2024-07-01-post.md
│   │   └── 2024-08-15-post.md
│   │
│   ├── css/                   # Stylesheets
│   │   └── styles.css         # Main styles
│   │
│   ├── js/                    # JavaScript (optional)
│   ├── images/                # Static images
│   ├── index.njk              # Homepage
│   ├── a-propos.njk           # About page
│   ├── contact.njk            # Contact page
│   └── blog/
│       └── index.njk          # Blog index page
└── _site/                    # Build output (gitignored)
```

---

## Testing

### CI/CD Pipeline Validation

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Runs on push to any branch
2. Installs dependencies with `npm ci`
3. Builds the site with `npm run build`
4. Fails if build errors occur

**Always check CI status before merging.**
- [ ] `npm run build` completes with exit code 0
- [ ] All pages render correctly in local dev
- [ ] No console errors in browser
- [ ] All links work (no 404s)
- [ ] Images display correctly
- [ ] Mobile menu works
- [ ] All forms (if any) submit correctly

---

## Contributing

1. **Read this file (AGENTS.md) first**
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes following all guidelines above
4. **Run `npm run build` and fix any errors**
5. Test locally with `npm start`
6. Commit with descriptive message
7. Push and open a PR
8. CI will run automatically - if it fails, fix locally and push again

---

## Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Nunjucks Documentation](https://mozilla.github.io/nunjucks/templating.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://pages.github.com/)

---

## Troubleshooting

### Build fails with template error
1. Check the exact error message
2. Look at the line number mentioned
3. Verify you're not using inline objects in include statements
4. Verify layout references don't have `_layouts/` prefix
5. Check for circular layout references

### Build succeeds but page renders incorrectly
1. Check browser console for errors
2. Verify front matter is correct
3. Ensure all required fields are present
4. Check that layout hierarchy is correct

### Styles not applying
1. Verify CSS file is in `src/css/`
2. Check that the file is referenced correctly in templates
3. Use browser dev tools to inspect elements

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│ LAYOUT REFERENCES                                            │
├─────────────────────────────────────────────────────────────┤
│ ✅ layout: page.njk                                          │
│ ✅ layout: home.njk                                          │
│ ✅ layout: post.njk                                          │
│ ❌ layout: _layouts/page.njk    ← WRONG!                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ INCLUDE WITH OBJECTS                                         │
├─────────────────────────────────────────────────────────────┤
│ ✅ {% set data = {...} %}                                   │
│    {% include "file.njk" %}                                 │
│ ❌ {% include "file.njk", {...} %}  ← WRONG!                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PRE-COMMIT VALIDATION                                        │
├─────────────────────────────────────────────────────────────┤
│ 1. npm run build                                             │
│ 2. Check exit code is 0                                     │
│ 3. Only push if build succeeds                              │
└─────────────────────────────────────────────────────────────┘
```
