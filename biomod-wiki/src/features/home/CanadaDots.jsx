import {motion, useTransform} from "motion/react"

export default function CanadaDots({top, left, index, progress, total}) {
    const start = (index + 1)/total * (1 - 0.4) + 0.3
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
    return(<motion.div
            style={{
                position: "absolute",
                top,
                left,
                width: "1.6cqw", /*1% of the map frame = 1cqw, so the dot grows/shrinks with the map*/
                height: "1.6cqw",
                borderRadius: "50%",
                backgroundColor: "red",
                opacity,
                scale,
                zIndex: 10, 
            }}
            animate={{
                boxShadow: [
                    "0 0 0px rgba(255, 0, 0, 0)",
                    "0 0 2cqw rgba(255, 0, 0, 0.8)",
                    "0 0 0px rgba(255, 0, 0, 0)",
                ],
            }}
            transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.2,
            }}
        />
    )
}