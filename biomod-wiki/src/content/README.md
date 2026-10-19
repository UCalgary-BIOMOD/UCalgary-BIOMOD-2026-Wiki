# Filling in the Notebook and Experiments pages

Two pages, two places to edit. You never need to touch any `.jsx` file to add content.

| Page | You edit | One file per... |
| --- | --- | --- |
| `/notebook` | `src/content/experiments/*.md` | day-of-work entry |
| `/experiments` | `src/features/experiments/experiment-content.json` | the whole page |

After saving, run `npm run dev` and check the page in the browser before you commit.

---

## 1. Notebook entries (`src/content/experiments/`)

### Add an entry

1. Copy an existing file in `src/content/experiments/` (for example `TEN-APS.md`) and rename it. The file name does not matter, but keep it short, with no spaces, and ending in `.md`.
2. Change the top block (between the `---` lines), then write the body underneath.

```md
---
id: 4
title: Preparing 10% APS
caption: 10% APS
dates:
  - 2026-06-02
  - 2026-06-09
researchers:
  - Sofea
  - Sukhman
tag:
  - TMSD
---

## Objective

One or two sentences on why we ran this.

## Materials

- 1.5 g Ammonium Persulfate (APS)
- 15 mL Deionized Water

## Procedure

1. First step.
2. Second step.

## Notes/Observations

- Anything that looked odd or went differently.

## Results

## Sample Calculations

## Supplementary Information
```

### What each top field does

| Field | Rules |
| --- | --- |
| `id` | A number that is **unique** across all entries. Entries are listed lowest `id` first, so use the next free number. |
| `title` | The full name. Shown on the accordion header and the phone day view. |
| `caption` | A short label (about 20 characters) shown on the calendar square. A long caption is cut off with "...". |
| `dates` | Every day the work happened, as `YYYY-MM-DD` with **no quotes**. An entry with several dates appears on each one. |
| `researchers` | One name per line. |
| `tag` | **Exactly one** of: `Dendrimer`, `TMSD`, `Aptamer`, `Electrode`, `Full System`. It sets the dot color and which accordion the entry sits in. Spelling and capitals must match. |
| `images` (optional) | A list of image paths under `public/`, e.g. `- /images/gel-1.png`. They show as a gallery next to the text. |
| `description` (optional) | One or two sentences. If present, the phone calendar shows this text instead of a "View details" button. |

### Body sections

Use `##` headings, in this order, to match the lab-entry template: **Objective, Materials, Procedure, Notes/Observations, Results, Sample Calculations, Supplementary Information**. Leave out a section if it has no content yet. Lists use `-` (bullets) or `1.` (numbers). Indent sub-steps by two spaces.

### Things that trip people up

- **Quotes around dates break the entry.** Write `2026-06-02`, never `"2026-06-02"`.
- **A missing or misspelled `tag` hides the entry.** It is not placed in any accordion, and its calendar dot turns plain white. If an entry is not showing, check the tag first.
- **The calendar only covers June to September 2026** (set by `MIN_MONTH` / `MAX_MONTH` at the top of `src/Components/NotebookComponent.jsx` and `NotebookMobileComponent.jsx`). An entry dated outside that range still appears in its accordion, but has no calendar square. Ask for the range to be extended if you need other months.
- Indent the YAML with spaces, not tabs.

### Colors

| Tag | Color |
| --- | --- |
| Dendrimer | tan |
| TMSD | red |
| Aptamer | yellow |
| Electrode | blue |
| Full System | green |

The legend on the page is built from the same list, so a new color only has to be defined once (see "Adding a new category" below).

---

## 2. Experiments page (`src/features/experiments/experiment-content.json`)

The page is a list of **groups** (Aptamer, TMSD, Dendrimer, Electrode, Full System). Each group becomes a section with a numbered list, a row of numbered tabs, and one window showing the selected experiment. **Tab 1 is the first item in `experiments`, tab 2 the second, and so on.** The tabs and the numbered list are made for you.

### Add or fill in an experiment

Find the group and add an object to its `experiments` list. Only `title` is required; any field you skip shows as a blank line in the template, ready to fill in later.

```json
{
    "id": "tmsd",
    "title": "TMSD Experiments",
    "navTitle": "TMSD",
    "experiments": [
        {
            "title": "10% APS",
            "purpose": "Make 10% APS for casting native PAGE gels.",
            "lastEdited": "2026/06/02",
            "materials": "- 1.5 g Ammonium Persulfate (APS)\n- 15 mL Deionized Water\n- 50 mL Conical Tube",
            "procedure": "1. Add 15 mL deionized water to the tube.\n2. Weigh out 1.5 g APS and add it.\n3. Invert until dissolved.",
            "notes": "Store at 4 C and use within a week.",
            "results": "",
            "calculations": "",
            "supplementary": ""
        }
    ]
}
```

| Field | Template label | Notes |
| --- | --- | --- |
| `title` | Title of Lab | Also used in the numbered list above the tabs. |
| `purpose` | Purpose/Objective of Lab | One line. |
| `partners` | Partner(s) | Optional; the line only appears if you set it. |
| `lastEdited` | Last Edited (yyyy/mm/dd) | Update it whenever you change the entry. |
| `materials` | Materials | Markdown. |
| `procedure` | Procedure | Markdown. |
| `notes` | Notes/Observations | Markdown. |
| `results` | Results | Markdown. |
| `calculations` | Sample Calculations | Markdown. |
| `supplementary` | Supplementary Information | Markdown. |

### Writing multi-line text in JSON

JSON has no real line breaks inside a string, so write `\n` where you want a new line. Markdown works inside these strings:

- bullets: start a line with `- `
- numbered steps: start a line with `1. `, `2. `, ...
- bold: `**text**`

Other JSON rules: keep the quotes around keys and text, put a comma between items, and **no comma after the last item**. If the page goes blank after an edit, a missing or extra comma is almost always the cause. Pasting the file into any JSON validator will point at the line.

### How the tabs behave

- Up to **6 tabs** show at once. With more, "..." buttons appear at the edges to page through the rest (for example `1 2 3 4 5 ...`, then `... 6 7 8 9 ...`).
- Arrow keys move between tabs. On a phone, tap the "..." to page.
- A group with an empty `experiments` list shows "No experiments added yet."

### Add a new group

Copy a whole group block, give it a new unique lowercase `id` (no spaces) and a `title`, and set `navTitle` to the short word for the side menu. Groups appear in the order they are listed.

---

## 3. Adding a new notebook category (rare)

1. Add a color in `src/index.css`, next to `--electrode` / `--full-system`.
2. Add a line to `CATEGORIES` in `src/Components/experimentCategories.js`: `key` (the exact `tag` text), `label` (legend), `groupLabel` (accordion header), and `color`.

The calendar dots, legend and accordions all update from that one list.
