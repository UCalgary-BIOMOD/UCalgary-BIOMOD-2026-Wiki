import {useState} from "react"
import CoverOver from "./CoverOver.jsx"
import styles from "./GoalSection.module.css"

/**
 * Side-by-side lab columns. Hovering (or focusing/tapping) a category shows its goals in the box below that column.
 * The last chosen category stays on screen so it can be read after the pointer leaves.
 * @param labs The columns: [{name: "Wet Lab", tone: "gold" | "blue", categories: [{title, items: []}]}]
 */
export default function GoalSection({labs}) {
    const [selected, setSelected] = useState({})
    const [canHover] = useState(() => window.matchMedia("(hover: hover)").matches)

    const choose = (labName, title) => setSelected((previous) => ({...previous, [labName]: title}))

    return (
        <div className = {styles.goals}>
            {labs.map((lab) => {
                const active = lab.categories.find((category) => category.title === selected[lab.name])
                return (
                    <div key = {lab.name} className = {`${styles.column} ${styles[lab.tone]}`}>
                        <h2 className = {styles.heading}>{lab.name}</h2>
                        <ul className = {styles.categories}>
                            {lab.categories.map((category) => (
                                <li key = {category.title}>
                                    <button
                                        type = "button"
                                        className = {`${styles.category} ${active === category ? styles.active : ""}`}
                                        aria-pressed = {active === category}
                                        onMouseEnter = {() => choose(lab.name, category.title)}
                                        onFocus = {() => choose(lab.name, category.title)}
                                        onClick = {() => choose(lab.name, category.title)}
                                    >
                                        {category.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className = {styles.panel} aria-live = "polite">
                            {active ? (
                                <CoverOver key = {active.title} title = {active.title} items = {active.items} tone = {lab.tone} />
                            ) : (
                                <CoverOver tone = {lab.tone} placeholder = {`${canHover ? "Hover over" : "Tap"} ${lab.name.toLowerCase()} categories to find out goals`} />
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
