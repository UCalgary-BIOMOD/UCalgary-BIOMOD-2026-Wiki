
import styles from "./ViewportSection.module.css"


export default function ViewportSection({ children, ...props}, ref) {
  return (
    <div className={styles.viewport} {...props} ref = {ref}>
      {children}
    </div>
  );
}