import styles from "./References.module.css"
/*Assuming only one URL, you can place more plaintext after the URL here. Use "extra:"*/

export default function References({references}) {
    if(!references || references.length === 0) {
        return null
    }

    return (
        <ul className = {styles.referenceList}>
            {references.map((ref, index) => (
                <li key={index} className = {styles.reference}>
                    <span>[{index + 1}] </span>
                    <span dangerouslySetInnerHTML={{ __html: ref.text }}></span>

                    <a
                        href={ref.url}
                        target = "_blank"
                        rel="noopener noreferrer"
                    >
                        {ref.label || ref.url}
                    </a>
                    
                    <span>{ref.extra}</span>
                </li>
            ))}
        </ul>
    )
}