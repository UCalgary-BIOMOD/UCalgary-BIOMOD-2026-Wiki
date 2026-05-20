import styles from "./VerticalCard.module.css"
import {useState} from "react";
export default function VerticalCard({id, caption, content, isOpen, onToggle}) {
    
    return (
    <div id = {id} className = {styles.verticalCard}>
        <button 
        className = {styles.cardHeader}
        onClick = {onToggle}
        >
            <span className = {styles.chevron + (isOpen ? " " + styles.open : " ")}>
                ▼
            </span>
            {caption}
        </button>
        <div 
            className = {isOpen ? styles.card + " " + styles.open : styles.card}
            
        >
            
            {content}
        </div>
    </div>
    )
}