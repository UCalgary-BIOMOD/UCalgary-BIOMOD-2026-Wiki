import styles from "./PageLayout.module.css"
import {useEffect, useState, useRef} from "react"
import {motion,  useScroll, useTransform} from "framer-motion"
function SideNav({sections, activeIds, pageRef}) { //https://codepen.io/agrimsrud/pen/XWNLMeW
    const pathRef = useRef(null)
    const itemRefs = useRef({})
    const itemDataRef = useRef({})
    const lastPathRef = useRef({ start: null, end: null })
    
    function drawPath() {
        
        const svg = pathRef.current
        if (!svg) return
        const navPath = svg.querySelector("path")
        if (!navPath) return
        let path = []
        let pathIndent

        sections.forEach((section, i) => {
            const anchor = itemRefs.current[section.id]
            if (!anchor) return

            const rect = anchor.getBoundingClientRect()
            const svgRect = svg.getBoundingClientRect()

            const x = rect.left - svgRect.left - 5
            const y = rect.top - svgRect.top
            const height = rect.height
            if (i === 0) {
                path.push(`M`, x, y, `L`, x, y + height)
                itemDataRef.current[section.id] = {pathStart: 0}
            } else {
                if (pathIndent !== x) {
                    path.push(`L`, pathIndent, y)
                }
                path.push(`L`, x, y)

                navPath.setAttribute(`d`, path.join(' '))
                const pathStart = navPath.getTotalLength() || 0
                path.push(`L`, x, y + height)
                itemDataRef.current[section.id] = {pathStart}   
            }
            pathIndent = x
            navPath.setAttribute(`d`, path.join(' '))
            const pathEnd = navPath.getTotalLength()
            itemDataRef.current[section.id] = {
                ...itemDataRef.current[section.id], pathEnd
            }
            console.log("PATH:", path.join(" "))
        })
        /** 
        const length = navPath.getTotalLength()
        navPath.style.strokeDashArray = `${length}`
        navPath.style.strokeDashOffset = `${length}`
        navPath.style.opacity = 1*/
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
        Object.entries(itemData).forEach(([id, data]) => {
            if (activeIds.has(id)) {
                someActive = true
                pathStart = Math.min(data.pathStart, pathStart)
                pathEnd = Math.max(data.pathEnd, pathEnd)
            }
        })
        
        if (someActive && pathStart < pathEnd) {
            const dashArray = `1 ${pathStart} ${pathEnd - pathStart} ${pathLength}`

            navPath.style.setProperty("stroke-dashoffset", "1")
            navPath.style.setProperty("stroke-dasharray", dashArray)
            navPath.style.setProperty("opacity", 1)
        }
        const { start: lastStart, end: lastEnd } = lastPathRef.current

        if (pathStart !== lastStart || pathEnd !== lastEnd) {
            // update path
            lastPathRef.current = { start: pathStart, end: pathEnd }
        }
    }
    useEffect(() => {
        const id = requestAnimationFrame(() => {
            drawPath()
            syncPath()
        })
        return () => cancelAnimationFrame(id)
    }, [sections])
   
        useEffect(() => {
        syncPath()
    }, [activeIds])
    return (
        <nav className = {styles.sideNav}>
            <svg xmlns="http://www.w3.org/2000/svg" ref = {pathRef}  >
                <path stroke="red" strokeWidth="2" fill="none" />
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
    const visibleClass = "visible"
    const pageRef = useRef(null)
    useEffect(() => {
        const options = {
            root: null,
            threshold: 0.1
        }
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
        
        const observer = new IntersectionObserver(callback,options)
        const sectionElements = pageRef.current?.querySelectorAll("section") || []
        sectionElements.forEach((element) => observer.observe(element))
        return () => observer.disconnect()
        }, [])
    
    
    
       


    return (
        <div className = {styles.pageLayout} ref = {pageRef} > 
            
            <SideNav sections = {sections} activeIds = {activeIds} pageRef = {pageRef}></SideNav>

            <main className = {styles.page} >
                {sections.map(section => (
                    <section key={section.id} id = {section.id} style ={{border: "2px solid red"}}>
                        {section.render()}
                    </section>
                ))}
            </main>
        </div>
    )
}