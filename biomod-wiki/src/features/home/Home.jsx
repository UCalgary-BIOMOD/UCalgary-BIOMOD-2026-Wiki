import content from "./home-content.json"
import TextBlock from "/src/Components/TextComponents.jsx"
import LinkWrapper from "/src/Components/LinkComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"
import ReferencesViewer from "/src/Components/ReferencesViewer.jsx"
import ProteinViewer from "/src/Components/ProteinViewer.jsx"
import MoleculeLegend from "/src/Components/MoleculeLegend.jsx"
import ViewportSection from "../../Components/ViewportSection"
import SplitSection, {SplitHalf} from "/src/Components/SplitSection.jsx"
import LinkGrid from "/src/Components/LinkGrid.jsx"
import BrainAnimation from "/src/Components/BrainAnimation.jsx"
import CanadaDot from "./CanadaDots.jsx"
import Biomarker from "./Biomarker.jsx"
import {motion, useScroll, useTransform, AnimatePresence} from "motion/react"
import {useRef, useState} from "react"
import styles from "./home.module.css"
import YouTubeEmbed from "../../Components/YouTubeEmbed"


export default function Home() {
    const familyRef = useRef(null)
    const canadaRef = useRef(null)
    const biomarkerRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: familyRef,
        offset: ["start 60%", "end 20%"],
    })



    const blur = useTransform(
        scrollYProgress,
        [0, 1],
        ["blur(0px)", "blur(20px)"]
    )

    const {scrollYProgress: canadaScroll} = useScroll({
        target: canadaRef,
        offset: ["start end", "end end"]
    })

    /*Dot positions are percentages of the square map container (.visualSection), so they stay glued to the map at any size.*/
    const canadaDots = [
        { top: "44%", left: "20%" },
        { top: "50%", left: "34%" },
        { top: "60%", left: "75%" },
        { top: "62%", left: "86%" },
        { top: "63%", left: "45%" },
        { top: "65%", left: "25%" },
        { top: "65%", left: "12%" },
        { top: "70%", left: "68%" },
        { top: "70%", left: "78%" },
        { top: "80%", left: "63%" },

    ]

    const {scrollYProgress: biomarkerScroll} = useScroll({
        target: biomarkerRef,
        offset: ["start end", "end end"],
    })

    /*top/left are the top-left corner of each biomarker, which is 50% of the frame, so its center is +25%. These centers (38/52, 50/40, 62/54)
      cluster the three helices in the middle of the yellow glow (which is centered at 50/50).*/
    const biomarkers = [
        { top: "27%", left: "13%" },
        { top: "15%", left: "25%" },
        { top: "29%", left: "37%" },
    ]

    const [selectedLifestage, setSelectedLifestage] = useState("select")
    const [selectedComponent, setSelectedComponent] = useState(null)

    const sections = [
        {
            id: "home",
            title: "Home",
            render: () => (
                <></>
            )
        },
        {
            id: "problem",
            title: "Problem",
            render: () => (
                <>
                    <ViewportSection>
                        <h1 className = {styles.aboveBanner}>Imagine forgetting the faces of the people you love...</h1>
                    </ViewportSection>
                    <ViewportSection center>
                        <motion.img ref = {familyRef} className = {styles.familyImage} src = "./images/family-collage.png" style = {{filter: blur}} alt = "Family"/>
                    </ViewportSection>
                    <SplitSection>
                        <SplitHalf text = "left">
                            <h1>As the most common form of dementia, Alzheimer’s disease accounts for <span className = {styles.accent}>60-80%</span> of all cases [1].</h1>
                        </SplitHalf>
                        <SplitHalf className = {styles.visualSection}>
                            <BrainAnimation />
                        </SplitHalf>
                    </SplitSection>
                    <SplitSection>
                        <SplitHalf className = {styles.visualSection} ref = {canadaRef}>
                            <img src = "./images/canada-map.png" alt = "Canada"></img>
                            {canadaDots.map((dot, index) => (
                                <CanadaDot
                                    key = {index}
                                    top = {dot.top}
                                    left = {dot.left}
                                    index = {index}
                                    progress = {canadaScroll}
                                    total = {canadaDots.length}
                                />
                            ))}
                        </SplitHalf>
                        <SplitHalf text = "right">
                            <h1>In Canada, 2022 saw approximately <span className = {styles.accent}>600,000</span> individuals with dementia, with it possibly growing to an estimated <span className = {styles.accent}>1.7 million</span> of all cases by 2050 [2].</h1>
                        </SplitHalf>
                    </SplitSection>
                    <ViewportSection>
                        <h1 >Without an established cure, the primary goal in the fight against Alzheimer’s is to <span className = {styles.accent}>delay its onset.</span> Studies simulating different scenarios in Canada show that even <span className = {styles.accent}>1 year</span> of delayed onset could translate into <span className = {styles.accent}>500,000</span> fewer cases of Alzheimer’s by 2050 [2].</h1>
                    </ViewportSection>
                    <ViewportSection>
                        <h1 >To have been made <span className = {styles.accent}>AWARE</span> is to be <span className = {styles.accent}>PREPARED.</span></h1>
                        <p> Despite age being the largest risk factor, research has linked the incidence of Alzheimer’s disease with many risk factors such as genetics, lifestyle, and related health concerns.</p>
                    </ViewportSection>
                    <ViewportSection>
                        <div >
                            <h3 className = {styles.riskFactorTitle}>Risk factors that:</h3>
                            <div className = {styles.riskFactorGraphics}>
                                <div className = {styles.riskFactorGraphic}>
                                    <img src = "./images/can-not-be-changed.png" alt = "Risk Factors"></img>
                                </div>
                                <div className = {styles.riskFactorGraphic}>
                                    <img src = "./images/can-be-changed.png" alt = "Can Be Changed"></img>
                                    <div className = {styles.lifeStageButtons}>
                                        <button className = {styles.lifeStageButton} onClick={() => setSelectedLifestage("early")}>
                                            Early Life
                                        </button>

                                        <button className = {styles.lifeStageButton} onClick={() => setSelectedLifestage("mid")}>
                                            Midlife
                                        </button>

                                        <button className = {styles.lifeStageButton} onClick={() => setSelectedLifestage("late")}>
                                            Later Life
                                        </button>
                                    </div>

                                </div>
                                <div className = {styles.riskFactorGraphic}>
                                    <AnimatePresence mode = "wait">
                                        {selectedLifestage === "select" && (
                                            <motion.img
                                                key = "select"
                                                initial = {{opacity: 0, scale: 0}}
                                                animate = {{opacity: 1, scale: 1}}
                                                exit = {{opacity: 0, scale: 0}}
                                                src = "./images/what-can-be-changed.png"
                                                alt = "What Can Be Changed"
                                            />
                                        )}
                                        {selectedLifestage === "early" && (
                                            <motion.img
                                                key = "early"
                                                initial = {{opacity: 0, scale: 0}}
                                                animate = {{opacity: 1, scale: 1}}
                                                exit = {{opacity: 0, scale: 0}}
                                                src = "./images/early-life.png"
                                                alt = "Early"
                                            />
                                        )}
                                        {selectedLifestage === "mid" && (
                                            <motion.img
                                                key = "mid"
                                                initial = {{opacity: 0, scale: 0}}
                                                animate = {{opacity: 1, scale: 1}}
                                                exit = {{opacity: 0, scale: 0}}
                                                src = "./images/midlife.png"
                                                alt = "Midlife"
                                            />
                                        )}
                                        {selectedLifestage === "late" && (
                                            <motion.img
                                                key = "late"
                                                initial = {{opacity: 0, scale: 0}}
                                                animate = {{opacity: 1, scale: 1}}
                                                exit = {{opacity: 0, scale: 0}}
                                                src = "./images/later-life.png"
                                                alt = "Late"
                                            />
                                        )}
                                    </AnimatePresence>

                                </div>
                            </div>
                        </div>

                    </ViewportSection>

                    <ViewportSection>
                        <p>The issue with these risk factors are that they present multimodally, where they must exist in combination to signify risk. Many of them are also unquantifiable.</p>
                    </ViewportSection>
                    <SplitSection>
                        <SplitHalf text = "left" className = {styles.biomarkerText}>
                            <h2>However, the accumulation of biomarkers - such as <span className = {styles.accent}>amyloid-beta (Aβ) or tau</span> - may be measured in the pre-clinical stage, helping screen for those at risk of developing Alzheimer’s even if they present zero symptoms [3].</h2>
                        </SplitHalf>
                        <SplitHalf className = {styles.visualSection} ref = {biomarkerRef}>
                            <img className = {styles.biomarkerBg} src = "./images/biomarker-bg.png" alt = "Background"></img>
                            {biomarkers.map((dot, index) => (
                                <Biomarker
                                    key = {index}
                                    top = {dot.top}
                                    left = {dot.left}
                                    index = {index}
                                    progress = {biomarkerScroll}
                                    total = {biomarkers.length}
                                />
                            ))}
                        </SplitHalf>
                    </SplitSection>
                    <SplitSection>
                        <SplitHalf stack>
                            <h2>The path forward...</h2>
                            <img className = {styles.aptonixText} src = "./images/aptonix-text-no-bg.png" alt = "Aptonix"></img>
                        </SplitHalf>
                        <SplitHalf>
                            <img className = {styles.aptonixLogo} src = "./images/aptonix-logo-circle.png" alt = "Logo"></img>
                        </SplitHalf>
                    </SplitSection>
                    <SplitSection className = {styles.cardRow}>
                        <SplitHalf className = {styles.cardGold}>
                            <img src = "./images/potentiostat.png" alt = "Potentiostat"></img>
                        </SplitHalf>
                        <SplitHalf stack className = {styles.cardBlue}>
                            <p> To bring a high-throughput, minimally invasive, and cost-effective solution, we propose an aptamer-based electrochemical biosensor for the detection of amyloid-beta 42.</p>
                            <p>Built upon a dendrimer backbone, an active assembly composed of the aptamer, methylene blue, and toe-hold mediated strand displacement (TMSD) will be used to convert the concentration of the biomarker into an electrical signal.</p>
                        </SplitHalf>
                    </SplitSection>
                    <ViewportSection className = {styles.viewerSection}>
                        <ProteinViewer
                            pdbUrl="/proteins/all_components_merged.pdb"
                            externalActiveId={selectedComponent}
                            onComponentHover={setSelectedComponent}
                        />
                        <MoleculeLegend
                            externalActiveId={selectedComponent}
                            onActiveChange={setSelectedComponent}
                        />
                    </ViewportSection>

                </>
            )
        },
        {
            id: "video",
            title: "Video",
            render: () => (
                <>
                    <ViewportSection >
                        <p> Come explore our prototype for a point-of-care biosensor for the early detection of Alzheimer’s.</p>
                        <YouTubeEmbed src="o_v9MY_FMcw"/>
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
                            items = {[
                                {to: "/project", img: "./images/project-button.png", label: "Project"},
                                {to: "/notebook", img: "./images/notebook-button.png", label: "Notebook"},
                                {to: "/results", img: "./images/results-button.png", label: "Results"},
                                {to: "/elsi", img: "./images/elsi-button.png", label: "ELSI"},
                            ]}
                        />
                    </ViewportSection>
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


        <PageLayout sections = {sections} bannerImgs = {["/images/homepage-banner.png", "/images/dna-ladder.png"]} bannerHeight = "100svh"/>

    )
}

