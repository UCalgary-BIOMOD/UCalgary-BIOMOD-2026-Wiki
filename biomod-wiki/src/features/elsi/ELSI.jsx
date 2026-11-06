import content from "./ELSI-content.json"
import PageLayout from "/src/Components/PageLayout.jsx"
import MainHeading from "../../Components/MainHeading";
import SecondHeading from "../../Components/SecondHeading";
import styles from "./ELSI.module.css"
import ReferencesViewer from "/src/Components/ReferencesViewer.jsx"
import Table from "/src/Components/Table.jsx"



/**
 * The Ethical, Legal and Social Implications page (/elsi): introduction, ethical, legal, social and safety sections plus references.
 * The text and images come from ELSI-content.json. The safety section is a hazard-analysis table; its columns and grouped
 * headers are defined at the top of this component and its rows are content.safety.hazardRows.
 */
export default function ELSI() {
    const hazardColumns = [
    { key: "id", label: "Risk ID", width: "7%" },
    { key: "step", label: "Process Step", width: "11%" },
    { key: "hazard", label: "Hazard", width: "12%" },
    { key: "harm", label: "Potential Harm", width: "13%" },
    { key: "preSeverity", label: "S", width: "4%" },
    { key: "preProbability", label: "P", width: "4%" },
    { key: "preRisk", label: "Risk", width: "8%" },
    { key: "control", label: "Risk Control Measure", width: "25%" },
    { key: "postSeverity", label: "S", width: "4%" },
    { key: "postProbability", label: "P", width: "4%" },
    { key: "residualRisk", label: "Residual Risk", width: "8%" }
    ];
    const hazardHeaderGroups = [
        { label: "", colSpan: 4 },
        { label: "Pre-Mitigation", colSpan: 3 },
        { label: "Mitigation", colSpan: 1 },
        { label: "Post-Mitigation", colSpan: 3 }
    ];
    const sections = [
        {
            id: "introduction",
            title: "Introduction",
            render: () => (
                <>
                    <MainHeading mainHeadingImgs = {["./images/main-heading.png"]} mainHeadingHeight = "10vw" caption = "INTRODUCTION" className={styles.introductionHeading}></MainHeading>
                    {content.introduction.map((material) => (
                        <div className={styles.elsiMaterial} key={material.subtitle}>
                            <h2 className={styles.elsiSubtitle}>{material.subtitle}</h2>
                            <p className={styles.introductionText}>{material.text}</p>
                        </div>
                    ))}
                </>
            )
        },
        {
            id: "ethical",
            title: "Ethical",
            render: () => (
                <>
                    <MainHeading mainHeadingImgs = {["./images/main-heading.png"]} mainHeadingHeight = "10vw" caption = "ETHICAL" className={styles.ethicalHeading}></MainHeading>
                    {content.ethical.map((material) => (
                        <div className={styles.elsiMaterial} key={material.subtitle}>
                            <h2 className={styles.elsiSubtitle}>{material.subtitle}</h2>
                            <div className={styles.elsiGrid}>
                                <img src={material.image} className={styles.materialImage}/>
                                <p className={styles.materialText}>{material.text}</p>
                            </div>
                        </div>
                    ))}
                </>
            )
        },
        {
            id: "legal",
            title: "Legal",
            render: () => (
                <>
                    <MainHeading mainHeadingImgs = {["./images/main-heading.png"]} mainHeadingHeight = "10vw" caption = "LEGAL" className={styles.legalHeading}></MainHeading>
                    {content.legal.map((material) => (
                        <div className={styles.elsiMaterial} key={material.subtitle}>
                            <h2 className={styles.elsiSubtitle}>{material.subtitle}</h2>
                            <div className={styles.elsiGrid}>
                                <img src={material.image} className={styles.materialImage}/>
                                <p className={styles.materialText}>{material.text}</p>
                            </div>
                        </div>
                    ))}
                </>
            )
        },
        {
            id: "socialImplications",
            title: "Social Implications",
            render: () => (
                <>
                    <MainHeading mainHeadingImgs = {["./images/main-heading.png"]} mainHeadingHeight = "10vw" caption = "SOCIAL IMPLICATIONS" className={styles.socialImplicationsHeading}></MainHeading>
                    {content.socialImplications.map((material) => (
                        <div className={styles.elsiMaterial} key={material.subtitle}>
                            <h2 className={styles.elsiSubtitle}>{material.subtitle}</h2>
                            <div className={styles.elsiGrid}>
                                <img src={material.image} className={styles.materialImage}/>
                                <p className={styles.materialText}>{material.text}</p>
                            </div>
                        </div>
                    ))}
                </>
            )
        },
        {
            id: "safety",
            title: "Safety",
            render: () => (
                <>
                    <MainHeading mainHeadingImgs = {["./images/main-heading.png"]} mainHeadingHeight = "10vw" caption = "SAFETY" className={styles.safetyHeading}></MainHeading>
                    <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Hazard Analysis" className={styles.introductionHeading}></SecondHeading>
                    {/* <div className={styles.safetyMaterial} key={material.subtitle}>
                        <h2 className={styles.safetySubtitle}>{material.subtitle}</h2>
                        <p className={styles.safetyText}>{material.text}</p>
                    </div> */}
                    <Table columns={hazardColumns} headerGroups={hazardHeaderGroups} rows={content.safety.hazardRows} caption="Table 1. XXXX S = Severity, P = Probability"/>
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
        }
        ]
    return (
        <PageLayout sections = {sections} bannerImgs = {["./images/basic-banner.png"]} bannerHeight = "50svh" caption = "ELSI"></PageLayout>
    )
}