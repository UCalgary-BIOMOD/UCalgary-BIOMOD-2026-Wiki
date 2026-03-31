import React from "react"
import {Link} from "react-router-dom"


export default function NavBar() {
    return (
        <nav>
            <h2>UCalgary BIOMOD 2026</h2>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/test">Test</Link></li>
                
            </ul>
        </nav>
    )
}

