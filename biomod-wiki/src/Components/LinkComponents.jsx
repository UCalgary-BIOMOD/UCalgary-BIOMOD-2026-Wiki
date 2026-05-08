import {Link} from "react-router-dom"
import styles from "./LinkComponents.module.css"

/**
 * The LinkWrapper function allows for children to be wrapped in a link to redirect elsewhere on the site.
 * @param to The internal address or external URL
 * @param children The children to which the wrapper will be applied.
 * @returns The wrapped child(ren).
 */
export default function LinkWrapper({to, children}) {
    return (
        <Link to={to} className={styles.LinkWrapper}>
            {children}
        </Link>
    )
}