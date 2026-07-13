
import TextBlock from "/src/Components/TextComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"


export default function ELSI() {
    const sections = [
        {
            id: "elsi",
            title: "ELSI",
            render: () => (
                <>
                    <h1>ELSI</h1>
                </>
            )
        }
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}