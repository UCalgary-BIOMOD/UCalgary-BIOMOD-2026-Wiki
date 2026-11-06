import {DateTime} from "luxon"
import {useMemo, useState} from "react"
import {CategoryDot} from "./CategoryLegend.jsx"
import {categoryOf} from "./experimentCategories.js"
import styles from "./NotebookTimeline.module.css"

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

/*Entry dates are parsed from YAML as UTC midnight, so every date in this file is handled in UTC to avoid off-by-one days*/
const UTC = {zone: "utc"}

/**
 * The Sunday that starts the week containing `date`.
 * @param date A luxon DateTime in UTC
 * @returns A luxon DateTime at 00:00 UTC on that Sunday
 */
function startOfWeek(date) {
    return date.startOf("day").minus({days: date.weekday % 7}) /*luxon: Monday = 1 ... Sunday = 7, so Sunday % 7 = 0*/
}

/**
 * Short label for a week, e.g. "Jul 12 - Jul 18, 2026".
 * @param weekStart The Sunday that starts the week
 */
function weekRange(weekStart) {
    const weekEnd = weekStart.plus({days: 6})
    return `${weekStart.toFormat("LLL d")} - ${weekEnd.toFormat("LLL d, yyyy")}`
}

/**
 * Pulls the first paragraph of the "## Objective" section out of an entry's markdown, for the weekly summary.
 * @param content The entry's markdown body
 * @returns The objective text, or an empty string if the entry has no Objective section
 */
