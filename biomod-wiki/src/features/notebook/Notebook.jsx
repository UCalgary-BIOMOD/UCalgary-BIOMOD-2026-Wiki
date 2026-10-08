import PageLayout from "@/Components/PageLayout.jsx"
import NotebookComponent from "@/Components/NotebookComponent.jsx"
import NotebookMobileComponent from "@/Components/NotebookMobileComponent.jsx"
import VerticalCard from "@/Components/VerticalCard.jsx"
import TextBlock from "@/Components/TextComponents.jsx"
import ExperimentCard from "@/Components/ExperimentCard.jsx"
import {useState, useEffect} from "react"
import fm from "front-matter"
import styles from "./Notebook.module.css"



function loadExperiments({markdownFiles}) {
    
    return Object.entries(markdownFiles).map(([path, raw]) => {
        
        const {attributes, body} = fm(raw)
        
        return {
            ...attributes,
            id: Number(attributes.id),
            content: body,
            slug: path.split("/").pop().replace(".md", "")
        }
    })
    .sort((a, b) => a.id - b.id);
}

export default function Notebook() {

    const markdownFiles = import.meta.glob(
        "../../content/experiments/*.md",
        {
            query: "?raw",
            import: "default",
            eager: true,
        }
    )


    const experiments = loadExperiments({markdownFiles})


    const [activeExperimentId, setActiveExperimentId] = useState(null)

    /*Scroll*/

    
    useEffect(() => {
        if(activeExperimentId == null) return 

        const timeout = setTimeout(() => {
            document
                .getElementById(`experiment-${activeExperimentId}`)
                ?.scrollIntoView({behavior: "smooth", block: "start"
            })
        }, 501)

        return () => clearTimeout(timeout)
    }, [activeExperimentId])



    

    const sections = [

        {
            id: "notebook",
            title: "Notebook",

            render: () => (
            <>
                <p>Here be the notebook of our glorious project</p>
                <div className={styles.desktopCalendar}>
                    <NotebookComponent experiments={experiments} setActiveExperimentId={setActiveExperimentId} />
                </div>
                <div className={styles.mobileCalendar}>
                    <NotebookMobileComponent experiments={experiments} setActiveExperimentId={setActiveExperimentId} />
                </div>
            </>
            )
        },
        {
            id: "experiments",
            title: "Experiments",

            render: () => (
                <>
                    {experiments.map((experiment) => {
                        
                        const isOpen = activeExperimentId === experiment.id
                        return (
                            <VerticalCard
                                id = {`experiment-${experiment.id}`}
                                key={experiment.id}
                                caption={experiment.title}
                                isOpen = {isOpen}
                                onToggle={() => {
                                    setActiveExperimentId(
                                        isOpen ? null : experiment.id
                                    )
                                }}
                                content={
                                    <ExperimentCard
                                        {...experiment}
                                        isActive={isOpen}
                                    />
                                }
                            />
                        )
                    })}
                </>
            )
        }
    ]
    
    return (
        <PageLayout sections = {sections}/>
    )
}