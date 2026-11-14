import styles from "./VerticalCard.module.css"
/**
 * An accordion: a clickable header that opens and closes a panel of content.
 * @param id The element id (lets other code scroll to this card)
 * @param caption The header content
 * @param content The panel content shown while open
 * @param isOpen Whether the panel is open (controlled by the parent)
 * @param onToggle Called when the header is clicked
 * @param centered If true, the chevron and caption are centered in the header instead of left-aligned
 */
export default function VerticalCard({id, caption, content, isOpen, onToggle, centered = false}) {
    
    return (
    <div id = {id} className = {styles.verticalCard}>
        <button 
        className = {styles.cardHeader + (centered ? " " + styles.centered : "")}
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