import styles from "./ExperimentCard.module.css"
import VerticalCard from "./VerticalCard.jsx"
import ImageCarousel from "./ImageCarousel.jsx"
import TextBlock from "./TextComponents.jsx"
import ReactMarkdown from "react-markdown"
import {DateTime} from "luxon"

/**
 * The body of one notebook entry (see content/experiments/*.md): its dates, researchers, the markdown text and an image carousel.
 * Notebook.jsx spreads the parsed front matter onto this component, so the props are the front-matter fields.
 * @param id The entry's unique id (used for the element id the calendar scrolls to)
 * @param dates Array of Date objects, one per day the work happened (YAML dates are parsed as UTC midnight)
 * @param researchers Array of researcher names
 * @param content The entry's markdown body (Objective, Materials, Procedure, ...)
 * @param images Optional array of image paths under /public, shown as a carousel beside the text
 * @param isActive True while this entry is the open one; adds the highlighted style
 */
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