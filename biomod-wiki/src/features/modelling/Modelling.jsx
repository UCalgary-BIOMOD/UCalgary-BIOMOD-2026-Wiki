
import TextBlock from "/src/Components/TextComponents.jsx"

import PageLayout from "/src/Components/PageLayout.jsx"



export default function Modelling() {
    const sections = [
        {
            id: "modelling",
            title: "Modelling",
            render: () => (
                <>
                    <h1>Modelling</h1>
                </>
            )
        }
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}