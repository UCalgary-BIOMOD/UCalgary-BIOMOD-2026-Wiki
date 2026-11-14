import content from "./project-content.json"
import TextBlock from "/src/Components/TextComponents.jsx"
import LinkWrapper from "/src/Components/LinkComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"
import ReferencesViewer from "/src/Components/ReferencesViewer.jsx"
import ProteinViewer from "/src/Components/ProteinViewer.jsx"
import ViewportSection from "../../Components/ViewportSection"
import LinkGrid from "/src/Components/LinkGrid.jsx"

/**
 * The Project page (/project): the abstract (text in project-content.json) and a grid of links to the other project pages.
 */
export default function Project() {
    const sections = [
        
        {
            id: "abstract",
            title: "Abstract",
            render: () => (
                <>
                    <ViewportSection center>
                        <p>{content.Abstract.text}</p>
                    </ViewportSection>
                    
                </>
            )
        },
        {
            id: "links",
            title: "Links",
            render: () => (
                <>
                    <ViewportSection center>
                        <LinkGrid
                            columns = {5}
                            tileMax = "13.5rem"
                            items = {[
                                {to: "/description", img: "./images/description-button.png", alt: "Description", label: "Project Description"},
                                {to: "/modelling", img: "./images/modelling-button.png", label: "Modelling"},
                                {to: "/experiments", img: "./images/project-button.png", label: "Experiments"},
                                {to: "/results", img: "./images/results-button.png", label: "Results"},
                                {to: "/notebook", img: "./images/notebook-button.png", label: "Notebook"},
                            ]}
                        />
                    </ViewportSection>
                </>
            )
        }
    ]
    return (
        <PageLayout sections = {sections} bannerImgs = {["./images/basic-banner.png"]} bannerHeight = "50svh" caption = "ABSTRACT"/>
    )
}