function objectiveOf(content = "") {
    const match = content.match(/##\s*Objective\s*\n+([\s\S]*?)(?=\n##\s|$)/i)
    return match ? match[1].trim().split(/\n\s*\n/)[0] : ""
}

/**
 * Groups entries by day so each day cell is a lookup.
 * @param experiments The notebook entries
 * @returns An object like {"2026-07-14": [entry, ...]} (an entry with several dates appears under each)
 */
function groupByDay(experiments) {
    const byDay = {}
    experiments.forEach((experiment) => {
        if (!Array.isArray(experiment.dates)) return
        experiment.dates.forEach((date) => {
            const day = DateTime.fromJSDate(date, UTC).toISODate()
            byDay[day] = [...(byDay[day] ?? []), experiment]
        })
    })
    return byDay
}

/**
 * The list of weeks (each as its Sunday) the timeline can show: from the week of the earliest entry
 * to the later of the latest entry's week and the current week.
 * @param entriesByDay The result of groupByDay
 */
function listWeeks(entriesByDay) {
    const days = Object.keys(entriesByDay).sort()
    const thisWeek = startOfWeek(DateTime.utc())
    if (days.length === 0) return [thisWeek]
    const lastEntryWeek = startOfWeek(DateTime.fromISO(days[days.length - 1], UTC))
    const last = lastEntryWeek > thisWeek ? lastEntryWeek : thisWeek
    const weeks = []
    for (let week = startOfWeek(DateTime.fromISO(days[0], UTC)); week <= last; week = week.plus({weeks: 1})) {
        weeks.push(week)
    }
    return weeks
}

/**
 * The notebook's weekly timeline: seven day columns (Sunday to Saturday) for one week at a time, with arrows and a menu
 * to change week, and a button that shows a summary of everything done that week.
 *
 * The weeks come from the entries themselves: from the week of the earliest entry to the later of the latest entry's week
 * and the current week, so the timeline grows on its own as new entries are added. Entries with no dates are not shown here
 * (they still appear in the Experiments dropdowns). Colors, dots and the category list match the old calendar.
 *
 * @param experiments The notebook entries from Notebook.jsx (front-matter fields plus `content`)
 * @param setActiveExperimentId Called with an entry id to open that entry in the Experiments section below
 */
export default function NotebookTimeline({experiments, setActiveExperimentId}) {
    const entriesByDay = useMemo(() => groupByDay(experiments), [experiments])
    const weeks = useMemo(() => listWeeks(entriesByDay), [entriesByDay])

    /*Open on the most recent week that has entries*/
    const [weekIndex, setWeekIndex] = useState(() => {
        for (let index = weeks.length - 1; index >= 0; index--) {
            const hasEntries = [...Array(7).keys()].some((offset) => entriesByDay[weeks[index].plus({days: offset}).toISODate()])
            if (hasEntries) return index
        }
        return 0
    })
    const [showSummary, setShowSummary] = useState(false)

    const weekStart = weeks[weekIndex]
    const todayISO = DateTime.utc().toISODate()
    const days = [...Array(7).keys()].map((offset) => {
        const date = weekStart.plus({days: offset})
        return {date, iso: date.toISODate(), entries: entriesByDay[date.toISODate()] ?? []}
    })
    /*Each entry once for the summary, even if it spans several days of the week*/
    const weekEntries = [...new Map(days.flatMap((day) => day.entries).map((entry) => [entry.id, entry])).values()]
    const activeDays = days.filter((day) => day.entries.length > 0).length

    /*Same trick as the old calendar: clear, then set, so clicking the same entry again re-scrolls to it*/
    const openEntry = (id) => {
        setActiveExperimentId(null)
        setTimeout(() => setActiveExperimentId(id), 0)
    }

    return (
        <div className = {styles.timeline}>
            <div className = {styles.header}>
                <button
                    type = "button"
                    className = {styles.navButton}
                    onClick = {() => setWeekIndex(weekIndex - 1)}
                    disabled = {weekIndex === 0}
                    aria-label = "Previous week"
                >
                    &lt;
                </button>
                <div className = {styles.headerCenter}>
                    <h2 className = {styles.weekTitle}>{weekRange(weekStart)}</h2>
                    <select
                        className = {styles.weekSelect}
                        value = {weekIndex}
                        onChange = {(event) => setWeekIndex(Number(event.target.value))}
                        aria-label = "Choose a week"
                    >
                        {weeks.map((week, index) => (
                            <option key = {week.toISODate()} value = {index}>
                                Week {index + 1}: {weekRange(week)}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type = "button"
                    className = {styles.navButton}
                    onClick = {() => setWeekIndex(weekIndex + 1)}
                    disabled = {weekIndex === weeks.length - 1}
                    aria-label = "Next week"
                >
                    &gt;
                </button>
            </div>

            <div className = {styles.days}>
                {days.map((day) => (
                    <div
                        key = {day.iso}
                        className = {`${styles.day} ${day.iso === todayISO ? styles.today : ""}`}
                    >
                        <div className = {styles.dayHeader}>
                            <span className = {styles.weekday}>{WEEKDAYS[day.date.weekday % 7]}</span>
                            <span className = {styles.dayNumber}>{day.date.toFormat("LLL d")}</span>
                        </div>
                        <div className = {styles.experimentList}>
                            {day.entries.length === 0 && <span className = {styles.empty}>No entries</span>}
                            {day.entries.map((experiment) => (
                                <button
                                    key = {`${experiment.id}-${day.iso}`}
                                    type = "button"
                                    className = {styles.experimentLink}
                                    onClick = {() => openEntry(experiment.id)}
                                >
                                    <CategoryDot color = {categoryOf(experiment)?.color ?? "var(--text)"} />
                                    <span>{experiment.caption}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className = {styles.summaryBar}>
                <button
                    type = "button"
                    className = {styles.summaryButton}
                    aria-expanded = {showSummary}
                    onClick = {() => setShowSummary(!showSummary)}
                >
                    {showSummary ? "Hide" : "View"} weekly summary
                </button>
            </div>

            {showSummary && (
                <div className = {styles.summary} aria-live = "polite">
                    <h3 className = {styles.summaryTitle}>Week {weekIndex + 1} summary ({weekRange(weekStart)})</h3>
                    {weekEntries.length === 0 ? (
                        <p className = {styles.summaryEmpty}>No experiments were logged this week.</p>
                    ) : (
                        <>
                            <p className = {styles.summaryCount}>
                                {weekEntries.length} {weekEntries.length === 1 ? "entry" : "entries"} across {activeDays} {activeDays === 1 ? "day" : "days"}.
                            </p>
                            <ul className = {styles.summaryList}>
                                {weekEntries.map((experiment) => (
                                    <li key = {experiment.id} className = {styles.summaryItem}>
                                        <button type = "button" className = {styles.summaryLink} onClick = {() => openEntry(experiment.id)}>
                                            <CategoryDot color = {categoryOf(experiment)?.color ?? "var(--text)"} />
                                            {experiment.title}
                                        </button>
                                        <span className = {styles.summaryMeta}>
                                            {experiment.dates.map((date) => DateTime.fromJSDate(date, UTC).toFormat("LLL d")).join(", ")}
                                            {experiment.researchers?.length > 0 && ` · ${experiment.researchers.join(", ")}`}
                                        </span>
                                        {objectiveOf(experiment.content) && <p className = {styles.summaryObjective}>{objectiveOf(experiment.content)}</p>}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
