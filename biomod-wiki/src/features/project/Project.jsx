import content from "./project-content.json"
import TextBlock from "/src/Components/TextComponents.jsx"
import LinkWrapper from "/src/Components/LinkComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"
import ReferencesViewer from "/src/Components/ReferencesViewer.jsx"
import ProteinViewer from "/src/Components/ProteinViewer.jsx"


export default function Project() {
    const sections = [
        {
            id: "project",
            title: "Project",
            render: () => (
                <>
                    <h1>Aptonix</h1>
                </>
            )
        },
        {
            id: "abstract",
            title: "Abstract",
            render: () => (
                <>
                    <TextBlock {...content.Abstract}/>
                </>
            )
        }
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}