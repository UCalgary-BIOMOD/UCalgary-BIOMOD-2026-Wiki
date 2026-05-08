import content from "./test-content.json"
import TestText from "/src/Components/TextComponents.jsx"
import LinkWrapper from "../../Components/LinkComponents"
import PageLayout from "/src/Components/PageLayout.jsx"
import YouTubeEmbed from "../../Components/YouTubeEmbed"

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
        },
        {
            id: "roblox",
            title: "Roblox",

            render: () => (
            <>
                <TestText {...content.Test}/>
                <LinkWrapper to="https://www.roblox.com/home">
                    <h2>Click to go to roblo yayayayayayayayaya</h2>
                </LinkWrapper>
            </>
            )
        },
        {
            id: "video",
            title: "Video",

            render: () => (
            <>
                <YouTubeEmbed w = "1030" h = "579" src="o_v9MY_FMcw"/>
            </>
            )
        }
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}

