import {motion, useTransform} from "motion/react"

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