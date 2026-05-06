import styles from "./PageLayout.module.css"
import {useEffect, useState, useRef} from "react"
import {motion,  useScroll, useTransform} from "framer-motion"
function SideNav({sections, activeIds, scrollYProgress}) {
    const colorChange = useTransform(
            scrollYProgress,
            [0, 1],
            ["#27F535","#27B7F5" ]
        )
    return (
        <nav className = {styles.sideNav}>
            <motion.div style = {{
                width:200,
                height:200,
                border: "2px solid red",
                backgroundColor: colorChange, 
            }}/>
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
    
    const scrollRef = useRef(null)
    const { scrollYProgress } = useScroll({
        container: scrollRef
    })
    
       


    return (
        <div className = {styles.pageLayout} ref = {scrollRef} > 
            
            <SideNav sections = {sections} activeIds = {activeIds} scrollYProgress ={scrollYProgress}></SideNav>

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