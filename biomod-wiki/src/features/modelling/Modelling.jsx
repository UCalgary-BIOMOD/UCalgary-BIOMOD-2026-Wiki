
import PageLayout from "/src/Components/PageLayout.jsx"
import ViewportSection from "/src/Components/ViewportSection.jsx"
import Paragraphs from "/src/Components/Paragraphs.jsx"
import content from "./modelling-content.json"
import MainHeading from "/src/Components/MainHeading.jsx"
import SecondHeading from "/src/Components/SecondHeading"
import Table from "/src/Components/Table.jsx"
import styles from "./modelling.module.css"
import FigureArea from "/src/Components/FigureArea.jsx"
import ReferencesViewer from "/src/Components/ReferencesViewer.jsx"
function Heading({caption}) {
    return <MainHeading mainHeadingImgs = {["./images/main-heading.png"]} mainHeadingHeight = "max(10vw, 4.5rem)" caption = {caption} />
}

/**
 * The Modelling page (/modelling). Placeholder: the page content has not been written yet.
 */
export default function Modelling() {
    const sections = [
        {
            id: "intro",
            title: "Introduction",
            render: () => (
                <>
                    <ViewportSection center>
                        <Heading caption = "INTRODUCTION" />
                        <Paragraphs paragraphs = {content.introduction} />
                    </ViewportSection>
                </>
            )
        },
        {
            id: "objectives",
            title: "Objectives",
            render: () => (
                <>
                    <ViewportSection center>
                        <Heading caption = "OBJECTIVES" />
                        <Paragraphs paragraphs = {content.objectives} />
                    </ViewportSection>
                </>
            )
        },
        {
            id: "aptamer",
            title: "Aptamer Structural Modelling",
            render: () => (
                <>
                    <ViewportSection center>
                        <Heading caption = "Aptamer Structural Modelling" />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Why is aptamer structure important?"></SecondHeading>
                        <Paragraphs paragraphs = {content.aptamer} />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Aptamer selection and secondary structure prediction"></SecondHeading>
                        <Paragraphs paragraphs = {content.aptamer2} />
                        <Table
                            columns = {[{key: "structure", label: "Predicted Structure"}, {key: "freeEnergy", label: "Folding Free Energy (kcal/mol)"}]}
                            rows = {[{structure: "Structure 1", freeEnergy: -1.51},{structure: "Structure 2", freeEnergy: -1.00},{structure: "Structure 3", freeEnergy: -1.00},{structure: "Structure 4", freeEnergy: -0.52},]}
                            className = {styles.table}
                            caption = "**Table 1.** Predicted secondary structures of the AB7-92-1H1 aptamer and their corresponding folding free energies."
                        ></Table>
                        <Paragraphs paragraphs = {content.aptamer3}/>
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Three dimensional model generation"></SecondHeading>
                        <Paragraphs paragraphs = {content.aptamer4} />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Comparing candidate aptamer structures"></SecondHeading>
                        <Paragraphs paragraphs = {content.aptamer5}/>
                        <FigureArea 
                            naturalHeight={true}
                            number = {1} 
                            children = 
                            {<img
                                src = ""
                                alt = "AB7-92-1H1"
                                className = {styles.figureImage}
                            ></img>} 
                            caption = "Superimposed three dimensional models of AB7-92-1H1. Models were visualized using UCSF Chimera."
                        />
                    </ViewportSection>
                </>
            )
        },
        {
            id: "mb",
            title: "Methylene Blue Aptamer Docking",
            render: () => (
                <>
                    <ViewportSection center>
                        <Heading caption = "Methylene Blue Aptamer Docking" />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Why investigate methylene blue interactions?"></SecondHeading>
                        <Paragraphs paragraphs = {content.mb1}/>
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Molecular docking using AutoDock Vina"></SecondHeading>
                        <Paragraphs paragraphs = {content.mb2}/>
                        <Table
                            columns = {[{key: "config", label: "Aptamer configuration"}, {key: "vina", label: "Best recorded Vina score (kcal/mol)"}]}
                            rows = {[{config: "Structure 1", vina: -6.123}, {config: "Structure 2", vina: "Approximately -6.45"}]}
                            className = {styles.table}
                            caption = "**Table 2.** AutoDock Vina docking scores for methylene blue interactions with AB7-92-1H1 aptamer Structures 1 and 2."
                        ></Table>
                        <Paragraphs paragraphs = {content.mb3}/>
                        <FigureArea 
                            naturalHeight={true}
                            number = {2} 
                            children = 
                            {<img
                                src = ""
                                alt = "AutoDock Vina for Aptamer 3, Structure 1 and 2"
                                className = {styles.figureImage}
                            ></img>} 
                            caption = "AutoDock Vina predictions for methylene blue interacting with Aptamer 3 Structures 1 and 2."
                        />
                    </ViewportSection>
                </>
            )
        },
        {
            id: "recognition",
            title: "Aptamer Recognition",
            render: () => (
                <>
                    <ViewportSection center>
                        <Heading caption = "Evaluating Aptamer Recognition of AB42" />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Why is target specificity important?"></SecondHeading>
                        <Paragraphs paragraphs = {content.recognition1}/>
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "HDOCK molecular docking"></SecondHeading>
                        <Paragraphs paragraphs = {content.recognition2}/>
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "AB42 and AB40 comparison"></SecondHeading>
                        <Paragraphs paragraphs = {content.recognition3}/>
                        <Table
                            columns = {[{key: "target", label: "Molecular Target"}, {key: "pdb", label: "PDB Model"}, {key: "score", label: "Best HDOCK Score"}, {key: "mean", label: "Mean of Top 10 Scores"}]}
                            rows = {[{target: "AB42", pdb: "6SZF", score: -233.94, mean:-228.00}, {target: "AB40", pdb: "1BA4", score: -266.92, mean:-224.43}, {target: "Human Serum Albumin", pdb: "1AO6", score: -297.44, mean: -252.41},]}
                            className = {styles.table}
                            caption = "**Table 3.** HDOCK scores for the AB7-92-1H1 aptamer docked against AB42, AB40, and human serum albumin."
                        ></Table>
                        <Paragraphs paragraphs = {content.recognition4}/>
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Human serum albumin control"></SecondHeading>
                        <Paragraphs paragraphs = {content.recognition5}/>
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Size-matched scrambled peptide controls"></SecondHeading>
                        <Paragraphs paragraphs = {content.recognition6}/>
                        <Table
                            columns = {[{key: "peptide", label: "Peptide"}, {key: "score", label: "Best HDOCK Score"}, {key: "mean", label: "Mean of Top 10 Scores"}]}
                            rows = {[{peptide: "AB42 sequence - model control", score: -246.81, mean: -216.20}, {peptide: "Scrambled AB42 - 1", score: -222.41, mean: -200.74}, {peptide: "Scrambled AB42 - 2", score: -240.91, mean: -217.69}, {peptide: "Scrambled AB42 - 3", score: -235.97, mean: -218.75},]}
                            className = {styles.table}
                            caption = "**Table 4.** HDOCK scores for the AB7-92-1H1 aptamer docked against AB42 and three scrambled AB42 peptide controls."
                        ></Table>
                        <Paragraphs paragraphs = {content.recognition7}/>
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Interpretation and implications for biosensor development"></SecondHeading>
                        <Paragraphs paragraphs = {content.recognition8}/>
                        <FigureArea 
                            naturalHeight={true}
                            number = {3} 
                            children = 
                            {<img
                                src = ""
                                alt = "HDOCK Predictions for AB42 and control molecules"
                                className = {styles.figureImage}
                            ></img>} 
                            caption = "HDOCK predictions for AB42 and the control molecules. These scores are ranking values, not binding free energies."
                        />
                        <FigureArea 
                            naturalHeight={true}
                            number = {4} 
                            children = 
                            {<img
                                src = ""
                                alt = "HDOCK Predictions for AB42 and scrambled peptide controls"
                                className = {styles.figureImage}
                            ></img>} 
                            caption = "HDOCK predictions for AB42 and three scrambled peptide controls. These scores are ranking values, not binding free energies."
                        />
                    </ViewportSection>
                </>
            )
        },
        {
            id: "tmsd-mb",
            title: "TMSD & Methylene Blue",
            render: () => (
                <>
                    <ViewportSection center>
                        <Heading caption = "Investigating the Effect of TMSD on Methylene Blue Interactions" />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Why investigate the TMSD extension?"></SecondHeading>
                        <Paragraphs paragraphs = {content.tmsdmb1} />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Construction of the extended aptamer"></SecondHeading>
                        <Paragraphs paragraphs = {content.tmsdmb2} />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Comparison of constructs with and without TMSD"></SecondHeading>
                        <Paragraphs paragraphs = {content.tmsdmb3} />
                        <FigureArea 
                            naturalHeight={true}
                            number = {5} 
                            children = 
                            {<img
                                src = ""
                                alt = "MB docking scores for aptamer vs. extended construct"
                                className = {styles.figureImage}
                            ></img>} 
                            caption = "Methylene blue docking scores for the original aptamer and extended construct. Each condition included two initial runs with twenty reported poses per run."
                        />
                        <Paragraphs paragraphs = {content.tmsdmb4} />
                        <Table
                            columns = {[{key: "receptor", label: "Receptor Model"}, {key: "score", label: "Best HDOCK Score"}, {key: "mean", label: "Mean of Top 10 Scores"}]}
                            rows = {[{receptor: "Aptamer - TMSD without MB", score: -295.58, mean: -254.20}, {receptor: "Aptamer - TMSD with MB", score: -270.84, mean: -245.4}]}
                            className = {styles.table}
                            caption = "**Table 5.** HDOCK scores for AB42 docked against the aptamer-TMSD receptor models with and without the methylene blue-related terminal modification."
                        ></Table>
                        <Paragraphs paragraphs = {content.tmsdmb5} />
                    </ViewportSection>
                </>
            )
        },
        {
            id: "complete",
            title: "Complete Bionsensor",
            render: () => (
                <>
                    <ViewportSection center>
                        <Heading caption = "Three Dimensional Modelling of the Complete Biosensor" />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Why model the complete system?"></SecondHeading>
                        <Paragraphs paragraphs = {content.complete1} />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Modelling the TMSD complex"></SecondHeading>
                        <Paragraphs paragraphs = {content.complete2} />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "PAMAM dendrimer modelling"></SecondHeading>
                        <Paragraphs paragraphs = {content.complete3} />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Modelling the dendrimer - DNA attachment"></SecondHeading>
                        <Paragraphs paragraphs = {content.complete4} />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Constructing models with multiple aptamer modules"></SecondHeading>
                        <Paragraphs paragraphs = {content.complete5} />
                        <FigureArea 
                            naturalHeight={true}
                            number = {6} 
                            children = 
                            {<img
                                src = ""
                                alt = "One Aptamer Model"
                                className = {styles.figureImage}
                            ></img>} 
                            caption = "Model of one aptamer - TMSD module connected to a generation 1 PAMAM dendrimer, showing the proposed arrangement and linker."
                        />
                        <FigureArea 
                            naturalHeight={true}
                            number = {7} 
                            children = 
                            {<img
                                src = ""
                                alt = "One, Two and Three Aptamer models"
                                className = {styles.figureImage}
                            ></img>} 
                            caption = "Models with one, two, and three aptamer modules around a PAMAM dendrimer. Used to examine attachment geometry."
                        />
                    </ViewportSection>
                </>
            )
        },
        {
            id: "em-md",
            title: "Energy Minimization and Molecular Dynamics",
            render: () => (
                <>
                    <ViewportSection center>
                        <Heading caption = "Energy Minimization and Molecular Dynamics" />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Why use molecular dynamics?"></SecondHeading>
                        <Paragraphs paragraphs = {content.md1} />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Force field preparation and simulation conditions"></SecondHeading>
                        <Paragraphs paragraphs = {content.md2} />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Energy minimization of the single aptamer system"></SecondHeading>
                        <Paragraphs paragraphs = {content.md3} />
                        <Table
                            columns = {[{key: "stage", label: "Minimization Stage"}, {key: "energy", label: "Potential Energy (kcal/mol)"}]}
                            rows = {[{stage: "Initial Structure", energy: "141,306,563.9537"}, {stage: "After 5,000 steps", energy: "-11,395.5587"}, {stage: "Final after 20,000 steps", energy: "-11,599.0855"},]}
                            className = {styles.table}
                            caption = "**Table 6.** Potential energy of the single-aptamer Aptonix model before and after the two-stage energy minimization process."
                        ></Table>
                        <Paragraphs paragraphs = {content.md4} />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Energy minimization of the two aptamer system"></SecondHeading>
                        <Paragraphs paragraphs = {content.md5} />
                        <Table
                            columns = {[{key: "stage", label: "Minimization Stage"}, {key: "energy", label: "Potential Energy (kcal/mol)"}]}
                            rows = {[{stage: "Initial Structure", energy: "281,221,294.1867"}, {stage: "After 5,000 steps", energy: "-22,106.3890"}, {stage: "Final after 20,000 steps", energy: "-22,519.9640"},]}
                            className = {styles.table}
                            caption = "**Table 7.** Potential energy of the two-aptamer Aptonix model before and after the two-stage energy minimization process."
                        ></Table>
                        <Paragraphs paragraphs = {content.md6} />
                        <Table
                            columns = {[{key: "model", label: "Model"}, {key: "atoms", label: "Number of Atoms"}, {key: "energy", label: "Final Potential Energy (kcal/mol)"}, {key: "epm", label: "Potential Energy Per Atom (kcal/mol)"}]}
                            rows = {[{model: "One Aptamer", atoms: "2,772", energy: "-11,599.0855", epm: "-4.1844"}, {model: "Two Aptamers", atoms: "5,390", energy: "-22,519.9640", epm: "-4.1781"}]}
                            className = {styles.table}
                            caption = "**Table 8.** Final potential energies and atom-normalized energies of the minimized single- and two-aptamer Aptonix models."
                        ></Table>
                        <Paragraphs paragraphs = {content.md7} />
                        <FigureArea 
                            naturalHeight={true}
                            number = {8} 
                            children = 
                            {<img
                                src = ""
                                alt = "Potential Energy of NAMD minimization stages"
                                className = {styles.figureImage}
                            ></img>} 
                            caption = "Potential energy during the two stages of NAMD minimization. Both the models showed a large decrease in energy."
                        />
                        <SecondHeading secondHeadingImgs = {["./images/second-heading.png"]} secondHeadingHeight = "10vw" caption = "Molecular dynamics of the assembled structure"></SecondHeading>
                        <Paragraphs paragraphs = {content.md8} />
                        <Table
                        columns={[
                            { key: "measurement", label: "Measurement" },
                            { key: "initial", label: "Initial Distance (Å)" },
                            { key: "final", label: "Final Distance (Å)" }
                        ]}
                        rows={[
                            {
                                measurement: "Aptamer 1 - Aptamer 2, centre of mass",
                                initial: "190.0074",
                                final: "189.9928"
                            },
                            {
                                measurement: "Closest atoms between aptamers",
                                initial: "105.6306",
                                final: "104.0307"
                            },
                            {
                                measurement: "Closest atoms between complete modules",
                                initial: "21.8898",
                                final: "20.4394"
                            },
                            {
                                measurement: "Dendrimer - Aptamer 1, centre of mass",
                                initial: "113.3079",
                                final: "113.3979"
                            },
                            {
                                measurement: "Dendrimer - Aptamer 2, centre of mass",
                                initial: "113.2613",
                                final: "113.2342"
                            },
                            {
                                measurement: "Dendrimer surface - Aptamer 1, nearest atoms",
                                initial: "53.5458",
                                final: "53.4036"
                            },
                            {
                                measurement: "Dendrimer surface - Aptamer 2, nearest atoms",
                                initial: "52.6791",
                                final: "52.5154"
                            }
                        ]}
                        className={styles.table}
                        caption="**Table 9.** Initial and final intercomponent distances in the two-aptamer Aptonix model during the approximately 1 ns molecular dynamics simulation."
                        ></Table>
                        <Paragraphs paragraphs = {content.md9} />
                        <FigureArea 
                            naturalHeight={true}
                            number = {9} 
                            children = 
                            {<img
                                src = ""
                                alt = "Intial vs. final configurations of the two apatamer model"
                                className = {styles.figureImage}
                            ></img>} 
                            caption = "Initial and final configurations of the two aptamer - PAMAM model during the pilot simulation"
                        />
                        <FigureArea 
                            naturalHeight={true}
                            number = {10} 
                            children = 
                            {<img
                                src = ""
                                alt = "Distances between aptamer modules"
                                className = {styles.figureImage}
                            ></img>} 
                            caption = "Distances between the aptamer modules and PAMAM scaffold during the pilot simulation. No major changes were observed."
                        />
                    </ViewportSection>
                </>
            )
        },
        {
            id: "challenges",
            title: "Challenges & Improvements",
            render: () => (
                <>
                    <ViewportSection center>
                        <Heading caption = "Computational Challenges and Design Improvements" />
                        <Paragraphs paragraphs = {content.challenges1} />
                        <h2>Selecting a representative aptamer structure</h2>
                        <Paragraphs paragraphs = {content.challenges2} />
                        <h2>Distinguishing specific recognition from nonspecific interactions</h2>
                        <Paragraphs paragraphs = {content.challenges3} />
                        <h2>Building chemically connected models</h2>
                        <Paragraphs paragraphs = {content.challenges4} />
                        <h2>Parameterizing nonstandard chemical linkages</h2>
                        <Paragraphs paragraphs = {content.challenges5} />
                        <h2>Distinguishing visualization from functional validatio</h2>
                        <Paragraphs paragraphs = {content.challenges6} />
                    </ViewportSection>
                </>
            )
        },
        {
            id: "future",
            title: "Future",
            render: () => (
                <>
                    <ViewportSection center>
                        <Heading caption = "Future Computational Development" />
                        <h2>Expanded biomarker specificity analysis</h2>
                        <Paragraphs paragraphs = {content.future1} />
                        <h2>Independent docking replicates</h2>
                        <Paragraphs paragraphs = {content.future2} />
                        <h2>Increased aptamer loading</h2>
                        <Paragraphs paragraphs = {content.future3} />
                        <h2>Longer molecular dynamics simulations</h2>
                        <Paragraphs paragraphs = {content.future4} />
                        <h2>In silico aptamer development</h2>
                        <Paragraphs paragraphs = {content.future5} />
                    </ViewportSection>
                </>
            )
        },
        {
            id: "conclusion",
            title: "Conclusion",
            render: () => (
                <>
                    <ViewportSection center>
                        <Heading caption = "CONCLUSION" />
                        <Paragraphs paragraphs = {content.conclusion} />
                    </ViewportSection>
                </>
            )
        },
        {
            id: "references",
            title: "References",
            render: () => (
                <ViewportSection center>
                    <ReferencesViewer
                        references={content.references}
                    />
                </ViewportSection>
            )
        }
    ]
    return (
        <PageLayout sections = {sections} bannerImgs = {["./images/basic-banner.png"]} bannerHeight = "50svh" caption = "MODELLING"></PageLayout>
    )
}