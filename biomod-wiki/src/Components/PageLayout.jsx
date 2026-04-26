
function SideNav({sections}) {
    return (
        <nav className = "side-nav">
            <ul>
                {sections.map((section) => ( //https://sentry.io/answers/react-for-loops/
                    <li key={section.id}>
                        <a href={`#${section.id}`}>{section.title}<a> //https://stackoverflow.com/questions/4855168/what-is-href-and-why-is-it-used
                        
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
            <main>
                {sections.map(section => (
                    <section key={section.id} id = {section.id}>
                        {section.render()}
                    </section>
                ))}
            </main>
        </div>
    )
}