import content from "./home-content.json"
import TestText from "/src/Components/TextComponents.jsx"
import ClickWrapper from "/src/Components/LinkComponents.jsx"

export default function Home() {
    return (
        <>
            <TestText {...content.Home}/>
            <p>I love BIOMOD so much, if I was a BIO then I would be a MOD. </p>
            <ClickWrapper to="/test">
                <h2>I should be clicked and go to test!</h2>
            </ClickWrapper>
        </>
    )
}


