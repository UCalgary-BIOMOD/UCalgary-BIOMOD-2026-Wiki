import content from "./home-content.json"
import TextBlock from "/src/Components/TextComponents.jsx"
import LinkWrapper from "/src/Components/LinkComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"
import ReferencesViewer from "/src/Components/ReferencesViewer.jsx"
import ProteinViewer from "/src/Components/ProteinViewer.jsx"
import ViewportSection from "../../Components/ViewportSection"
import CanadaDot from "./CanadaDots.jsx"
import Biomarker from "./Biomarker.jsx"
import {motion, useScroll, useTransform, AnimatePresence} from "motion/react"
import {useRef, useState} from "react"
import styles from "./home.module.css"
import YouTubeEmbed from "../../Components/YouTubeEmbed"


export default function Home() {
    const familyRef = useRef(null)
    const brainRef = useRef(null)
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

    const { scrollYProgress: brainScroll } = useScroll({
        target: brainRef,
        offset: ["start end", "end end"],
    })

    const brainClip = useTransform(
        brainScroll,
        [0.3, 1],
        [
        "inset(0% 0% 100% 0%)",
        "inset(0% 0% 40% 0%)"]
    )
    
    const {scrollYProgress: canadaScroll} = useScroll({
        target: canadaRef,
        offset: ["start end", "end end"]
    })

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

    const biomarkers = [
        { top: "29%", left: "24%" },
        { top: "22%", left: "7%" },
        { top: "24%", left: "44%" },
    ]
    
    const [selectedLifestage, setSelectedLifestage] = useState("select")
    
    const sections = [
        {
            id: "problem",
            title: "Problem",
            render: () => (
                <>
                    <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        border: "3px solid red",
                        pointerEvents: "none",
                        zIndex: 9999,
                        boxSizing: "border-box",
                    }}
                    />
                    <ViewportSection style = {{minHeight: "calc((100svh - var(--top-nav-height)) * 0.3)", height: "calc((100svh - var(--top-nav-height)) * 0.3)"}}>
                        <h1 style = {{zIndex: 5}}>Imagine forgetting the faces of the people you love...</h1>
                    </ViewportSection>
                    <ViewportSection style = {{display: "flex", alignItems: "center", justifyContent: "center"}} >
                        <motion.img  ref = {familyRef} src = "./images/family-collage.png" style = {{filter: blur, width: "80%", height: "80%"}} alt = "Family"/>
                    </ViewportSection>
                    <ViewportSection style = {{flexDirection: "row"}}>
                        <div style = {{flex: 1}} className = {styles.halfSection}>
                            <h1 style = {{textAlign: "left", padding: "1rem"}}>As the most common form of dementia, Alzheimer’s disease accounts for <span className = {styles.accent}>60-80%</span> of all cases [1].</h1>
                        </div>
                        <div style = {{flex: 1, position: "relative"}} className = {styles.halfSection} ref = {brainRef}>
                            <motion.img style = {{position: "absolute", zIndex: 4, clipPath: brainClip}} src = "./images/brain-off-color.png" alt = "Brain" />
                            <img style = {{position: "absolute"}}  src = "./images/brain.png" alt = "Brain"></img>
                            
                        </div>
                    </ViewportSection>
                    <ViewportSection style = {{flexDirection: "row"}}>
                        <div style = {{flex: 1, position: "relative"}} className = {styles.halfSection}  ref = {canadaRef}>
                            <img style = {{position: "absolute"}} src = "./images/canada-map.png" alt = "Canada"></img>
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
                        </div>
                        <div style = {{flex: 1}} className = {styles.halfSection}>
                            
                            <h1 style = {{textAlign: "right", padding: "1rem"}}>In Canada alone, 2022 saw approximately <span className = {styles.accent}>600,000</span> individuals with dementia, with an estimated <span className = {styles.accent}>1.7 million</span> of all cases [1].</h1>
                        </div>
                    </ViewportSection>
                    <ViewportSection style = {{minHeight: "calc((100svh - var(--top-nav-height)) * 0.75)", height: "calc((100svh - var(--top-nav-height)) * 0.75)"}}>
                        <h1 >Without an established cure, the primary goal in the fight against Alzheimer’s is to <span className = {styles.accent}>delay its onset.</span> Studies simulating different scenarios in Canada show that even <span className = {styles.accent}>1 year</span> of delayed onset could translate into <span className = {styles.accent}>500,000</span> fewer cases of Alzheimer’s by 2050 [2].</h1>
                    </ViewportSection>
                    <ViewportSection style = {{minHeight: "calc((100svh - var(--top-nav-height)) * 0.5)", height: "calc((100svh - var(--top-nav-height)) * 0.5)"}}>
                        <h1 >To have been made <span className = {styles.accent}>AWARE</span> is to be <span className = {styles.accent}>PREPARED.</span></h1>
                        <p> Despite age being the largest risk factor, research has linked the incidence of Alzheimer’s disease with many risk factors such as genetics, lifestyle, and related health concerns.</p>
                    </ViewportSection>
                    <ViewportSection style = {{minHeight: "calc((100svh - var(--top-nav-height)) * 0.6)", height: "calc((100svh - var(--top-nav-height)) * 0.6)"}}>
                        <div >
                            <h3 style = {{textAlign: "left", paddingLeft: "5%"}} >Risk factors that:</h3>
                            <div style = {{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center"}}>
                                <img src = "./images/can-not-be-changed.png" alt = "Risk Factors"></img>
                                <div style = {{display: "flex", position: "relative", width: "30%", alignItems: "center", justifyContent: "center"}}>
                                    <img style = {{position: "absolute"}} src = "./images/can-be-changed.png" alt = "Can Be Changed"></img>
                                    <div style = {{position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "0.25rem"}}>
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
                                <div style = {{display: "flex", position: "relative", width: "35%", alignItems: "center", justifyContent: "center"}}>
                                    <AnimatePresence mode = "wait">
                                        {selectedLifestage === "select" && (
                                            <motion.img
                                                key = "select"
                                                initial = {{opacity: 0, scale: 0}}
                                                animate = {{opacity: 1, scale: 1}}
                                                exit = {{opacity: 0, scale: 0}}
                                                src = "./images/what-can-be-changed.png"
                                                alt = "What Can Be Changed"
                                                style = {{position: "absolute"}}
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
                                                style = {{position: "absolute"}}
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
                                                style = {{position: "absolute"}}
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
                                                style = {{position: "absolute"}}
                                            />
                                        )}
                                    </AnimatePresence>
                                    
                                </div>
                            </div>
                        </div>
                        
                    </ViewportSection>

                    <p>The issue with these risk factors are that they present multimodally, where they must exist in combination to signify risk. Many of them are also unquantifiable.</p>
                    <ViewportSection style = {{flexDirection: "row"}}>
                        <div style = {{flex: 1}} className = {styles.halfSection}>
                            <h2 style = {{textAlign: "left", fontSize: "clamp(1rem, 2.2vw, 2rem)", padding: "5%"}}>However, the accumulation of biomarkers - such as <span className = {styles.accent}>amyloid-beta (Aβ) or tau</span> - may be measured in the pre-clinical stage, helping screen for those at risk of developing Alzheimer’s even if they present zero symptoms [3].</h2>
                        </div>
                        <div style = {{flex: 1, position: "relative"}} className = {styles.halfSection} ref = {biomarkerRef   }>
                            <img src = "./images/biomarker-bg.png" alt = "Background" style = {{width: "70%", height: "70%", objectFit: "contain", position: "absolute"}}></img>
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
                        </div>
                    </ViewportSection>
                    <ViewportSection style = {{flexDirection: "column", minHeight: "calc((100svh - var(--top-nav-height)) * 0.6)", height: "calc((100svh - var(--top-nav-height)) * 0.6)"}}>
                        <div style = {{display: "flex", flex: 1, height: "30%", minHeight: "30%", flexDirection: "row"}}>
                            <div style = {{display: "flex", flex: 1, flexDirection: "column"}} className = {styles.halfSection}>
                                <h2>The path forward...</h2>
                                <img src = "./images/aptonix-text-no-bg.png" alt = "Aptonix" style = {{height: "60%", paddingTop: "1rem"}}></img>
                            </div>
                            <div style = {{flex: 1}} className = {styles.halfSection}>
                                <img src = "./images/aptonix-logo-circle.png" alt = "Logo" style = {{height:"90%"}}></img>
                            </div>
                        </div>
                        
                    </ViewportSection>
                    <ViewportSection style = {{flexDirection: "row"}}>
                         
                        <div style = {{backgroundColor: "var(--text-h)", borderRadius: "5%", transform: "scale(0.90)"}} className = {styles.halfSection}>
                            <img src = "./images/potentiostat.png" alt = "Potentiostat"></img>
                        </div>
                        <div style = {{backgroundColor: "var(--accent)", borderRadius: "5%", transform: "scale(0.90)", display: "flex", flexDirection: "column"}} className = {styles.halfSection}>
                            <p style = {{padding: "0 5% 0 5%"}}> To bring a high-throughput, minimally invasive, and cost-effective solution, we propose <span style = {{color: "var(--text-h)"}}>Aptonix</span>, an aptamer-based electrochemical biosensor for the detection of amyloid-beta 42.</p>
                            <p style = {{padding: "0 5% 0 5%"}}>Built upon a dendrimer backbone, an active assembly composed of the aptamer, methylene blue, and toe-hold mediated strand displacement (TMSD) will be used to convert the concentration of the biomarker into an electrical signal.</p>
                        </div>
                    </ViewportSection>
                    <ViewportSection style = {{minHeight: "calc((100svh - var(--top-nav-height)) * 0.8)", height: "calc((100svh - var(--top-nav-height)) * 0.8)"}}>
                            <ProteinViewer pdbUrl={"/proteins/DNA_Aptamer3_1.pdb"}/>
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
                        <p> Come explore our prototype for a point-of-care biosensor for the early detection of Alzheimer’s.</p>
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
                    <ViewportSection style = {{display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "center"}}>
                        <div style = {{display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "center", gap: "5%"}}>
                            <div>
                                <LinkWrapper to = "/project">
                                    <img src = "./images/project-button.png" alt = "Project"></img>
                                </LinkWrapper>
                                <h3>Project</h3>
                            </div>
                            <div>
                                <LinkWrapper to = "/notebook">
                                    <img src = "./images/notebook-button.png" alt = "Notebook"></img>
                                </LinkWrapper>
                                <h3>Notebook</h3>
                            </div>
                            <div>
                                <LinkWrapper to = "/results">
                                    <img src = "./images/results-button.png" alt = "Results"></img>
                                </LinkWrapper>
                                <h3>Results</h3>
                            </div>
                            <div>
                                <LinkWrapper to = "/elsi">
                                    <img src = "./images/elsi-button.png" alt = "ELSI"></img>
                                </LinkWrapper>
                                <h3>ELSI</h3>
                            </div>
                        </div>
                        
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


