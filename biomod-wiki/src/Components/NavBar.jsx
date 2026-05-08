import {Link, NavLink} from "react-router-dom"
import styles from "./NavBar.module.css"
import LinkWrapper from "./LinkComponents"
import logo from "@/assets/aptonix-logo.png"
/**
 * This is the partial used for the top navigation bar.
 * @returns The top navigation bar partial
 */
export default function NavBar() {
    return (
        <nav className={styles.nav}>
            <LinkWrapper to="/">
                <img src = {logo} alt="Logo" style={{maxWidth: "120px", height: "auto", objectFit: "cover"}}></img>
            </LinkWrapper>
            <h2 className = {styles.h2}>UCalgary BIOMOD 2026</h2>
            <ul className = {styles.ul}>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/test">Test</NavLink>
                </li>
                
            </ul>
        </nav>
    )
}

