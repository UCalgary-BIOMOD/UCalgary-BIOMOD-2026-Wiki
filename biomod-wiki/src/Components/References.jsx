import styles from "./References.module.css"
/*Assuming only one URL, you can place more plaintext after the URL here. Use "extra:"*/

/**
 * A numbered reference list. Renders nothing when there are no references.
 * Each reference is {text, url, label?, extra?}: `text` is HTML (so <em>italics</em> work) shown first, then a link to `url`
 * (labelled with `label`, or the URL itself), then optional plain `extra` text. Numbers [1], [2], ... follow the array order,
 * so keep the order the same as the in-text citations.
 * @param references The array of reference objects, normally content.references from a page's JSON
 */
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