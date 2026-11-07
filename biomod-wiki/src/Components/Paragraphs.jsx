import styles from "./Paragraphs.module.css"

/**
 * A stack of body-text paragraphs.
 * Each string is treated as HTML, so content files (the page .json) can use simple rich text such as
 * <sub>subscripts</sub>, <sup>superscripts</sup>, <em>italics</em> and <strong>bold</strong>.
 * Only pass text written by the team (never user input), because it is inserted as raw HTML.
 * @param paragraphs An array of strings, one per paragraph, e.g. content.background
 */
export default function Paragraphs({paragraphs}) {
    return paragraphs.map((text, index) => <p key = {index} className = {styles.copy} dangerouslySetInnerHTML = {{__html: text}}></p>)
}
