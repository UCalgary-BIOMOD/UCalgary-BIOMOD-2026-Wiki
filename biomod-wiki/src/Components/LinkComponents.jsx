import {Link} from "react-router-dom"
import styles from "./LinkComponents.module.css"

/**
 * The LinkWrapper function allows for children to be wrapped in a link to redirect elsewhere on the site.
 * @param to The link address to be linked to; does NOT apply to hyperlink, only internal navigation
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