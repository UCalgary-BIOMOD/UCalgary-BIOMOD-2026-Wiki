import { useState } from "react"
import content from "./home-content.json"
import TextBlock from "/src/Components/TextComponents.jsx"
import LinkWrapper from "/src/Components/LinkComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"
import ReferencesViewer from "/src/Components/ReferencesViewer.jsx"
import ProteinViewer from "/src/Components/ProteinViewer.jsx"
import MoleculeLegend from "/src/Components/MoleculeLegend.jsx"




export default function Home() {
    // ONE shared piece of state — whichever component (3D viewer or legend)
    // changes it, the other one reacts automatically.
    const [selectedComponent, setSelectedComponent] = useState(null)

    const sections = [
        {
            id: "home",
            title: "Home",
            render: () => (
                <>
                    <img src="/images/aptonix-logo-mockup.png" alt="I want to go home!"></img>
                    <ProteinViewer
                        pdbUrl={"/proteins/all_components_merged.pdb"}
                        externalActiveId={selectedComponent}
                        onComponentHover={setSelectedComponent}
                    />
                    <MoleculeLegend
                        externalActiveId={selectedComponent}
                        onActiveChange={setSelectedComponent}
                    />
                </>
            )
        },
        {
            id: "problem",
            title: "Problem",
            render: () => (
                <>
                    <h1>Imagine forgetting the faces of those you love</h1>
                    <p>As the most common form of dementia, Alzheimer's disease accounts for 60-80% of all cases [1].</p>
                </>
            )
        },
        {
            id: "references",
            title: "References",
            render: () => (
                <>
                    <ReferencesViewer references={content.references} />
                </>
            )
        },
    ]
    return (
        <PageLayout sections={sections} />
    )
}