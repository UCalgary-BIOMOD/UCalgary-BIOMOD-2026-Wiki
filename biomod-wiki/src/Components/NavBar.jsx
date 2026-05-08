import {Link, NavLink, useLocation} from "react-router-dom"
import styles from "./NavBar.module.css"
import LinkWrapper from "./LinkComponents"
import logo from "@/assets/aptonix-logo.png"
import {useEffect, useState} from "react";
/**
 * This is the partial used for the top navigation bar.
 * @returns The top navigation bar partial
 */
export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    useEffect(() => {
        setIsOpen(false)
    }, [location.pathname])
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
                <li className = {styles.dropdown}>
                    <button className = {styles.dropdownTrigger} onClick={() => setIsOpen(!isOpen)}>
                        Menu
                    </button>
                    
                    <ul className = {`${styles.dropdownMenu} ${isOpen ? styles.showMenu : ""}`}>
                        <li>
                            <NavLink to="/test" onClick={() => setIsOpen(!isOpen)}>Test</NavLink>
                        </li>
                    </ul>
                </li>
                
            </ul>
        </nav>
    )
}

