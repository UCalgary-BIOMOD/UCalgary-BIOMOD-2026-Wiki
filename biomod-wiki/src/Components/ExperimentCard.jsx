import styles from "./ExperimentCard.module.css"
import VerticalCard from "./VerticalCard.jsx"
import ImageCarousel from "./ImageCarousel.jsx"
import TextBlock from "./TextComponents.jsx"
import ReactMarkdown from "react-markdown"


export default function ExperimentCard({date, researchers = [], content, images = []}) {


    return (
        <div className = {styles.experimentCard}>
            <div className = {styles.experimentText}>
                <TextBlock
                    heading = {date}
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