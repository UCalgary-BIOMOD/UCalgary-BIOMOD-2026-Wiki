import content from "./test-content.json"
import TestText from "/src/Components/TextComponents.jsx"
import LinkWrapper from "../../Components/LinkComponents"
import PageLayout from "/src/Components/PageLayout.jsx"
import YouTubeEmbed from "../../Components/YouTubeEmbed"
import ImageCarousel from "../../Components/ImageCarousel"


import aptonixLogo from "@/assets/aptonix-logo.png"
import iwannagohome from "@/assets/i-want-to-go-home.jpg"
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
                <ImageCarousel 
                    caption = "This is a test gallery of all of my pictures."
                    imgs = {[
                        {id: 1, src: aptonixLogo},
                        {id: 2, src: iwannagohome},
                    ]}
                />

                
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

