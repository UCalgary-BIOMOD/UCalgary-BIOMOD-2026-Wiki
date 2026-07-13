
import TextBlock from "/src/Components/TextComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"


export default function Team() {
    const sections = [
        {
            id: "team",
            title: "Team",
            render: () => (
                <>
                    <h1>Team</h1>
                </>
            )
        }
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}