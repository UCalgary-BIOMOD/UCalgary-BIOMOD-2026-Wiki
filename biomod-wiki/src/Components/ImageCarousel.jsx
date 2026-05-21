import {useEffect, useState} from "react"
import styles from "./ImageCarousel.module.css"
/*Adapted from: https://dev.to/vishalthapaliya/build-a-smooth-performant-image-carousel-in-react-a-beginners-guide-48ji*/

/**
 * 
 * @param caption The header before each image carousel
 * @param imgs An array of images where each entry is a dictionary with an id and source img
 * Ex:
 *      imgs = {[
            {id: 1, src: aptonixLogo},
            {id: 2, src: iwannagohome},
        ]}
 * @returns An image carousel object
 */

export default function ImageCarousel({caption, imgs}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0) /*The current index variable*/
    const [activeDot, setActiveDot] = useState(0)

    useEffect(() => {
        setActiveDot(currentImageIndex)
    }, [currentImageIndex])

    const handlePrevClick = () => {
        setCurrentImageIndex(
            currentImageIndex=== 0 ? imgs.length - 1 : currentImageIndex - 1
        ) 
    }
    const handleNextClick = () => {
        setCurrentImageIndex(
            (currentImageIndex + 1) % imgs.length
        ) 
    }

    const handleDotClick = (index) => {
        setCurrentImageIndex(index)
        setActiveDot(index)
    }
    return(
        <section>
            <h2 className = {styles.h2}>{caption}</h2>
            <div className = {styles["image-carousel"]}>
                <button className={`${styles["nav-button"]} ${styles.left}`} onClick={handlePrevClick}>&lt;</button>
                {imgs.map((image, index) => (
                    <img
                        src = {image.src}
                        alt = "images"
                        className = {currentImageIndex === index ? styles.block : styles.hidden}
                        key = {image.id}
                    />
                ))}
                <button className={`${styles["nav-button"]} ${styles.right}`} onClick={handleNextClick}>&gt;</button>
            </div>
            <div className = {styles.dots}>
                {imgs.map((_, index) => (
                    <span
                        key = {index}
                        className = {`${styles.dot} ${activeDot === index ? styles.active : ""}`}
                        onClick = {() => handleDotClick(index)}
                    />
                ))}
            </div>
        </section>
    )
}