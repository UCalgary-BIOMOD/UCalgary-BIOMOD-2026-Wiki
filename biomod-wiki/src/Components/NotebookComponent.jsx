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

export default function NotebookComponent() {
    const [monthOffset, setMonthOffset] = useState(0)
    const date = useMemo(
        () => DateTime.local().startOf("month").minus({months:monthOffset}),
        [monthOffset]
    )
    const today = useMemo(
        () => DateTime.local().startOf("day").minus({days: 0}),
        []
    )
    const month = useMemo(() => {
        const monthIndex = date.month - 1
        const startingIndex = date.weekday % 7
        const daysInMonth = date.daysInMonth
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
    }, [date])
    return (

    <div className = {styles.calendar}>
        <div className = {styles.monthHeader}>
            <button className={`${styles["nav-button"]} ${styles.left}`} onClick={() => setMonthOffset((m) => m + 1)}>&lt;</button>
            <h2>{names[date.month - 1]} {date.year}</h2>
            <button className={`${styles["nav-button"]} ${styles.right}`} onClick={() => setMonthOffset((m) => m - 1)}>&gt;</button>
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
                                date.month === today.month &&
                                date.year === today.year;
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