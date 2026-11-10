import content from "./description-content.json"
import PageLayout from "/src/Components/PageLayout.jsx"
import MainHeading from "/src/Components/MainHeading.jsx"
import SecondHeading from "/src/Components/SecondHeading";
import ViewportSection from "/src/Components/ViewportSection.jsx"
import ReferencesViewer from "/src/Components/ReferencesViewer.jsx"
import FigureArea from "/src/Components/FigureArea.jsx"
import GoalSection from "/src/Components/GoalSection.jsx"
import Paragraphs from "/src/Components/Paragraphs.jsx"
import styles from "./description.module.css"


function Heading({caption}) {
    return <MainHeading mainHeadingImgs = {["./images/main-heading.png"]} mainHeadingHeight = "max(10vw, 4.5rem)" caption = {caption} />
}

/**
 * The Project Description page (/description): background, motivation, solution, feasibility, impact, goals and references.
 * All text lives in description-content.json (paragraph strings may contain simple HTML such as <sub>). The two figures are
 * placed here in the Solution section. The goals checklist comes from content.goals (see GoalSection.jsx for its format).
 */
export default function Description() {
    const sections = [
        {
            id: "background",
            title: "Background",
            render: () => (
                <ViewportSection center>
                    <Heading caption = "BACKGROUND" />
                    <Paragraphs paragraphs = {content.background} />
                </ViewportSection>
            )
        },
        {
            id: "motivation",
            title: "Motivation",
            render: () => (
                <ViewportSection center>
                    <Heading caption = "MOTIVATION" />
                    <Paragraphs paragraphs = {content.motivation} />
                </ViewportSection>
            )
        },
        {
            id: "solution",
            title: "Solution",
            render: () => (
                <ViewportSection center>
                    <Heading caption = "SOLUTION" />
                    <Paragraphs paragraphs = {content.solution} />
                    <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Aptamers" className={styles.aptamersHeading}></SecondHeading>
                    <Paragraphs paragraphs = {content.aptamers} />
                    <FigureArea 
                        number = {1} 
                        children = 
                        {<img
                            src = "./images/description1.jpg"
                            alt = "Aptamer-MB construct"
                            className = {styles.figureImage}
                        ></img>} 
                        caption = "Rendering of the simplified aptamer construct in the presence and absence of a generic biomarker. Without the biomarker, the aptamer is straightened and methylene blue is oxidized. Upon binding of the biomarker, this causes a conformational change in the aptamer, moving methylene blue and reducing it, causing current in the electrode. Not to scale and excludes other components (TMSD, dendrimer). " />
                    <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "TMSD" className={styles.tmsdHeading}></SecondHeading>
                    <Paragraphs paragraphs = {content.tmsd} />
                    <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Dendrimers" className={styles.dendrimersHeading}></SecondHeading>
                    <Paragraphs paragraphs = {content.dendrimers}/>
                    <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Novelty" className={styles.noveltyHeading}></SecondHeading>
                    <Paragraphs paragraphs = {content.novelty}/>
                    <FigureArea 
                        number = {2} 
                        children = 
                        {<img
                            src = "./images/description2.jpg"
                            alt = "Full system construct"
                            className = {styles.figureImage}
                        ></img>} 
                        caption = "Rendering of the full system configuration for our solution including the biomarker, methylene blue, the aptamer, the dendrimer scaffold, and the hybridized TMSD segment. Blue boxes indicate the high-level purpose of each component. System was visualized in UCSF Chimera. "
                    />
                    <FigureArea 
                        number = {3} 
                        children = 
                        {<img
                            src = "./images/description3.jpg"
                            alt = "Linkages between components"
                            className = {styles.figureImage}
                        ></img>} 
                        caption = "NEED CAPTION. "
                    />
                </ViewportSection>
            )
        },
        {
            id: "feasibility",
            title: "Feasibility",
            render: () => (
                <ViewportSection center>
                    <Heading caption = "FEASIBILITY" />
                    <Paragraphs paragraphs = {content.feasability}/>
                </ViewportSection>
            )
        },
        {
            id: "impact",
            title: "Impact",
            render: () => (
                <ViewportSection center>
                    <Heading caption = "IMPACT" />
                    <Paragraphs paragraphs={content.impact}/>
                </ViewportSection>
            )
        },
        {
            id: "goals",
            title: "Goals",
            render: () => (
                <ViewportSection center>
                    <Heading caption = "GOALS" />
                    <GoalSection labs = {content.goals} />
                </ViewportSection>
            )
        },
        {
            id: "references",
            title: "References",
            render: () => (
                <ViewportSection center>
                    <Heading caption = "REFERENCES" />
                    <ReferencesViewer
                        references={content.references}
                    />
                </ViewportSection>
            )
        }
    ]
    return (
        <PageLayout sections = {sections} bannerImgs = {["./images/basic-banner.png"]} bannerHeight = "50svh" caption = "DESCRIPTION"></PageLayout>
    )
}
