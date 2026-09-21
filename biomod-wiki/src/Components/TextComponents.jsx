/**
 * This is the standard TextBlock component. It allows the option to have a header and set its size. 
 * It also allows the JSON to set the props, as well as accepting newLines as a style in its <p>
 * @param heading The string to be the header text.
 * @param size The direct statement of the header size (ex. h1, h2, etc.)
 * @param text The text to be rendered in the <p>. Allows \n in the string!
 * @returns The TextBlock to be rendered
 */
export default function TextBlock({heading, size: Tag = "h1", text}) {
    return (
        <section>
            {heading && <Tag>{heading}</Tag>}
            <p style = {{whiteSpace: "pre-line", textAlign: "start", textIndent: "3em"}}>{text}</p>
        </section>
    )
}   