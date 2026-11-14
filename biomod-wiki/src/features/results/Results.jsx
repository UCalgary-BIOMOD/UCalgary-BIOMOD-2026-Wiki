
import {useRef, useState} from "react"
import PageLayout from "/src/Components/PageLayout.jsx"
import content from "./results-content.json"
import styles from "./Results.module.css"

export default function Results() {
    const [activeTab, setActiveTab] = useState(0)
    const tabRefs = useRef([])
    const activeGroup = content.tabs[activeTab]

    const handleTabKeyDown = (event) => {
        const keySteps = {ArrowRight: 1, ArrowLeft: -1}
        if (event.key === "Home" || event.key === "End") {
            const nextIndex = event.key === "Home" ? 0 : content.tabs.length - 1
            setActiveTab(nextIndex)
            tabRefs.current[nextIndex]?.focus()
            event.preventDefault()
            return
        }

        const step = keySteps[event.key]
        if (!step) return
        const nextIndex = (activeTab + step + content.tabs.length) % content.tabs.length
        setActiveTab(nextIndex)
        tabRefs.current[nextIndex]?.focus()
        event.preventDefault()
    }

    const sections = [
        {
            id: "results",
            title: "Results",
            render: () => (
                <>
                    <div className={styles.resultsPage}>
                        <div
                            className={styles.tabList}
                            role="tablist"
                            aria-label="Experiment results"
                            onKeyDown={handleTabKeyDown}
                        >
                            {content.tabs.map((tab, index) => (
                                <button
                                    key={tab.id}
                                    ref={(element) => { tabRefs.current[index] = element }}
                                    id={`results-tab-${tab.id}`}
                                    className={`${styles.tab} ${index === activeTab ? styles.activeTab : ""}`}
                                    type="button"
                                    role="tab"
                                    aria-selected={index === activeTab}
                                    aria-controls={`results-panel-${tab.id}`}
                                    tabIndex={index === activeTab ? 0 : -1}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {tab.title}
                                </button>
                            ))}
                        </div>
                        <div
                            id={`results-panel-${activeGroup.id}`}
                            className={styles.tabPanel}
                            role="tabpanel"
                            aria-labelledby={`results-tab-${activeGroup.id}`}
                            tabIndex={0}
                        >
                            <header className={styles.groupHeader}>
                                <span className={styles.groupIcon} aria-hidden="true">▤</span>
                                <div>
                                    <h2>{activeGroup.title}</h2>
                                    <p>{activeGroup.count}</p>
                                </div>
                            </header>
                            <div className={styles.figures}>
                                {activeGroup.figures.map((figure) => (
                                    <article className={styles.figure} key={figure.number}>
                                        <header className={styles.figureHeading}>
                                            <span className={styles.figureNumber}>{figure.number}</span>
                                            <div>
                                                <h3>Figure {figure.number} Analysis</h3>
                                                <time>{figure.date}</time>
                                            </div>
                                        </header>
                                        <div className={styles.figureImageWrap}>
                                            <img
                                                className={styles.figureImage}
                                                src={figure.image}
                                                alt={figure.imageAlt || `Gel image for Figure ${figure.number}${figure.laneLabels ? "; lanes numbered from right to left" : ""}`}
                                                loading={activeGroup.id === "aptamer" ? "eager" : "lazy"}
                                            />
                                            {figure.laneLabels && (
                                                <div className={styles.laneLabels} aria-hidden="true">
                                                    {figure.laneLabels.map((label) => <span key={label}>{label}</span>)}
                                                </div>
                                            )}
                                        </div>
                                        <p className={styles.caption}>
                                            <strong>Figure {figure.number}.</strong> {figure.caption}
                                        </p>
                                        {figure.lanes && (
                                            <details className={styles.lanes}>
                                                <summary>Lane contents</summary>
                                                <ul>
                                                    {figure.lanes.map((lane) => <li key={lane}>{lane}</li>)}
                                                </ul>
                                            </details>
                                        )}
                                        <p className={styles.analysis}>{figure.analysis}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    ]
    return <PageLayout sections={sections} bannerImgs={["./images/basic-banner.png"]} bannerHeight="50svh" caption="RESULTS" />
}