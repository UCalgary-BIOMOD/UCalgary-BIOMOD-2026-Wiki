import styles from "./SplitSection.module.css"

/**
 * A two-column row (text | visual, visual | text, etc.) that automatically stacks on narrow screens.
 * Use it instead of hand-writing flex rows with inline styles.
 *
 * Usage:
 *   <SplitSection>
 *       <SplitHalf text = "left"><h1>...</h1></SplitHalf>
 *       <SplitHalf><img src = "..." alt = "..."/></SplitHalf>
 *   </SplitSection>
 *
 * @param children The SplitHalf children (any number, they share the row equally)
 * @param className Optional extra class for the row
 */
export default function SplitSection({children, className = "", ...props}) {
    return (
        <div className = {`${styles.split} ${className}`} {...props}>
            {children}
        </div>
    )
}

/**
 * One equal-width column inside a SplitSection. Its content is centered both ways.
 * @param text Optional "left" | "right" alignment for text columns. On narrow screens it always centers.
 * @param stack If true, children are stacked vertically (heading above an image, etc.)
 * @param className Optional extra class
 * Any other prop (including ref) is forwarded to the div.
 */
export function SplitHalf({children, text, stack = false, className = "", ...props}) {
    const classes = [
        styles.half,
        text ? styles.text : "",
        text === "left" ? styles.textLeft : "",
        text === "right" ? styles.textRight : "",
        stack ? styles.stack : "",
        className,
    ].join(" ")

    return (
        <div className = {classes} {...props}>
            {children}
        </div>
    )
}
