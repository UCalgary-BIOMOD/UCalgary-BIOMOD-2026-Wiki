/*The experiment categories the team worked on (Dendrimer, Electrode and Full System were removed because no entries used them).
  To bring one back, add its line here again (see src/content/README.md, "Adding a new notebook category").
  `key` matches the `tag:` in an experiment's markdown front-matter; colors are defined in index.css*/
export const CATEGORIES = [
    {key: "TMSD", label: "TMSD", groupLabel: "TMSD Experiments", color: "var(--tmsd)"},
    {key: "Aptamer", label: "Aptamer", groupLabel: "Aptamer Experiments", color: "var(--aptamer)"},
]

/**
 * Finds the category an experiment belongs to from its `tag` front-matter.
 * @param experiment A loaded notebook experiment
 * @returns The matching category, or undefined if it has no known tag
 */
export function categoryOf(experiment) {
    const tags = Array.isArray(experiment.tag) ? experiment.tag : [experiment.tag]
    return CATEGORIES.find((category) => tags.includes(category.key))
}
