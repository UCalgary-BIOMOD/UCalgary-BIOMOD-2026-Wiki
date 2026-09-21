
import TextBlock from "/src/Components/TextComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"


export default function Modelling() {
    const sections = [
        {
            id: "experiments",
            title: "Experiments",
            render: () => (
                <>
                    <h1>Experiments</h1>
                </>
            )
        }
    ]
    return (
        <PageLayout sections = {sections} bannerImgs = {[ "/images/dna-ladder.png"]}/>
    )
}