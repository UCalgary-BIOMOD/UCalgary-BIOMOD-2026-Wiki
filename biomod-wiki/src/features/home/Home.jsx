import content from "./home-content.json"
import TextBlock from "/src/Components/TextComponents.jsx"
import LinkWrapper from "/src/Components/LinkComponents.jsx"
import PageLayout from "/src/Components/PageLayout.jsx"

export default function Home() {
    const sections = [
        {
            id: "home",
            title: "Home",
            render: () => (
                <>
                    <TextBlock {...content.Home}/>
                </>
            )
        },
        {
            id: "random",
            title: "Random",
            render: () => (
                <>
                    <TextBlock {...content.Random}/>
                </>
            )
        },
        {
            id: "test",
            title: "Test",
            render: () => (
                <>
                    <LinkWrapper to="/test">
                        <h2>I should be clicked and go to test!</h2>
                    </LinkWrapper>
                </>
            )
        },
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}


