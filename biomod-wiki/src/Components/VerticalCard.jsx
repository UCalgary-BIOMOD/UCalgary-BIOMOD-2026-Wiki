import styles from "./VerticalCard.module.css"
import {useState} from "react";
export default function VerticalCard({caption, content}) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleCard = () => setIsOpen(!isOpen)
    return (
    <div className = {styles.verticalCard}>
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