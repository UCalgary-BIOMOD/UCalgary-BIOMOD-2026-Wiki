import content from "./experiment-content.json"
import PageLayout from "/src/Components/PageLayout.jsx"
import ViewportSection from "/src/Components/ViewportSection.jsx"
import ExperimentTabs from "/src/Components/ExperimentTabs.jsx"
import PDFViewer from "/src/Components/PDFViewer.jsx"

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
    sections.push({
        id: "protocol-safety",
        title: "Protocol Safety",
        render: () => (
            <ViewportSection center>
                <PDFViewer
                    pdfPath="/files/Protocol Safety.pdf"
                    caption="Protocol Safety"
                    id="protocol-safety-pdf"
                />
            </ViewportSection>
        )
    })
    return (
        <PageLayout sections = {sections} bannerImgs = {["./images/basic-banner.png"]} bannerHeight = "50svh" caption = "EXPERIMENTS"></PageLayout>
    )
}
