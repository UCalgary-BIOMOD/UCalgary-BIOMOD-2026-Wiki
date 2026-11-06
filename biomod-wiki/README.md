# UCalgary BIOMOD 2026 Wiki (developer guide)

The team wiki for **Aptonix**, our aptamer-based electrochemical biosensor for amyloid-beta 42. It is a React single-page app built with Vite.

This file explains how the code is organised and where to change things. The Git Flow branching rules and the commit-message format are in the [repository README](../README.md); the notebook entry format is in [`src/content/README.md`](src/content/README.md).

## Run it

```bash
cd biomod-wiki
npm install        # first time only (use `npm ci` to install exactly what package-lock.json lists)
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run lint       # eslint
```

Do not run `npm audit fix --force` or upgrade packages casually. It can silently downgrade or break libraries (an old `ngl` version once blanked the entire site, because `App.jsx` imports every page).

## How the code is organised

```
src/
  App.jsx            routes (react-router); add a page here and in NavBar/Footer
  index.css          design tokens: colors, fluid font sizes (--fs-*), spacing (--space-*)
  main.jsx           entry point
  Components/        shared, reusable pieces (Name.jsx + Name.module.css)
  features/<page>/   one folder per page (see below)
  content/           notebook entries as markdown (see content/README.md)
public/
  images/ files/ proteins/   served as-is; refer to them as "/images/..." in code and JSON
```

### Pages ("features")

Every page is a folder in `src/features/`. Its page file builds a list of **sections** (`{id, title, render}`) and hands it to `PageLayout`, which draws the banner, the side navigation (built from the section titles), the sections and the footer. Page text lives in a `*-content.json` next to the page, so most edits need no React.

| Route | Folder | Where the content is | Notes |
| --- | --- | --- | --- |
| `/` | `features/home` | text in `Home.jsx`; references in `home-content.json` | scroll animations use `useScroll` from `motion` |
| `/project` | `features/project` | `project-content.json` | abstract and link grid |
| `/description` | `features/description` | `description-content.json` | paragraphs, goals checklist, references |
| `/modelling` | `features/modelling` | none yet | placeholder |
| `/experiments` | `features/experiments` | `experiment-content.json` | numbered tabs per experiment group |
| `/results` | `features/results` | none yet | placeholder |
| `/notebook` | `features/notebook` | `src/content/experiments/*.md` | weekly timeline plus experiment dropdowns |
| `/elsi` | `features/elsi` | `ELSI-content.json` | includes the hazard table |
| `/team` | `features/team` | `team-content.json` | member popups and Support section |
| `/test` | `features/test` | `test-content.json` | developer sandbox, not part of the finished site |

### Shared components (`src/Components`)

| Group | Components |
| --- | --- |
| Page frame | `PageLayout` (banner, side nav, footer), `NavBar`, `Footer`, `ScrollToTop`, `ViewportSection`, `SplitSection` / `SplitHalf`, `MainHeading`, `SecondHeading` |
| Text | `TextBlock` (`TextComponents.jsx`), `Paragraphs` (accepts simple HTML like `<sub>`), `References`, `ReferencesViewer`, `FigureArea`, `Table` |
| Interactive | `VerticalCard` (accordion; `centered` prop), `GoalSection` + `CoverOver` (goal checklist), `ImageCarousel`, `PopUpCard`, `ExperimentTabs`, `LabEntry`, `PDFViewer`, `YouTubeEmbed` |
| 3D and animation | `ProteinViewer` (NGL), `MoleculeLegend`, `BrainAnimation`, `TreeAnimation` |
| Notebook | `NotebookTimeline`, `ExperimentCard`, `CategoryLegend`, `experimentCategories.js` |
| Links | `LinkWrapper` (`LinkComponents.jsx`), `LinkGrid` |

Each component file starts with a doc comment listing its props. Read that before using it.

## Conventions

- Imports are written from the project root: `"@/Components/..."` (the `@` alias is `src`, set in `vite.config.js`). Some older files use `"/src/..."`; both work.
- Use double quotes for all strings and paths.
- Build pages from the shared components and pass data in as props; do not copy markup between pages.
- Style from CSS modules (`Name.module.css`, used as `styles.thing`). Take colors, font sizes and spacing from the tokens in `index.css` (`var(--text-h)`, `var(--fs-h3)`, `var(--space-md)`). Inline `style` is only for values computed at runtime (for example a color that comes from data).
- Size things so they work at any width without per-page breakpoints; the scaling rules are in the repository README under "Scaling & Layout".
- Comment as you go: a doc comment on every component and page (purpose, props, where its content lives), and a short comment on anything non-obvious.

## Common tasks

**Add a page.** Create `src/features/<name>/<Name>.jsx` (and `<name>-content.json` if it has text), add its `<Route>` in `App.jsx`, and add links in `NavBar.jsx` and `Footer.jsx`.

**Edit page text.** Change the page's `*-content.json`. Paragraph strings may contain simple HTML (`<sub>`, `<sup>`, `<em>`, `<strong>`).

**Add or tick off a goal.** In `description-content.json`, each goal is a string, or `{"text": "...", "done": true}` to show it as a checked box.

**Add a notebook entry.** Add a markdown file to `src/content/experiments/` (format and rules in `src/content/README.md`). It appears on the timeline and in its category dropdown automatically.

**Add references.** Add `{ "text": "...", "url": "..." }` to the page's `references` list, in the same order as the numbers cited in the text.

## Before you open a pull request

1. `npm run build` succeeds and the pages you touched work at a phone width and a desktop width.
2. Move between pages and check the new page starts at the top.
3. Commit with the `tag: caption` format, with a description that states the problem and what you changed.
