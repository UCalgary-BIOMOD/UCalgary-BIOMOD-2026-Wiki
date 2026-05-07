import styles from "./PageLayout.module.css"
import {useEffect, useState, useRef} from "react"
import Footer from "./Footer"

/**
 * This is the function that builds up the side navigation bar for each page based on the sections.
 * It also spawns an indicator line (an svg) that tracks which sections are being looked at
 * @param sections The sections defined and present on the page
 * @param activeIds The sections that are currently contained in the viewport (see IntersectionObserver below)
 * @param pageRef The reference to the lowest level div of the page
 * @returns The side navigation bar with the svg indicator, based on the sections of each page.
 */
function SideNav({sections, activeIds, pageRef}) { //https://codepen.io/agrimsrud/pen/XWNLMeW
    /**
     * There are a bunch of refs needed.
     * We need a reference to the path objects within the svg
     * We need a list of itemRefs, which are all of the <li> objects in the side nav
     * We need itemDataRef which helps us store the paths associated with each <li> as we iterate
     * We need lastPathRef to store the final svg path, after all active sections are considered
     */
    
    const pathRef = useRef(null) 
    const itemRefs = useRef({})
    const itemDataRef = useRef({})
    const lastPathRef = useRef({ start: null, end: null })
    
    /**
     * This function serves to iterate over the list of <li> anchors and create a list of svg commands that defines the path
     * It also will link together all svg paths with the associated <li> in itemDataRef
     */
    function drawPath() {
        
        const svg = pathRef.current /*Obtain svg object from its path*/
        if (!svg) return
        const navPath = svg.querySelector("path") /*Obtain the path from the ref*/
        if (!navPath) return
        let path = [] /*Remember, this is a list of svg commands*/
        let pathIndent /*This is used to determine if two links have the same x-position (vertically aligned or not)*/

        sections.forEach((section, i) => {
            /*Obtain the link object from the ref*/
            const anchor = itemRefs.current[section.id]
            if (!anchor) return

            /*Get the rectangle around both the link and the svg*/
            const rect = anchor.getBoundingClientRect()
            const svgRect = svg.getBoundingClientRect()

            /*Obtain x and y coordinates of the top left corner of each link, with respect to the svg positioning too*/
            const x = rect.left - svgRect.left - 5 
            const y = rect.top - svgRect.top 
            const height = rect.height /*Get the height of the link*/
            /*Edge case: First interation has to set a point, and put a line straight down*/
            if (i === 0) {
                path.push(`M`, x, y, `L`, x, y + height)
                itemDataRef.current[section.id] = {pathStart: 0}
            } else {
                /*If there is not an alignment on the x-coordinate, then you must draw a horizontal*/
                if (pathIndent !== x) {
                    path.push(`L`, pathIndent, y)
                }
                path.push(`L`, x, y) /*Draw the line to the next coordinate*/

                navPath.setAttribute(`d`, path.join(' ')) /*Combines all of the path commands into one attribute "d"*/
                
                path.push(`L`, x, y + height) /*Push down the length of the new <li> object*/
                const pathStart = navPath.getTotalLength() || 0
                itemDataRef.current[section.id] = {pathStart} /*This will assign the pathStart to the itemdataref for use later*/
            }
            pathIndent = x /*set the new pathIndent as the current x-coord*/
            navPath.setAttribute(`d`, path.join(' '))
            const pathEnd = navPath.getTotalLength() 
            /*Add in pathEnd to the dataref*/
            itemDataRef.current[section.id] = {
                ...itemDataRef.current[section.id], pathEnd
            } 
            
            /*console.log("PATH:", path.join(" "))*/
        })
        /*Set the styling of the navPath. Important to have opacity 0 to make it not visible until sync*/
        const length = navPath.getTotalLength()
        navPath.style.strokeDashArray = `${length}`
        navPath.style.strokeDashOffset = `${length}`
        navPath.style.opacity = 0
    }

    function syncPath() {
        const svg = pathRef.current
        if (!svg) return

        const navPath = svg.querySelector("path")
        if (!navPath) return

        const itemData = itemDataRef.current
        const pathLength = navPath.getTotalLength()

        let pathStart = pathLength
        let pathEnd = 0

        let someActive = false
        /*Sort through all of the active ids  to find the start and the end*/
        Object.entries(itemData).forEach(([id, data]) => {
            if (activeIds.has(id)) {
                someActive = true
                pathStart = Math.min(data.pathStart, pathStart)
                pathEnd = Math.max(data.pathEnd, pathEnd)
            }
        })
        /*If there are active parts of the svg, make them visible*/
        if (someActive && pathStart < pathEnd) {
            const dashArray = `1 ${pathStart} ${pathEnd - pathStart} ${pathLength}`

            navPath.style.setProperty("stroke-dashoffset", "1")
            navPath.style.setProperty("stroke-dasharray", dashArray)
            navPath.style.setProperty("opacity", 1)
        }
        /*cache last path for next update*/
        const { start: lastStart, end: lastEnd } = lastPathRef.current

        if (pathStart !== lastStart || pathEnd !== lastEnd) {
            // update path
            lastPathRef.current = { start: pathStart, end: pathEnd }
        }
    }
    /*Request draw*/
    useEffect(() => {
        const id = requestAnimationFrame(() => {
            
            drawPath()
            syncPath()
            
            
        })
        return () => cancelAnimationFrame(id)
    }, [sections])
   
    /*Request redraw*/
    useEffect(() => {
        syncPath()
    }, [activeIds])

    return (
        <nav className = {styles.sideNav}>
            <svg xmlns="http://www.w3.org/2000/svg" ref = {pathRef}>
                <path />
            </svg>
            <ul>
                {sections.map((section) => ( //https://sentry.io/answers/react-for-loops/
                    <li key={section.id}>
                        <a 
                        href={`#${section.id}`}
                        ref = {(element) => (itemRefs.current[section.id] = element)}
                        >
                        {section.title}
                        </a> 
                        
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default function PageLayout({sections}) {
    const [activeIds, setActiveIds] = useState(new Set())
    
    const pageRef = useRef(null)
    useEffect(() => {
        /*Edit to change IntersectionObserver settings*/
        const options = {
            root: null,
            rootMargin: "0px 0px -20% 0px",
            threshold: 0.01
        }
        /*Upon a change of observed sections, create a set of sections that are active (in view)*/
        const callback = (entries) => {
            setActiveIds((prev) => {
                const newSet = new Set(prev)
                entries.forEach((entry) => {
                    const id = entry.target.id
                    if (entry.isIntersecting) {
                        newSet.add(id)
                    } else {
                        newSet.delete(id)
                    }
                })
                return newSet
            })
        }
        /*init, add all to sectionelements, and observe all <sections></sections>*/
        /*Comment this block to turn off indicator system*/
        
        const observer = new IntersectionObserver(callback,options)
        const sectionElements = pageRef.current?.querySelectorAll("section") || []
        sectionElements.forEach((element) => observer.observe(element))
        return () => observer.disconnect()
        
        
        }, [])
        
    
    
    
       


    return (
        <div className = {styles.pageLayout} ref = {pageRef} > 
            <div className = {styles.mainContent}>
                <SideNav sections = {sections} activeIds = {activeIds} pageRef = {pageRef}></SideNav>
                <main className = {styles.page} >
                    
                    {sections.map(section => (
                        <section key={section.id} id = {section.id}>
                            {section.render()}
                        </section>
                    ))}
                    
                </main>
            </div>
            <Footer/>
        </div>
    )
}