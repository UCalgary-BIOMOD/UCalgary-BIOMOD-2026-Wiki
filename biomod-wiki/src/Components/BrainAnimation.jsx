import {useId, useRef} from "react"
import {motion, useScroll, useTransform, useMotionValue, useAnimationFrame, useInView} from "motion/react"
import styles from "./BrainAnimation.module.css"

const SAMPLES = 40
const AMPLITUDE = 0.035
const WAVES = 1.5

/*Closed path (in 0-1 bounding-box units) covering everything below a sine wave at height `level`*/
function wavePath(level, phase) {
    let d = `M 0 1 L 0 ${level + AMPLITUDE * Math.sin(phase)}`
    for (let i = 1; i <= SAMPLES; i++) {
        const x = i / SAMPLES
        d += ` L ${x.toFixed(3)} ${(level + AMPLITUDE * Math.sin(x * WAVES * 2 * Math.PI + phase)).toFixed(4)}`
    }
    return d + " L 1 1 Z"
}

/**
 * A brain that is progressively washed out by two rolling dark waves as the page scrolls past it.
 * Fills its parent (which must be position: relative). Self-contained: it tracks its own scroll progress.
 * @param src The full-color brain image
 * @param silhouette A transparent image with the same outline, used so the dark waves never spill onto the background
 * @param alt Alt text for the brain
 */
export default function BrainAnimation({src = "./images/brain.png", silhouette = "./images/brain-off-color.png", alt = "Brain"}) {
    const ref = useRef(null)
    const id = useId().replace(/:/g, "")
    const inView = useInView(ref)

    const {scrollYProgress} = useScroll({target: ref, offset: ["start end", "end end"]})

    const phase = useMotionValue(0)
    useAnimationFrame((time) => {
        if (!inView) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        phase.set(time / 700)
    })

    /*Waves rise from below the brain (hidden) to cover the lower 60% once the scroll is complete*/
    const rise = useTransform(scrollYProgress, [0.3, 1], [0, 1], {clamp: true})
    const backPath = useTransform([rise, phase], ([r, p]) => wavePath(1.08 - 0.68 * r, p))
    const frontPath = useTransform([rise, phase], ([r, p]) => wavePath(1.16 - 0.6 * r, p * 1.3 + 1.5))

    const mask = `url(${silhouette})`

    return (
        <div className = {styles.brain} ref = {ref}>
            <svg className = {styles.defs} width = "0" height = "0" aria-hidden = "true" focusable = "false">
                <defs>
                    <clipPath id = {`${id}-back`} clipPathUnits = "objectBoundingBox">
                        <motion.path d = {backPath} />
                    </clipPath>
                    <clipPath id = {`${id}-front`} clipPathUnits = "objectBoundingBox">
                        <motion.path d = {frontPath} />
                    </clipPath>
                </defs>
            </svg>
            <img src = {src} alt = {alt} />
            <img className = {styles.backWave} style = {{clipPath: `url(#${id}-back)`, maskImage: mask, WebkitMaskImage: mask}} src = {src} alt = "" aria-hidden = "true" />
            <img className = {styles.frontWave} style = {{clipPath: `url(#${id}-front)`, maskImage: mask, WebkitMaskImage: mask}} src = {src} alt = "" aria-hidden = "true" />
        </div>
    )
}
