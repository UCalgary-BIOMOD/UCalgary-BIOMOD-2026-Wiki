/**
 * 
 * @param {*} param0 
 * @returns 
 */

export default function TextBlock({heading, size: Tag = "h1", text}) {
    return (
        <section>
            {heading && <Tag>{heading}</Tag>}
            <p style = {{whiteSpace: "pre-line"}}>{text}</p>
        </section>
    )
}   