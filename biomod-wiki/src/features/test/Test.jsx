import content from "./test-content.json";
import TestText from "src/Components/TextComponents";

function Test() {
    return (
        <>
            <Test {...content.Test.heading, content.Test.text}/>
        </>
    )
}

export default Test;