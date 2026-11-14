import {useId, useState} from "react"
import LabEntry from "./LabEntry.jsx"
import styles from "./ExperimentTabs.module.css"

/*One row of tabs has SLOTS buttons in total, including the "..." paging buttons, so at most 5 numbers show when it overflows*/
const SLOTS = 6

/*Where the numbered tabs starting at `start` end (exclusive), and whether "..." buttons are needed on either side*/
function pageOf(start, count) {
    const hasPrev = start > 0
    const room = SLOTS - (hasPrev ? 1 : 0)
    if (start + room >= count) return {end: count, hasPrev, hasNext: false}
    return {end: start + room - 1, hasPrev, hasNext: true}
}

function previousStart(start, count) {
    let candidate = 0
    while (pageOf(candidate, count).end < start) candidate++
    return candidate
}

function startShowing(index, start, count) {
    let next = start
    while (index >= pageOf(next, count).end) next = pageOf(next, count).end
    while (index < next) next = previousStart(next, count)
    return next
}

/**
 * A titled experiment group: a numbered list of the experiments, a row of numbered tabs and one window showing the chosen lab entry.
 * Tabs are capped at 6 buttons; past that, "..." buttons at the edges page through the rest.
 * @param title The group heading ("Aptamer Experiments")
 * @param experiments The lab entries (see LabEntry for the fields); each needs at least a title
 */
export default function ExperimentTabs({title, experiments = []}) {
    const uid = useId()
    const [active, setActive] = useState(0)
    const [start, setStart] = useState(0)

    const page = pageOf(start, experiments.length)
    const select = (index) => {
        setActive(index)
        setStart(startShowing(index, start, experiments.length))
    }

    const onKeyDown = (event) => {
        const step = {ArrowRight: 1, ArrowLeft: -1}[event.key]
        if (!step) return
        const next = Math.min(Math.max(active + step, 0), experiments.length - 1)
        select(next)
        event.preventDefault()
        document.getElementById(`${uid}-tab-${next}`)?.focus()
    }

    return (
        <div className = {styles.group}>
            <h2 className = {styles.heading}>{title}</h2>
            {experiments.length === 0 ? (
                <div className = {styles.window}>
                    <p className = {styles.empty}>No experiments added yet.</p>
                </div>
            ) : (
                <>
                    <ol className = {styles.list}>
                        {experiments.map((experiment, index) => (
                            <li key = {index}>{experiment.title}</li>
                        ))}
                    </ol>
                    <div className = {styles.tabs} role = "tablist" aria-label = {title} onKeyDown = {onKeyDown}>
                        {page.hasPrev && (
                            <button
                                type = "button"
                                className = {`${styles.tab} ${styles.more}`}
                                aria-label = "Show earlier tabs"
                                onClick = {() => setStart(previousStart(start, experiments.length))}
                            >
                                …
                            </button>
                        )}
                        {experiments.slice(start, page.end).map((experiment, offset) => {
                            const index = start + offset
                            return (
                                <button
                                    key = {index}
                                    id = {`${uid}-tab-${index}`}
                                    type = "button"
                                    role = "tab"
                                    className = {`${styles.tab} ${index === active ? styles.activeTab : ""}`}
                                    aria-selected = {index === active}
                                    aria-controls = {`${uid}-window`}
                                    tabIndex = {index === active ? 0 : -1}
                                    onClick = {() => select(index)}
                                >
                                    {index + 1}
                                </button>
                            )
                        })}
                        {page.hasNext && (
                            <button
                                type = "button"
                                className = {`${styles.tab} ${styles.more}`}
                                aria-label = "Show more tabs"
                                onClick = {() => setStart(page.end)}
                            >
                                …
                            </button>
                        )}
                    </div>
                    <div
                        id = {`${uid}-window`}
                        className = {styles.window}
                        role = "tabpanel"
                        aria-labelledby = {`${uid}-tab-${active}`}
                    >
                        <LabEntry entry = {experiments[active]} />
                    </div>
                </>
            )}
        </div>
    )
}
