# Brian Wang — Portfolio

Personal portfolio site built with Next.js, Tailwind CSS, and TypeScript. Deploys to GitHub Pages as a fully static export.

**Live:** [https://bwang257.github.io](https://bwang257.github.io)

---

## Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Styling:** Tailwind CSS v3 with CSS custom properties
- **Fonts:** Instrument Serif · DM Sans · Geist Mono (Google Fonts)
- **Content:** Markdown files in `content/projects/` parsed with `gray-matter`
- **Deployment:** GitHub Pages via `gh-pages`

## Project structure

```
src/
  app/
    page.tsx                  # Main portfolio (hero, projects, stack, experience)
    layout.tsx                # Root layout — nav, noise overlay, Google Fonts
    projects/
      page.tsx                # Projects list
      [slug]/page.tsx         # Project case study (rendered from markdown)
  components/
    Nav.tsx                   # Fixed top navigation
    CodeBlock.tsx             # Code snippet display
  lib/
    projects.ts               # Loads and parses markdown project files
content/
  projects/                   # Markdown files — one per project
public/
  resume.pdf
```

## Development

```bash
npm install
npm run dev
```

## Build & deploy

```bash
# Build static export to out/
npm run build

# Deploy to GitHub Pages
npm run deploy
```

The build output goes to `out/`. The `postexport` script adds a `.nojekyll` file so GitHub Pages serves `_next/` assets correctly.
