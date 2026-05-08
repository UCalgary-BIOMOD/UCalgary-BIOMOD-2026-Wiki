import {useEffect, useState} from "react"
import styles from "./ImageCarousel.module.css"

export default function ImageCarousel({caption, imgs}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0) 
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
        </section>
    )
}