import content from "./project-content.json"
import TextBlock from "/src/Components/TextComponents.jsx"
import LinkWrapper from "/src/Components/LinkComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"
import ReferencesViewer from "/src/Components/ReferencesViewer.jsx"
import ProteinViewer from "/src/Components/ProteinViewer.jsx"
import ViewportSection from "../../Components/ViewportSection"

export default function Project() {
    const sections = [
        
        {
            id: "abstract",
            title: "Abstract",
            render: () => (
                <>
                    <ViewportSection style = {{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <p>{...content.Abstract.text}</p>
                    </ViewportSection>
                    
                </>
            )
        },
        {
            id: "links",
            title: "Links",
            render: () => (
                <>
                    <ViewportSection style = {{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
                        <div style = {{display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "center", gap: "5%"}}>
                            <div>
                                <LinkWrapper to = "/description">
                                    <img src = "./images/description-button.png" alt = "Description"></img>
                                </LinkWrapper>
                                <h3>Project Description</h3>
                            </div>
                            <div>
                                <LinkWrapper to = "/modelling">
                                    <img src = "./images/modelling-button.png" alt = "Modelling"></img>
                                </LinkWrapper>
                                <h3>Modelling</h3>
                            </div>
                            <div>
                                <LinkWrapper to = "/experiments">
                                    <img src = "./images/project-button.png" alt = "Experiments"></img>
                                </LinkWrapper>
                                <h3>Experiments</h3>
                            </div>
                        </div>
                        <div style = {{display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "center", gap: "5%"}}>
                            <div>
                                <LinkWrapper to = "/results">
                                    <img src = "./images/results-button.png" alt = "Results"></img>
                                </LinkWrapper>
                                <h3>Results</h3>
                            </div>
                            <div>
                                <LinkWrapper to = "/notebook">
                                    <img src = "./images/notebook-button.png" alt = "Notebook"></img>
                                </LinkWrapper>
                                <h3>Notebook</h3>
                            </div>
                        </div>
                        
                    </ViewportSection>
                    
                </>
            )
        }
    ]
    return (
        <PageLayout sections = {sections} bannerImgs = {["./images/basic-banner.png"]} bannerHeight = "50svh" caption = "ABSTRACT"/>
    )
}