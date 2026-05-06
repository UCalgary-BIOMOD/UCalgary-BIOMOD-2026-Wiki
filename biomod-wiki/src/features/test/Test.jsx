import content from "./test-content.json"
import TestText from "/src/Components/TextComponents.jsx"
import LinkWrapper from "../../Components/LinkComponents"
import PageLayout from "/src/Components/PageLayout.jsx"
export default function Test() {
    const sections = [

        {
            id: "test",
            title: "Test",

            render: () => (
            <>
                <TestText {...content.Test}/>
                <LinkWrapper to="/">
                    <img src = "src/assets/i-want-to-go-home.jpg" alt="I want to go home!"></img>
                </LinkWrapper>
            </>
            )
        }
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}

