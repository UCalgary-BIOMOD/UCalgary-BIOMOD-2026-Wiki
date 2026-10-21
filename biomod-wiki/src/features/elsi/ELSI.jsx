import content from "./ELSI-content.json"
import PageLayout from "/src/Components/PageLayout.jsx"
import MainHeading from "../../Components/MainHeading";
import styles from "./ELSI.module.css"
import ReferencesViewer from "/src/Components/ReferencesViewer.jsx"



export default function ELSI() {
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