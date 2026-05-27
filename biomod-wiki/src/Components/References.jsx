import styles from "./References.module.css"


export default function References({references}) {
    if(!references || references.length === 0) {
        return null
    }

    return (
        <ul className = {styles.referenceList}>
            {references.map((ref, index) => (
                <li key={index} className = {styles.reference}>
                    <span>[{index + 1}] </span>
                    <span>{ref.text} </span>

                    <a
                        href={ref.url}
                        target = "_blank"
                        rel="noopener noreferrer"
                    >
                        {ref.label || ref.url}
                    </a>
                </li>
            ))}
        </ul>
    )
}