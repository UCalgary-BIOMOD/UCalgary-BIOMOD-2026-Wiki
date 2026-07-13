import {Link, NavLink, useLocation} from "react-router-dom"
import styles from "./NavBar.module.css"
import LinkWrapper from "./LinkComponents"

import {useEffect, useState} from "react";
/**
 * This is the partial used for the top navigation bar.
 * @returns The top navigation bar partial
 */
export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false) /*Set a state for the dropdown (replicate this for multiple drop downs)*/
    const location = useLocation() /*Returns the current page location in the react router*/
    useEffect(() => {
        setIsOpen(false)
    }, [location.pathname]) /*Simply runs setIsOpen(false) when the location path name changs AKA user navigated to new page*/
    return (
        <nav className={styles.nav}>
            <LinkWrapper to="/">
                <img src = "/images/aptonix-logo-transparent.png" alt="Logo" style={{maxWidth: "120px", height: "auto", objectFit: "cover", paddingTop: "5%"}}></img>
            </LinkWrapper>
            <h2 className = {styles.h2}>UCalgary BIOMOD 2026</h2>
            <ul className = {styles.ul}>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li className = {styles.dropdown}>
                    <button className = {styles.dropdownTrigger} onClick={() => setIsOpen(!isOpen)}>
                        Project
                    </button>
                    
                    <ul className = {`${styles.dropdownMenu} ${isOpen ? styles.showMenu : ""}`}>
                        <li>
                            <NavLink to= "/project" onClick={() => setIsOpen(!isOpen)}>Abstract</NavLink>
                        </li>
                        <li>
                            <NavLink to="/test" onClick={() => setIsOpen(!isOpen)}>Test</NavLink>
                        </li>
                        <li>
                            <NavLink to="/description" onClick={() => setIsOpen(!isOpen)}>Description</NavLink>
                        </li>
                        <li>
                            <NavLink to="/modelling" onClick={() => setIsOpen(!isOpen)}>Modelling</NavLink>
                        </li>
                        <li>
                            <NavLink to="/experiments" onClick={() => setIsOpen(!isOpen)}>Experiments</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/notebook">Notebook</NavLink>
                </li>
                <li>
                    <NavLink to="/elsi">ELSI</NavLink>
                </li>
                <li>
                    <NavLink to="/team">Team</NavLink>
                </li>
            </ul>
        </nav>
    )
}

