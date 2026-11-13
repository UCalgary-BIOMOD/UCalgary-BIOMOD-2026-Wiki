
import TextBlock from "/src/Components/TextComponents.jsx"

import PageLayout from "/src/Components/PageLayout.jsx"



/**
 * The Modelling page (/modelling). Placeholder: the page content has not been written yet.
 */
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
        <PageLayout sections = {sections} bannerImgs = {["./images/basic-banner.png"]} bannerHeight = "50svh" caption = "MODELLING"></PageLayout>
    )
}