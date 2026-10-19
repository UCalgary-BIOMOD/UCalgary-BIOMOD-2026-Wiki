import ReactMarkdown from "react-markdown"
import styles from "./LabEntry.module.css"

const INLINE_FIELDS = [
    ["title", "Title of Lab"],
    ["purpose", "Purpose/Objective of Lab"],
    ["partners", "Partner(s)"],
    ["lastEdited", "Last Edited (yyyy/mm/dd)"],
]

const LONG_FIELDS = [
    ["materials", "Materials"],
    ["procedure", "Procedure"],
    ["notes", "Notes/Observations"],
    ["results", "Results"],
    ["calculations", "Sample Calculations"],
    ["supplementary", "Supplementary Information"],
]

/**
 * The standard lab-entry template: short fields on one line each, then the long fields (markdown) as labelled blocks.
 * Fields that are not passed are still shown (blank), so an unfilled entry reads as the empty template.
 * @param entry An object with any of: title, purpose, partners, lastEdited, materials, procedure, notes, results, calculations, supplementary
 */
export default function LabEntry({entry = {}}) {
    return (
        <div className = {styles.entry}>
            {INLINE_FIELDS.filter(([key]) => key !== "partners" || entry.partners).map(([key, label]) => (
                <p key = {key} className = {styles.field}>
                    <strong>{label}:</strong> {entry[key]}
                </p>
            ))}
            {LONG_FIELDS.map(([key, label]) => (
                <div key = {key} className = {styles.field}>
                    <strong>{label}:</strong>
                    {entry[key] && (
                        <div className = {styles.markdown}>
                            <ReactMarkdown>{entry[key]}</ReactMarkdown>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
