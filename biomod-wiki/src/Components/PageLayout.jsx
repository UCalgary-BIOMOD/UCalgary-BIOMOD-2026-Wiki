import styles from "./PageLayout.module.css"
import {useEffect, useState} from "react"
function SideNav({sections, activeIds}) {
    return (
        <nav className = {styles.sideNav}>
            <ul>
                {sections.map((section) => ( //https://sentry.io/answers/react-for-loops/
                    <li key={section.id}>
                        <a 
                        href={`#${section.id}`}
                        className = {activeIds.has(section.id) ? styles.active: ""}
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
        const sectionElements = document.querySelectorAll("section")
        sectionElements.forEach((element) => observer.observe(element))
        return () => observer.disconnect()
        }, [])
    



    return (
        <div className = {styles.pageLayout}> 
            <SideNav sections = {sections} activeIds = {activeIds}></SideNav>
            <main className = {styles.page}>
                {sections.map(section => (
                    <section key={section.id} id = {section.id} style ={{border: "2px solid red"}}>
                        {section.render()}
                    </section>
                ))}
            </main>
        </div>
    )
}