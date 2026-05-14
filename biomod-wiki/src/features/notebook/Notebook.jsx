import PageLayout from "@/Components/PageLayout.jsx"
import NotebookComponent from "@/Components/NotebookComponent.jsx"
import LabExperimentCard from "@/Components/LabExperimentCard.jsx"
import TextBlock from "@/Components/TextComponents.jsx"
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
        {
            id: "testExpt",
            title: "Test Experiment",

            render: () => (
            <>
                <LabExperimentCard caption = "Experiment on the Effects of Eating 10,000 Bananas!"
                content = {
                    <TextBlock
                        heading = "Our Experiment on Eating 10,000 Bananas"
                        text = "We found that eating 10,000 bananas sufficiently raised the radioactivity of our participants by 1 Roentgen. The participant later died frm eating too many bananas. Will seek replicates. Yummy bananas though, shoutout mah boy Banana Man."
                    />
                }
                />
            </>
            )
        },
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}