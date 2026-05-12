import PageLayout from "@/Components/PageLayout.jsx"
import NotebookComponent from "@/Components/NotebookComponent.jsx"

export default function Notebook() {
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
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}