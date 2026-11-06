import content from "./experiment-content.json"
import PageLayout from "/src/Components/PageLayout.jsx"
import ViewportSection from "/src/Components/ViewportSection.jsx"
import ExperimentTabs from "/src/Components/ExperimentTabs.jsx"

/**
 * The Experiments page (/experiments): one section per group in experiment-content.json (Aptamer, TMSD, ...),
 * each shown as numbered tabs (ExperimentTabs). To add or edit experiments, edit that JSON; see src/content/README.md.
 */
export default function Experiments() {
    const sections = content.groups.map((group) => ({
        id: group.id,
        title: group.navTitle,
        render: () => (
            <ViewportSection center>
                <ExperimentTabs title = {group.title} experiments = {group.experiments} />
            </ViewportSection>
        )
    }))
    return (
        <PageLayout sections = {sections} bannerImgs = {["/images/dna-ladder.png"]} bannerHeight = "40svh" caption = "EXPERIMENTS"/>
    )
}
