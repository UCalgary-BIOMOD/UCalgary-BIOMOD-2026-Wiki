import {CATEGORIES} from "./experimentCategories.js"
import styles from "./CategoryLegend.module.css"

/**
 * A small colored circle for an experiment category.
 * @param color A CSS color (usually category.color)
 */
export function CategoryDot({color}) {
    return <span className = {styles.dot} style = {{backgroundColor: color}} aria-hidden = "true" />
}

/**
 * The color key for the notebook: one row per experiment category.
 */
export default function CategoryLegend() {
    return (
        <ul className = {styles.legend} aria-label = "Experiment category colors">
            {CATEGORIES.map((category) => (
                <li key = {category.key}>
                    <CategoryDot color = {category.color} />
                    {category.label}
                </li>
            ))}
        </ul>
    )
}
