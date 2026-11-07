import PageLayout from "@/Components/PageLayout.jsx"
import NotebookTimeline from "@/Components/NotebookTimeline.jsx"
import VerticalCard from "@/Components/VerticalCard.jsx"
import TextBlock from "@/Components/TextComponents.jsx"
import ExperimentCard from "@/Components/ExperimentCard.jsx"
import CategoryLegend, {CategoryDot} from "@/Components/CategoryLegend.jsx"
import {CATEGORIES, categoryOf} from "@/Components/experimentCategories.js"
import {useState, useEffect} from "react"
import fm from "front-matter"
import styles from "./Notebook.module.css"



/**
 * Reads every notebook entry in src/content/experiments/*.md and returns them sorted by id.
 * Each file has YAML front matter (id, title, caption, dates, researchers, tag, images) followed by a markdown body;
 * see src/content/README.md for what each field does.
 * @param markdownFiles Object of {path: raw file text}, from import.meta.glob
 * @returns Array of entries: the front-matter fields plus `content` (the markdown body) and `slug` (the file name)
 */
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

/**
 * Reads the hand-written weekly summaries in src/content/weekly-summaries/*.md (see the README in that folder).
 * @param summaryFiles Object of {path: raw file text}, from import.meta.glob
 * @returns Array of {week: Date, content: markdown} (README.md is skipped)
 */
function loadSummaries({summaryFiles}) {
    return Object.entries(summaryFiles)
        .filter(([path]) => !path.endsWith("README.md"))
        .map(([, raw]) => {
            const {attributes, body} = fm(raw)
            return {week: attributes.week, content: body}
        })
        .filter((summary) => summary.week instanceof Date)
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

    const summaries = loadSummaries({
        summaryFiles: import.meta.glob(
            "../../content/weekly-summaries/*.md",
            {query: "?raw", import: "default", eager: true}
        )
    })


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
                <NotebookTimeline experiments={experiments} summaries={summaries} setActiveExperimentId={selectExperiment} />
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