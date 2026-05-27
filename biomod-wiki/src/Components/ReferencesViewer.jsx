import References from "./References"
import VerticalCard from "./VerticalCard";
import {useState} from "react"
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