import {motion, useTransform} from "motion/react"

/**
 * One animated biomarker image on the home page. It fades and scales in as the page scrolls, then bobs up and down.
 * @param top, left Position of its top-left corner as percentages of the frame (see the biomarkers list in Home.jsx)
 * @param index Which biomarker this is; later ones appear later and bob out of step
 * @param progress The scroll progress (a motion value from 0 to 1) that drives the fade-in
 * @param total How many biomarkers there are (spreads the start times across the scroll)
 */
export default function Biomarker({top, left, index, progress, total}) {
    const start = (index + 1)/total * (1 - 0.4) + 0.30
    const opacity = useTransform(
        progress,
        [start, 1],
        [0, 1]
    )

    const scale = useTransform(
        progress,
        [start, 1],
        [0, 1]
    )
    return(<motion.img
            style={{
                position: "absolute",
                top,
                left,
                opacity,
                scale,
                zIndex: 10, 
                width: "50%",
                height: "50%",
                objectFit: "contain"
            }}
            animate = {{
                y: [0, "3%", 0]
            }}

            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.4,
            }}
            src = "./images/biomarker.png"
            alt = "Biomarker"
        />
    )
}