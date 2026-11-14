import {useState} from "react"
import CoverOver from "./CoverOver.jsx"
import styles from "./GoalSection.module.css"

/**
 * Side-by-side lab columns. Clicking (or tapping / pressing Enter on) a category pins its goals in the box below that column,
 * and they stay there until another category is chosen. On devices with a mouse, hovering a category previews its goals
 * and the box returns to the pinned category when the pointer leaves.
 * @param labs The columns: [{name: "Wet Lab", tone: "gold" | "blue", categories: [{title, items: []}]}].
 *             Each item is a string, or {text, done: true} for a goal that is completed (shown with a checked box).
 */
export default function GoalSection({labs}) {
    const [pinned, setPinned] = useState({}) /*lab name -> title of the category the user clicked*/
    const [previewed, setPreviewed] = useState({}) /*lab name -> title of the category under the pointer (hover only)*/
    const [canHover] = useState(() => window.matchMedia("(hover: hover)").matches)

    const pin = (labName, title) => setPinned((previous) => ({...previous, [labName]: title}))
    const preview = (labName, title) => setPreviewed((previous) => ({...previous, [labName]: title}))

    return (
        <div className = {styles.goals}>
            {labs.map((lab) => {
                /*A hovered category takes priority over the pinned one while the pointer is on it*/
                const shownTitle = previewed[lab.name] ?? pinned[lab.name]
                const active = lab.categories.find((category) => category.title === shownTitle)
                return (
                    <div key = {lab.name} className = {`${styles.column} ${styles[lab.tone]}`}>
                        <h2 className = {styles.heading}>{lab.name}</h2>
                        <ul className = {styles.categories}>
                            {lab.categories.map((category) => (
                                <li key = {category.title}>
                                    <button
                                        type = "button"
                                        className = {`${styles.category} ${active === category ? styles.active : ""}`}
                                        aria-pressed = {pinned[lab.name] === category.title}
                                        onMouseEnter = {() => preview(lab.name, category.title)}
                                        onMouseLeave = {() => preview(lab.name, null)}
                                        onFocus = {() => pin(lab.name, category.title)}
                                        onClick = {() => pin(lab.name, category.title)}
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
                                <CoverOver tone = {lab.tone} placeholder = {`${canHover ? "Hover over or click" : "Tap"} ${lab.name.toLowerCase()} categories to find out goals`} />
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
