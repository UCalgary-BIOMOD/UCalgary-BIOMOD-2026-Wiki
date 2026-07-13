
import TextBlock from "/src/Components/TextComponents.jsx"
import LinkWrapper from "/src/Components/LinkComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"
import ReferencesViewer from "/src/Components/ReferencesViewer.jsx"
import ProteinViewer from "/src/Components/ProteinViewer.jsx"


export default function Description() {
    const sections = [
        {
            id: "description",
            title: "Description",
            render: () => (
                <>
                    <h1>Description</h1>
                </>
            )
        }
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}