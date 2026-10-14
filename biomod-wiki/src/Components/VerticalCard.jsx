import styles from "./VerticalCard.module.css"
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
            <span className={styles.caption}>{caption}</span>
        </button>
        <div 
            className = {isOpen ? styles.card + " " + styles.open : styles.card}
            
        >
            <div className = {styles.cardInner}>
                {content}
            </div>
        </div>
    </div>
    )
}