import content from "./home-content.json"
import TextBlock from "/src/Components/TextComponents.jsx"
import ClickWrapper from "/src/Components/LinkComponents.jsx"

export default function Home() {
    return (
        <>
            <TextBlock {...content.Home}/>
            <TextBlock {...content.Random}/>
            <ClickWrapper to="/test">
                <h2>I should be clicked and go to test!</h2>
            </ClickWrapper>
        </>
    )
}


