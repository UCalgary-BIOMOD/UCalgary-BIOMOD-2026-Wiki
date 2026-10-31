import styles from "./Table.module.css"

/**
 * A simple themed data table. Scrolls sideways on narrow screens instead of overflowing the page.
 * @param columns The column definitions: [{key: "name", label: "Name"}]
 * @param rows The row objects, keyed by column key: [{name: "Aptamer"}]
 * @param caption Optional caption shown above the table
 * @param className Optional extra class
 * @param headerGroups Optional header groups
 */
export default function Table({columns, rows = [], caption, className = "", headerGroups = []}) {
    return (
        <div className = {`${styles.wrapper} ${className}`}>
            <table className = {styles.table}>
                {caption && <caption className = {styles.caption}>{caption}</caption>}
                <thead>
                    {headerGroups.length > 0 && (
                        <tr>
                            {headerGroups.map((group, index) => (
                                <th key={index} colSpan={group.colSpan || 1} rowSpan={group.rowSpan || 1} scope="colgroup">
                                    {group.label}
                                </th>
                            ))}
                        </tr>
                    )}
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} scope="col">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => {
                                const cell = row[column.key];
                                if (cell === null) return null;
                                const isObject =
                                    cell !== null &&
                                    typeof cell === "object" &&
                                    !Array.isArray(cell);
                                const value = isObject ? cell.value : cell;
                                return (
                                    <td key={column.key} rowSpan={isObject ? cell.rowSpan : undefined} colSpan={isObject ? cell.colSpan : undefined}>
                                        {value}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
