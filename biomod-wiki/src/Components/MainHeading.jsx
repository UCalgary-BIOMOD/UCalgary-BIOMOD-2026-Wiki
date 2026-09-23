import styles from "./MainHeading.module.css"

/**
 * Component for displaying a main heading with background image.
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.mainHeadingImgs - An array of image URLs to be used as background images for the section title.
 * @param {string} props.sectionTitleHeight - The height of the section title.
 * @param {string} [props.caption] - An optional caption to be displayed over the section title.
 * @returns 
 */

export default function MainHeading({mainHeadingImgs, mainHeadingHeight, caption = null}) {
    return (
        <div className = {styles.mainHeadingContainer} style = {{"--main-heading-height": mainHeadingHeight}}>
                {mainHeadingImgs.map((image, index) => (
                    <img
                        key = {image}
                        src = {image}
                        className = {styles.mainHeadingImage}
                        alt = "main heading"
                        style = {{zIndex: mainHeadingImgs.length - index}} /*This orders the first child on the very top, and successive ones underlapping*/
                    />
                ))}
                <h1>{caption}</h1>
        </div>
    )       
}
