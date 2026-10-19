import styles from "./FigureArea.module.css"

/**
 * A framed window for a figure (image, viewer, embed...) with a numbered caption bar underneath.
 * With no children it renders an empty placeholder window, so the spot can be reserved before the figure exists.
 * @param number The figure number shown in the caption ("Figure 1.")
 * @param caption The caption text
 * @param children The figure content, placed inside the window
 * @param className Optional extra class
 */
export default function FigureArea({number, caption = "CAPTION", children, className = ""}) {
    return (
        <figure className = {`${styles.figure} ${className}`}>
            <div className = {styles.window}>{children}</div>
            <figcaption className = {styles.caption}>
                <strong>Figure {number}.</strong> {caption}
            </figcaption>
        </figure>
    )
}
