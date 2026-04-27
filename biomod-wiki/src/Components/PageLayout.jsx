import styles from "./PageLayout.module.css"
function SideNav({sections}) {
    return (
        <nav className = {styles.sideNav}>
            <ul>
                {sections.map((section) => ( //https://sentry.io/answers/react-for-loops/
                    <li key={section.id}>
                        <a href={`#${section.id}`}>{section.title}</a> 
                        
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default function PageLayout({sections}) {
    return (
        <div>
            <SideNav sections = {sections}></SideNav>
            <main className = {styles.page}>
                {sections.map(section => (
                    <section key={section.id} id = {section.id}>
                        {section.render()}
                    </section>
                ))}
            </main>
        </div>
    )
}