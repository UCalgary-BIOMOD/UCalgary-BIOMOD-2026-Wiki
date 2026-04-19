import content from "./test-content.json"
import TestText from "/src/Components/TextComponents.jsx"
import LinkWrapper from "../../Components/LinkComponents"
export default function Test() {
    return (
        <>
            <TestText {...content.Test}/>
            <LinkWrapper to="/">
                <img src = "src/assets/i-want-to-go-home.jpg" alt="I want to go home!"></img>
            </LinkWrapper>
        </>
    )
}

