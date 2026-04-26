import content from "./home-content.json"
import TextBlock from "/src/Components/TextComponents.jsx"
import LinkWrapper from "/src/Components/LinkComponents.jsx"

export default function Home() {
    return (
        <>
            
            <TextBlock {...content.Home}/>
            <TextBlock {...content.Random}/>
            <LinkWrapper to="/test">
                <h2>I should be clicked and go to test!</h2>
            </LinkWrapper>
            
        </>
    )
}


