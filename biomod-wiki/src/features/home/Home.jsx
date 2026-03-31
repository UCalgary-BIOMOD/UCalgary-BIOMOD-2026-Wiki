import content from "./home-content.json"
import TestText from "/src/Components/TextComponents.jsx"

export default function Test() {
    return (
        <>
            <TestText {...content.Test}/>
        </>
    )
}

