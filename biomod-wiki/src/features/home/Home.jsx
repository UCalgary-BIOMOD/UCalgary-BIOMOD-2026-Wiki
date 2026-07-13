import content from "./home-content.json"
import TextBlock from "/src/Components/TextComponents.jsx"
import LinkWrapper from "/src/Components/LinkComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"
import ReferencesViewer from "/src/Components/ReferencesViewer.jsx"
import ProteinViewer from "/src/Components/ProteinViewer.jsx"


export default function Home() {
    const sections = [
        {
            id: "home",
            title: "Home",
            render: () => (
                <>
                    <img src = "/images/aptonix-logo-mockup.png" alt="I want to go home!"></img>
                    <ProteinViewer pdbUrl={"/proteins/DNA_Aptamer3_1.pdb"}/>
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
                    <ReferencesViewer
                        references={content.references}
                    />
                </>
            )
        },
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}


