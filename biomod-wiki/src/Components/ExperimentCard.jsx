import styles from "./ExperimentCard.module.css"
import VerticalCard from "./VerticalCard.jsx"
import ImageCarousel from "./ImageCarousel.jsx"
import TextBlock from "./TextComponents.jsx"
import ReactMarkdown from "react-markdown"


export default function ExperimentCard({id, startDate, endDate, researchers = [], content, images = []}) {

    const dateFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
    }

    

    const formattedStart = new Date(startDate).toLocaleDateString("en-CA", dateFormatOptions)
    const formattedEnd = new Date(endDate).toLocaleDateString("en-CA", dateFormatOptions)

    return (
        <div id = {`experiment-${id}`} className = {styles.experimentCard}>
            <div className = {styles.experimentText}>
                <TextBlock
                    heading = {`${formattedStart} - ${formattedEnd}`}
                    size = "h3"
                    
                />
                <TextBlock
                    heading = {"Researchers: " + researchers.join(", ")}
                    size = "h3"
                />
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            </div>
            <ImageCarousel 
                className = {styles.experimentImages}
                caption=""
                imgs={images.map((src, index) => ({
                    id: index,
                    src
                }))}
            />
        </div>
    )
}