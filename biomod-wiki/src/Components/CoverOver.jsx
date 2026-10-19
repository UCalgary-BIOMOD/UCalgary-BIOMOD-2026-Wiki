import styles from "./CoverOver.module.css"

/**
 * The card that appears when a goal category is hovered: a colored title and a bullet list.
 * With a `placeholder` (and no items) it renders the same card holding a hint instead.
 * @param title The card heading (the category name)
 * @param items The bullet points
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
                        {items.map((item) => (
                            <li key = {item}>{item}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}
