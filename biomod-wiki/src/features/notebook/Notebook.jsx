import PageLayout from "@/Components/PageLayout.jsx"
import NotebookComponent from "@/Components/NotebookComponent.jsx"
import NotebookMobileComponent from "@/Components/NotebookMobileComponent.jsx"
import VerticalCard from "@/Components/VerticalCard.jsx"
import TextBlock from "@/Components/TextComponents.jsx"
import ExperimentCard from "@/Components/ExperimentCard.jsx"
import CategoryLegend, {CategoryDot} from "@/Components/CategoryLegend.jsx"
import {CATEGORIES, categoryOf} from "@/Components/experimentCategories.js"
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
    const [openCategory, setOpenCategory] = useState(null)

    /*Opening an experiment (e.g. from the calendar) also opens the category group that holds it*/
    const selectExperiment = (id) => {
        setActiveExperimentId(id)
        const experiment = experiments.find((candidate) => candidate.id === id)
        const category = experiment && categoryOf(experiment)
        if (category) setOpenCategory(category.key)
    }

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
                <div className={styles.desktopCalendar}>
                    <NotebookComponent experiments={experiments} setActiveExperimentId={selectExperiment} />
                </div>
                <div className={styles.mobileCalendar}>
                    <NotebookMobileComponent experiments={experiments} setActiveExperimentId={selectExperiment} />
                </div>
                <CategoryLegend />
            </>
            )
        },
        {
            id: "experiments",
            title: "Experiments",

            render: () => (
                <>
                    {CATEGORIES.map((category) => {
                        const entries = experiments.filter((experiment) => categoryOf(experiment) === category)
                        return (
                            <VerticalCard
                                id = {`category-${category.key}`}
                                key = {category.key}
                                caption = {<><CategoryDot color = {category.color} /> {category.groupLabel}</>}
                                centered
                                isOpen = {openCategory === category.key}
                                onToggle = {() => setOpenCategory(openCategory === category.key ? null : category.key)}
                                content = {
                                    entries.length === 0 ? (
                                        <p className = {styles.emptyCategory}>No entries yet.</p>
                                    ) : <div className = {styles.entries} style = {{"--category-color": category.color}}>{entries.map((experiment) => {
                                        const isOpen = activeExperimentId === experiment.id
                                        return (
                                            <VerticalCard
                                                id = {`experiment-${experiment.id}`}
                                                key = {experiment.id}
                                                caption = {experiment.title}
                                                isOpen = {isOpen}
                                                onToggle = {() => setActiveExperimentId(isOpen ? null : experiment.id)}
                                                content = {
                                                    <ExperimentCard
                                                        {...experiment}
                                                        isActive = {isOpen}
                                                    />
                                                }
                                            />
                                        )
                                    })}</div>
                                }
                            />
                        )
                    })}
                </>
            )
        }
    ]
    
    return (
        <PageLayout sections = {sections} bannerImgs = {["/images/dna-ladder.png"]} bannerHeight = "40svh" caption = "NOTEBOOK"/>
    )
}