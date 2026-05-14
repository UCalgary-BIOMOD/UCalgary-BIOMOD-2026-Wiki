import styles from "./LabExperimentCard.module.css"
import {useState} from "react";
export default function LabExperimentCard({caption, content}) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleCard = () => setIsOpen(!isOpen)
    return (
    <div className = {styles.experimentCard}>
        <button 
        className = {styles.cardHeader}
        onClick = {toggleCard}
        >
            <span className = {styles.chevron + (isOpen ? " " + styles.open : " ")}>
                ▼
            </span>
            {caption}
        </button>
        <div 
            className = {isOpen ? styles.card + " " + styles.open : styles.card}
            style = {{textAlign: "left"}}
        >
            
            {content}
        </div>
    </div>
    )
}