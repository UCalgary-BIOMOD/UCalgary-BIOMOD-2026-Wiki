import content from "./description-content.json"
import PageLayout from "/src/Components/PageLayout.jsx"
import MainHeading from "/src/Components/MainHeading.jsx"
import ViewportSection from "/src/Components/ViewportSection.jsx"
import FigureArea from "/src/Components/FigureArea.jsx"
import GoalSection from "/src/Components/GoalSection.jsx"
import styles from "./description.module.css"

function Heading({caption}) {
    return <MainHeading mainHeadingImgs = {["./images/main-heading.png"]} mainHeadingHeight = "max(10vw, 4.5rem)" caption = {caption} />
}

function Paragraphs({paragraphs}) {
    return paragraphs.map((text) => <p key = {text} className = {styles.copy}>{text}</p>)
}

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
                    <h2 className = {styles.subheading}>Aptamers</h2>
                    <Paragraphs paragraphs = {content.aptamers} />
                    <FigureArea number = {1} caption = "CAPTION" />
                </ViewportSection>
            )
        },
        {
            id: "feasibility",
            title: "Feasibility",
            render: () => (
                <ViewportSection center>
                    <Heading caption = "FEASIBILITY" />
                </ViewportSection>
            )
        },
        {
            id: "impact",
            title: "Impact",
            render: () => (
                <ViewportSection center>
                    <Heading caption = "IMPACT" />
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
                </ViewportSection>
            )
        }
    ]
    return (
        <PageLayout sections = {sections} bannerImgs = {["/images/dna-ladder.png"]} bannerHeight = "40svh" caption = "DESCRIPTION"/>
    )
}
