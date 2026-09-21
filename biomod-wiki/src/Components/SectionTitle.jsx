import styles from "./SectionTitle.module.css"

/**
 * Component for displaying a section title with background image.
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.sectionImgs - An array of image URLs to be used as background images for the section title.
 * @param {string} props.sectionTitleHeight - The height of the section title.
 * @param {string} [props.caption] - An optional caption to be displayed over the section title.
 * @returns 
 */

export default function SectionTitle({sectionImgs, sectionTitleHeight, caption = null}) {
    return (
        <div className = {styles.sectionContainer} style = {{"--section-title-height": sectionTitleHeight}}>
                {sectionImgs.map((image, index) => (
                    <img
                        key = {image}
                        src = {image}
                        className = {styles.sectionImage}
                        alt = "section title"
                        style = {{zIndex: sectionImgs.length - index}} /*This orders the first child on the very top, and successive ones underlapping*/
                    />
                ))}
                <h1>{caption}</h1>
        </div>
    )       
}
