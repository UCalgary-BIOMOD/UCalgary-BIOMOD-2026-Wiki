
import TextBlock from "/src/Components/TextComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"


/**
 * The Results page (/results). Placeholder: the page content has not been written yet.
 */
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
        <PageLayout sections = {sections} bannerImgs = {["./images/basic-banner.png"]} bannerHeight = "50svh" caption = "RESULTS"></PageLayout>
    )
}