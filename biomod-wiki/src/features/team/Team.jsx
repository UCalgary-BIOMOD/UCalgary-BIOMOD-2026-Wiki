import content from "./team-content.json"
import TextBlock from "/src/Components/TextComponents.jsx"
import LinkWrapper from "/src/Components/LinkComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"
/*Need to import pop-up card component*/

export default function Team() {
    const sections = [
        {
            id: "team",
            title: "Team",
            render: () => (
                <>
                    <TextBlock {...content.Team}/>
                    <h2>hi</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                </>
            )
        },
        {
            id: "support",
            title: "Support",
            render: () => (
                <>
                    <TextBlock {...content.Support}/>
                    <h2>meow</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                </>
            )
        },
        {
            id: "photoGallery",
            title: "Photo Gallery",
            render: () => (
                <>
                    <TextBlock {...content.PhotoGallery}/>
                    <h2>woof</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                </>
            )
        },
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}