import References from "./References"
import VerticalCard from "./VerticalCard";
import {useState} from "react"
/**
 * The collapsible "References" dropdown used at the bottom of the content pages: a VerticalCard wrapping the References list.
 * @param references Array of reference objects (see References.jsx)
 * @param caption The dropdown header text
 * @param id The element id of the card
 */
export default function ReferencesViewer({
    references,
    caption = "References",
    id = "references-card"
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <VerticalCard
            id={id}
            caption={caption}
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            content={
                <References references={references} />
            }
        />
    )
}