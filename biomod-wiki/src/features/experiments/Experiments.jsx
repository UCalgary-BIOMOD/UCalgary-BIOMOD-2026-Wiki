import content from "./experiment-content.json"
import PageLayout from "/src/Components/PageLayout.jsx"
import ViewportSection from "/src/Components/ViewportSection.jsx"
import ExperimentTabs from "/src/Components/ExperimentTabs.jsx"

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
