import {Link} from "react-router-dom"
import styles from "./LinkComponents.module.css"

export default function ClickWrapper({to, children}) {
    return (
        <Link to={to} className={styles.ClickWrapper}>
            {children}
        </Link>
    )
}