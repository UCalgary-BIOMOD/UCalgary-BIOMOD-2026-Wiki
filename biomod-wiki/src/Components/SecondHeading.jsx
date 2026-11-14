import styles from "./SecondHeading.module.css"

/**
 * Component for displaying a second heading with background image.
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.secondHeadingImgs - An array of image URLs to be used as background images for the section title.
 * @param {string} props.secondHeadingHeight - The height of the section title.
 * @param {string} [props.caption] - An optional caption to be displayed over the section title.
 * @returns 
 */

export default function SecondHeading({secondHeadingImgs, secondHeadingHeight, caption = null}) {
    return (
        <div className = {styles.secondHeadingContainer} style = {{"--second-heading-height": secondHeadingHeight}}>
                {secondHeadingImgs.map((image, index) => (
                    <img
                        key = {image}
                        src = {image}
                        className = {styles.secondHeadingImage}
                        alt = "second heading"
                        style = {{zIndex: secondHeadingImgs.length - index}} /*This orders the first child on the very top, and successive ones underlapping*/
                    />
                ))}
                <h1>{caption}</h1>
        </div>
    )       
}
