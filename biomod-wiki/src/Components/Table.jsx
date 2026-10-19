import styles from "./Table.module.css"

/**
 * A simple themed data table. Scrolls sideways on narrow screens instead of overflowing the page.
 * @param columns The column definitions: [{key: "name", label: "Name"}]
 * @param rows The row objects, keyed by column key: [{name: "Aptamer"}]
 * @param caption Optional caption shown above the table
 * @param className Optional extra class
 */
export default function Table({columns, rows = [], caption, className = ""}) {
    return (
        <div className = {`${styles.wrapper} ${className}`}>
            <table className = {styles.table}>
                {caption && <caption className = {styles.caption}>{caption}</caption>}
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key = {column.key} scope = "col">{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key = {rowIndex}>
                            {columns.map((column) => (
                                <td key = {column.key}>{row[column.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
