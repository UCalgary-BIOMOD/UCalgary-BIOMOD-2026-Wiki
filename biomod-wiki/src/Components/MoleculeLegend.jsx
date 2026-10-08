import { useState } from "react"
import styles from "./MoleculeLegend.module.css"

const ITEMS = [
    {
        id: "dendrimer",
        label: "Dendrimer",
        color: "var(--dendrimer)",
        description: "The scaffold holding the DNA active assembly together as a unit."
    },
    {
        id: "tmsd",
        label: "TMSD",
        color: "var(--tmsd)",
        description: "The Toe-hold Mediated Strand Displacement mechanism that allows for the interchange of aptamer."
    },
    {
        id: "aptamer",
        label: "Aptamer",
        color: "var(--aptamer)",
        description: "The interchangeable target specific bio-receptor site."
    },
    {
        id: "methylene-blue",
        label: "Methylene Blue",
        color: "var(--methylene-blue)",
        description: "The electrochemical signaling molecule that indicates the presence of the biomarker."
    },
    {
        id: "biomarker",
        label: "Biomarker",
        color: "var(--biomarker)",
        description: "The target molecule the biosensor is aimed to detect. For example Aβ42 for the detection of AD."
    }
]

export default function MoleculeLegend({ externalActiveId = null, onActiveChange }) {
    const [hoverIndex, setHoverIndex] = useState(null)

    const externalIndex = externalActiveId
        ? ITEMS.findIndex(item => item.id === externalActiveId)
        : -1
    const resolvedExternalIndex = externalIndex === -1 ? null : externalIndex

    // Legend hover takes priority over the component selected in the viewer.
    const activeIndex =
        hoverIndex !== null ? hoverIndex :
        resolvedExternalIndex

    const showAll = activeIndex === null

    return (
        <div className={styles.legend}>
            <div className={styles.grid}>
                {ITEMS.map((item, index) => {
                    const visible = showAll || activeIndex === index
                    return (
                        <div
                            key={item.id}
                            className={styles.column}
                            onMouseEnter={() => {
                                setHoverIndex(index)
                                onActiveChange?.(item.id)
                            }}
                            onMouseLeave={() => {
                                setHoverIndex(null)
                                onActiveChange?.(null)
                            }}
                        >
                            <button
                                type="button"
                                className={`${styles.item} ${showAll || visible ? styles.active : styles.faded}`}
                            >
                                <span
                                    className={styles.dot}
                                    style={{ backgroundColor: item.color }}
                                />
                                <span
                                    className={styles.label}
                                    style={{ color: item.color }}
                                >
                                    {item.label}
                                </span>
                            </button>

                            <p
                                className={styles.description}
                                style={{
                                    color: item.color,
                                    visibility: visible ? "visible" : "hidden"
                                }}
                            >
                                {item.description}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}