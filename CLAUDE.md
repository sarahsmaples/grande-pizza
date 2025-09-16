# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Building and Development
- `npm run serve` - Start development server with live reloading at http://localhost:8080
- `npm run build` - Build the project for production (compiles CSS and generates static files)
- `npm run watch` - Watch for changes and rebuild CSS/templates automatically
- `npm run build:css` - Compile SASS to CSS using PostCSS and TailwindCSS
- `npm run watch:css` - Watch SASS files for changes and recompile

### Project Structure and Architecture

This is an **11ty (Eleventy) static site generator** template specifically designed for restaurant websites. The architecture follows a component-based approach with Nunjucks templating.

#### Core Technology Stack
- **11ty (Eleventy)** - Static site generator
- **Nunjucks** - Templating engine with includes and layouts
- **TailwindCSS + SASS** - Utility-first CSS framework with custom SASS compilation
- **PostCSS + Autoprefixer** - CSS processing pipeline

#### Key Architectural Patterns

**Template Hierarchy:**
- Base layout: `src/_includes/layouts/base.njk` - Contains HTML structure, meta tags, and schema markup
- Components: `src/_includes/components/` - Reusable template blocks (header, hero, footer, etc.)
- Pages extend base layout and compose components

**Data-Driven Content:**
- All client/restaurant data centralized in `src/_data/client.js`
- Template components access data via `{{ client.* }}` variables
- This allows easy customization without touching template files

**Asset Pipeline:**
- SASS compilation: `src/assets/sass/styles.scss` → `src/assets/css/styles.css`
- TailwindCSS processes Nunjucks files for utility classes
- Assets are passthrough copied during build

#### Configuration Files
- `.eleventy.js` - Eleventy configuration with plugins for sitemap, navigation, and minification
- `tailwind.config.js` - TailwindCSS scans `.njk`, `.html`, `.md` files
- `postcss.config.js` - PostCSS pipeline with TailwindCSS and Autoprefixer

#### Development Workflow
1. **Content Changes**: Update `src/_data/client.js` for restaurant information
2. **Styling**: Modify `src/assets/sass/styles.scss` and use Tailwind utility classes in templates
3. **Components**: Add/modify components in `src/_includes/components/`
4. **New Pages**: Create `.njk` files in `src/` with frontmatter for page-specific metadata
5. **Testing**: Use `npm run serve` for live development with auto-reload

#### Creating New Pages
To create a new page with custom metadata:

```njk
---
title: "Page Title - {{ client.name }}"
description: "Page description for SEO and social media sharing."
---
{% extends "layouts/base.njk" %}

{% block content %}
  <!-- Your page content here -->
{% endblock %}
```

The frontmatter YAML provides page-specific `title` and `description` variables that override the base layout's meta tags for SEO and social media.

#### Important Notes
- The build process requires both CSS compilation AND Eleventy generation
- Templates use Nunjucks syntax with client data variables
- Images should be placed in `src/assets/images/` (passthrough copied)
- The site outputs to `dist/` directory for deployment