import { DateTime } from "luxon"
import { useMemo, useState } from "react"
import {CategoryDot} from "./CategoryLegend.jsx"
import {categoryOf} from "./experimentCategories.js"
import styles from "./NotebookMobileComponent.module.css"

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

const MIN_MONTH = DateTime.fromObject({ year: 2026, month: 6 }).startOf("month")
const MAX_MONTH = DateTime.fromObject({ year: 2026, month: 11 }).startOf("month") /*Last month the calendar can show (November 2026)*/

// Build the list of valid year/month combinations between MIN_MONTH and MAX_MONTH,
// so the dropdowns never let someone pick a month outside your project's range.
function buildValidMonths() {
    const result = []
    let cursor = MIN_MONTH
    while (cursor <= MAX_MONTH) {
        result.push({ year: cursor.year, month: cursor.month })
        cursor = cursor.plus({ months: 1 })
    }
    return result
}
const VALID_MONTHS = buildValidMonths()

export default function NotebookMobileComponent({ experiments, setActiveExperimentId }) {
    const today = useMemo(() => DateTime.local().startOf("day"), [])
    const initialMonth = VALID_MONTHS.find(
        month => month.year === today.year && month.month === today.month
    ) ?? MIN_MONTH

    const [selectedYear, setSelectedYear] = useState(initialMonth.year)
    const [selectedMonth, setSelectedMonth] = useState(initialMonth.month)
    const [selectedDay, setSelectedDay] = useState(
        initialMonth.year === today.year && initialMonth.month === today.month
            ? today.day
            : 1
    )
    const [calendarMonth, setCalendarMonth] = useState(initialMonth)
    const [isDayPickerOpen, setIsDayPickerOpen] = useState(false)

    const daysInSelectedMonth = DateTime.fromObject({
        year: selectedYear,
        month: selectedMonth
    }).daysInMonth
    const daysInCalendarMonth = DateTime.fromObject({
        year: calendarMonth.year,
        month: calendarMonth.month
    }).daysInMonth
    const firstWeekdayOffset = DateTime.fromObject({
        year: calendarMonth.year,
        month: calendarMonth.month,
        day: 1
    }).weekday % 7

    const currentDate = DateTime.fromObject({
        year: selectedYear,
        month: selectedMonth,
        day: Math.min(selectedDay, daysInSelectedMonth)
    }).startOf("day")
    const calendarMonthIndex = VALID_MONTHS.findIndex(
        month => month.year === calendarMonth.year && month.month === calendarMonth.month
    )

    // Same matching logic as the desktop calendar, so both stay consistent
    const activeExperiments = experiments.filter((experiment) => {
        if (!Array.isArray(experiment.dates)) return false
        return experiment.dates.some((date) => {
            const activeDate = DateTime.fromJSDate(date, { zone: "UTC" })
            return currentDate.hasSame(activeDate, "day")
        })
    })

    const goToAdjacentMonth = (direction) => {
        const currentIndex = VALID_MONTHS.findIndex(
            m => m.year === calendarMonth.year && m.month === calendarMonth.month
        )
        const newIndex = currentIndex + direction
        if (newIndex < 0 || newIndex >= VALID_MONTHS.length) return

        const target = VALID_MONTHS[newIndex]
        setCalendarMonth(DateTime.fromObject({ year: target.year, month: target.month }).startOf("month"))
    }

    return (
        <div className={styles.mobileCalendar}>
            <p className={styles.instructions}>
                Click on the interactive calendar to find out what we did on that day
            </p>

            <div className={styles.controlsRow}>
                <button
                    type="button"
                    className={styles.dateButton}
                    aria-haspopup="dialog"
                    aria-expanded={isDayPickerOpen}
                    onClick={() => setIsDayPickerOpen((isOpen) => !isOpen)}
                >
                    {monthNames[selectedMonth - 1]} {Math.min(selectedDay, daysInSelectedMonth)}, {selectedYear}
                    <span aria-hidden="true">⌄</span>
                </button>
                {isDayPickerOpen && (
                    <div className={styles.calendarPopover} role="dialog" aria-label="Choose a date">
                        <div className={styles.calendarHeader}>
                            <button
                                type="button"
                                className={styles.monthArrow}
                                onClick={() => goToAdjacentMonth(-1)}
                                disabled={calendarMonthIndex <= 0}
                                aria-label="Previous month"
                            >
                                &lt;
                            </button>
                            <h3>{monthNames[calendarMonth.month - 1]} {calendarMonth.year}</h3>
                            <button
                                type="button"
                                className={styles.monthArrow}
                                onClick={() => goToAdjacentMonth(1)}
                                disabled={calendarMonthIndex >= VALID_MONTHS.length - 1}
                                aria-label="Next month"
                            >
                                &gt;
                            </button>
                        </div>
                        <div className={styles.weekdayLabels}>
                            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((weekday) => (
                                <span key={weekday}>{weekday}</span>
                            ))}
                        </div>
                        <div className={styles.dayGrid}>
                            {Array.from({ length: firstWeekdayOffset }, (_, index) => (
                                <span key={`blank-${index}`} />
                            ))}
                            {Array.from({ length: daysInCalendarMonth }, (_, index) => {
                                const day = index + 1
                                const isSelected =
                                    calendarMonth.year === selectedYear &&
                                    calendarMonth.month === selectedMonth &&
                                    day === Math.min(selectedDay, daysInSelectedMonth)
                                return (
                                    <button
                                        key={day}
                                        type="button"
                                        className={`${styles.dayCell} ${isSelected ? styles.selectedDay : ""}`}
                                        aria-pressed={isSelected}
                                        onClick={() => {
                                            setSelectedYear(calendarMonth.year)
                                            setSelectedMonth(calendarMonth.month)
                                            setSelectedDay(day)
                                            setIsDayPickerOpen(false)
                                        }}
                                    >
                                        {day}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.descriptionBox}>
                {activeExperiments.length === 0 ? (
                    <p className={styles.emptyState}>No experiment logged on this day.</p>
                ) : (
                    activeExperiments.map((experiment) => (
                        <div key={experiment.id} className={styles.experimentEntry}>
                            <h3 className={styles.experimentCaption}>
                                <CategoryDot color={categoryOf(experiment)?.color ?? "var(--text)"} /> {experiment.caption}
                            </h3>

                            {experiment.description ? (
                                <p className={styles.experimentDescription}>
                                    {experiment.description}
                                </p>
                            ) : (
                                <button
                                    type="button"
                                    className={styles.detailsButton}
                                    onClick={() => {
                                        setActiveExperimentId(null)
                                        setTimeout(() => setActiveExperimentId(experiment.id), 0)
                                    }}
                                >
                                    View details
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}