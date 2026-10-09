
import styles from "./ViewportSection.module.css"


export default function ViewportSection({ children, className = "", ...props}, ref) {
  return (
    <div className={`${styles.viewport} ${className}`} {...props} ref = {ref}>
      {children}
    </div>
  );
}