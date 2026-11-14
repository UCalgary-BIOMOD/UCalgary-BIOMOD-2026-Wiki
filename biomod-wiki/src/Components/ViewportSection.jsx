
import styles from "./ViewportSection.module.css"

/**
 * The standard full-width block that pages are built from. Stacks its children vertically.
 * @param center If true, children are centered horizontally and vertically (replaces inline flex styles)
 * @param className Optional extra class
 * Any other prop (style, ref, ...) is forwarded to the div.
 */
export default function ViewportSection({ children, className = "", center = false, ...props}) {
  return (
    <div className={`${styles.viewport} ${center ? styles.center : ""} ${className}`} {...props}>
      {children}
    </div>
  );
}
