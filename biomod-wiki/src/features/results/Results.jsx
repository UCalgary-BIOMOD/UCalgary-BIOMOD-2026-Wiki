
import TextBlock from "/src/Components/TextComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"


export default function Results() {
    const sections = [
        {
            id: "resultss",
            title: "Results",
            render: () => (
                <>
                    <h1>Results</h1>
                </>
            )
        }
    ]
    return (
        <PageLayout sections = {sections} bannerImgs = {["./images/aptonix-logo.png"]}/>
    )
}