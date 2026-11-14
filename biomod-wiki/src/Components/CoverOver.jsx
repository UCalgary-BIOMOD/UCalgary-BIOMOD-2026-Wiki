import styles from "./CoverOver.module.css"

/**
 * The card that shows a goal category: a colored title and a checklist of its goals.
 * With a `placeholder` (and no items) it renders the same card holding a hint instead.
 * @param title The card heading (the category name)
 * @param items The goals. Each is a string (not done yet) or {text, done: true} (checked off).
 * @param tone "gold" (wet lab) or "blue" (dry lab); sets the border and title color
 * @param placeholder Text shown when nothing is selected yet
 */
export default function CoverOver({title, items = [], tone = "gold", placeholder}) {
    return (
        <div className = {`${styles.card} ${styles[tone]}`}>
            {placeholder ? (
                <p className = {styles.placeholder}>{placeholder}</p>
            ) : (
                <>
                    <h3 className = {styles.title}>{title}</h3>
                    <ul className = {styles.list}>
                        {items.map((item) => {
                            const {text, done = false} = typeof item === "string" ? {text: item} : item
                            return (
                                <li key = {text} className = {`${styles.goal} ${done ? styles.done : ""}`}>
                                    <span className = {styles.checkbox} aria-hidden = "true">{done ? "✓" : ""}</span>
                                    <span className = {styles.srOnly}>{done ? "Completed: " : "Not completed: "}</span>
                                    <span>{text}</span>
                                </li>
                            )
                        })}
                    </ul>
                </>
            )}
        </div>
    )
}
