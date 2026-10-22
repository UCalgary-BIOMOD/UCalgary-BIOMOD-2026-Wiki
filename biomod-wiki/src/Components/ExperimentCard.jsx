import styles from "./ExperimentCard.module.css"
import VerticalCard from "./VerticalCard.jsx"
import ImageCarousel from "./ImageCarousel.jsx"
import TextBlock from "./TextComponents.jsx"
import ReactMarkdown from "react-markdown"
import {DateTime} from "luxon"

export default function ExperimentCard({id, dates, researchers = [], content, images = [], isActive}) {

    const dateFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
    }

    
    
    
    
    return (
        <div id = {`experiment-${id}`} className = {`${styles.experimentCard} ${isActive ? styles.active : ""}`}>
            <div className = {styles.experimentText}>
                <TextBlock
                    heading = {dates
                        .map((date) => DateTime.fromJSDate(date, {zone: "UTC"}).toFormat("MMMM d"))
                        .join(", ")}
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
            {images.length > 0 &&(
               <ImageCarousel 
                className = {styles.experimentImages}
                caption=""
                imgs={images.map((src, index) => ({
                    id: index,
                    src
                }))}
                /> 
            )}
            
        </div>
    )
}