import PageLayout from "@/Components/PageLayout.jsx"
import NotebookComponent from "@/Components/NotebookComponent.jsx"
import VerticalCard from "@/Components/VerticalCard.jsx"
import TextBlock from "@/Components/TextComponents.jsx"
import ExperimentCard from "@/Components/ExperimentCard.jsx"

import fm from "front-matter"



function loadExperiments({markdownFiles}) {
    
    return Object.entries(markdownFiles).map(([path, raw]) => {
        
        const {attributes, body} = fm(raw)
        
        return {
            ...attributes,
            content: body,
            slug: path.split("/").pop().replace(".md", "")
        }
    })
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


    


    





    const sections = [

        {
            id: "notebook",
            title: "Notebook",

            render: () => (
            <>
                <p>Here be the notebook of our glorious project</p>
                <NotebookComponent/>
            </>
            )
        },
        {
            id: "experiments",
            title: "Experiments",

            render: () => (
                <>
                    {experiments.map((experiment) => (
                            <VerticalCard
                                key={experiment.id}
                                caption={experiment.title}
                                content={
                                    <ExperimentCard
                                        {...experiment}
                                    />
                                }
                            />
                        ))}
                </>
            )
        }
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}