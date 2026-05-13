import {DateTime} from "luxon"
import {Fragment, useMemo, useState} from "react"
import styles from "./NotebookComponent.module.css"

const names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

const MIN_MONTH = DateTime.fromObject({year: 2026, month: 5}).startOf("month")
const MAX_MONTH = DateTime.fromObject({year: 2026, month:9}).startOf("month")

export default function NotebookComponent() {
    const [currentMonth, setCurrentMonth] = useState(MIN_MONTH)
    
    const today = useMemo(
        () => DateTime.local().startOf("day").minus({days: 0}),
        []
    )
    const month = useMemo(() => {
        const monthIndex = currentMonth.month - 1
        const startingIndex = currentMonth.weekday % 7
        const daysInMonth = currentMonth.daysInMonth
        const res = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
        ]

        let usedDaysThisWeek = startingIndex
        let weeksUsed = 0
        let day = 1
        while (day <= daysInMonth) {
            res[weeksUsed][usedDaysThisWeek] = day
            day += 1
            if (usedDaysThisWeek === 6) {
                usedDaysThisWeek = 0
                weeksUsed += 1
            } else {
                usedDaysThisWeek += 1
            }
        }
        return res
    }, [currentMonth])
    return (

    <div className = {styles.calendar}>
        <div className = {styles.monthHeader}>
            <button 
            className={`${styles["nav-button"]} ${styles.left}`} 
            onClick={() => {
                if (currentMonth > MIN_MONTH) {
                    setCurrentMonth(currentMonth.minus({ months: 1 }))
                }
            }}
            disabled = {!(currentMonth > MIN_MONTH)}
            >&lt;</button>
            <h2>{names[currentMonth.month - 1]} {currentMonth.year}</h2>
            

            <button 
            className={`${styles["nav-button"]} ${styles.right}`} 
            onClick={() => {
                if (currentMonth < MAX_MONTH) {
                    setCurrentMonth(currentMonth.plus({ months: 1 }))
                }
            }}
            disabled = {!(currentMonth < MAX_MONTH)}
            >&gt;</button>




        </div>
        <div className = {styles.dayHeader}>
            {days.map((day, _index) => {
                return (
                    <div key = {day}>{day}</div>
                )
            })}
        </div>
        <div className = {styles.dates}>
            {month.map((week, weekIndex) => {
                return week.every((x) => x === null) ? (
                    <Fragment key={JSON.stringify(week)} />
                ) : (
                    <div className = {styles.week} key={JSON.stringify(week)}>
                        {week.map((day, dayIndex) => {
                            const isToday =
                                day != null &&
                                day === today.day &&
                                currentMonth.month === today.month &&
                                currentMonth.year === today.year;
                            return (
                                <div
                                    className = {`${styles.day} ${isToday ? styles.today : ""}`}
                                    key={`${JSON.stringify(week)}-${day}-${dayIndex}`}
                                >
                                    {day && <span className = {styles.dayNumber}>{day}</span>}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    </div>
    );

}