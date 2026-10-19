/*The five experiment categories. `key` matches the `tag:` in an experiment's markdown front-matter; colors are defined in index.css*/
export const CATEGORIES = [
    {key: "Dendrimer", label: "Dendrimer", groupLabel: "Dendrimer Experiments", color: "var(--dendrimer)"},
    {key: "TMSD", label: "TMSD", groupLabel: "TMSD Experiments", color: "var(--tmsd)"},
    {key: "Aptamer", label: "Aptamer", groupLabel: "Aptamer Experiments", color: "var(--aptamer)"},
    {key: "Electrode", label: "Electrode", groupLabel: "Electrode Experiments", color: "var(--electrode)"},
    {key: "Full System", label: "Full System", groupLabel: "Full System Confirmation", color: "var(--full-system)"},
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
