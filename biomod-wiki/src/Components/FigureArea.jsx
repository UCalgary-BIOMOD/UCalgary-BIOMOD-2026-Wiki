import styles from "./FigureArea.module.css"

/**
 * FigureArea component to display figures and tables with a caption.
 * @param {*} props - The properties passed to the component.
 * @param {number} props.number - The figure or table number.
 * @param {string} [props.caption] - The caption for the figure or table.
 * @param {React.ReactNode} props.children - The content of the figure or table.
 * @param {string} [props.className] - Additional class name for styling.
 * @param {string} [props.type] - The type of content, either "Figure" or "Table". Default is "Figure".
 * @returns 
 */

export default function FigureArea({
    number,
    caption = "CAPTION",
    children,
    className = "",
    type = "Figure",
    naturalHeight = false
}) {
    const isTable = type === "Table"

    const captionElement = (
        <figcaption className={styles.caption}>
            <strong>{type} {number}.</strong> {caption}
        </figcaption>
    )

    return (
        <figure className={`${styles.figure} ${className}`}>
            {isTable && captionElement}

            <div
                className={`${styles.window} ${
                    isTable
                        ? styles.tableWindow
                        : naturalHeight
                            ? styles.naturalWindow
                            : ""
                }`}
            >
                {children}
            </div>

            {!isTable && captionElement}
        </figure>
    )
}
