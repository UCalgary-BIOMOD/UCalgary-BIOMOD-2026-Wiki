import content from "./test-content.json"
import TestText from "/src/Components/TextComponents.jsx"
import LinkWrapper from "../../Components/LinkComponents"
import PageLayout from "/src/Components/PageLayout.jsx"
import YouTubeEmbed from "../../Components/YouTubeEmbed"
import ImageCarousel from "../../Components/ImageCarousel"
import ProteinViewer from "../../Components/ProteinViewer"
import PDFViewer from "../../Components/PDFViewer"

export default function Test() {
    const sections = [

        {
            id: "test",
            title: "Test",

            render: () => (
            <>
                <TestText {...content.Test}/>
                <LinkWrapper to="/">
                    <img src = "/images/i-want-to-go-home.jpg" alt="I want to go home!"></img>
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
                        {id: 1, src: "/images/aptonix-logo.png"},
                        {id: 2, src: "/images/i-want-to-go-home.jpg"},
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
        },
        {
            id: "protein",
            title: "Protein",

            render: () => (
            <>
                <ProteinViewer pdbUrl={"/proteins/DNA_Aptamer3_1.pdb"}/>
            </>
            )
        },
        {
            id: "pdf",
            title: "Example PDF",

            render: () => (
            <>  
                <PDFViewer pdfPath = "/files/dendrimer-biosensors.pdf" caption = "Test PDF" />
            </>
            )
        }
    ]
    return (
        <PageLayout sections = {sections} bannerImgs = {[]}/>
    )
}

