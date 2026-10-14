import styles from "./LinkGrid.module.css"
import LinkWrapper from "./LinkComponents"

/**
 * A responsive grid of image buttons with a label underneath each (the Project / Notebook / Results / ELSI tiles).
 * Tiles share the row equally, wrap onto new rows when there are more than `columns`, and
 * the last row is centered. Add a tile by adding an entry to `items`; nothing else needs to change.
 *
 * @param items Array of {to, img, alt, label}
 * @param columns How many tiles per row on wide screens (default 4)
 * @param columnsSmall How many tiles per row on phones (default 2)
 * @param tileMax Optional cap on one tile's width (any CSS length, e.g. "13.5rem"). Without it tiles fill the row.
 */
export default function LinkGrid({items, columns = 4, columnsSmall = 2, tileMax}) {
    return (
        <div
            className = {styles.linkGrid}
            style = {{"--columns": columns, "--columns-small": columnsSmall, "--tile-max": tileMax}}
        >
            {items.map((item) => (
                <div className = {styles.item} key = {item.to}>
                    <LinkWrapper to = {item.to}>
                        <img src = {item.img} alt = {item.alt ?? item.label}></img>
                    </LinkWrapper>
                    <h3>{item.label}</h3>
                </div>
            ))}
        </div>
    )
}
