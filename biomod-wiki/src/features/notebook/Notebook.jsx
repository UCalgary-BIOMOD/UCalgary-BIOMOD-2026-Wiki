import PageLayout from "@/Components/PageLayout.jsx"

export default function Notebook() {
    const sections = [

        {
            id: "notebook",
            title: "Notebook",

            render: () => (
            <>
                <p>Here be the notebook of our glorious project</p>
            </>
            )
        },
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}