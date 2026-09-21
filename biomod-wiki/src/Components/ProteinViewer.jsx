import {useEffect, useRef, useState} from "react"
import * as $3Dmol from "3dmol"
import styles from "./ProteinViewer.module.css"

const TAP_THRESHOLD = 8 // px of movement still counted as "just a tap"

export default function ProteinViewer({pdbUrl}) {
    const wrapperRef = useRef(null)
    const canvasRef = useRef(null)
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (!canvasRef.current) return

        const viewer = $3Dmol.createViewer(canvasRef.current, {
            backgroundColor: "#0C0922"
        })

        fetch(pdbUrl)
            .then((res) => res.text())
            .then((data) => {
                viewer.addModel(data, "pdb")
                viewer.setStyle({}, { cartoon: { color: "spectrum" } })
                viewer.zoomTo()
                viewer.render()
            })

        const handleResize = () => {
            viewer.resize()
            viewer.render()
        }
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            viewer.clear()
            viewer.render()
        }
    }, [pdbUrl])

    // Tap detection on the WRAPPER, capture phase — always sees the
    // touch before the 3Dmol canvas does, so there's no race at all.
    useEffect(() => {
        const el = wrapperRef.current
        if (!el) return

        let start = null
        let moved = false

        const getPoint = (e) => (e.touches ? e.touches[0] : e)

        const onStart = (e) => {
            const p = getPoint(e)
            start = { x: p.clientX, y: p.clientY }
            moved = false
        }

        const onMove = (e) => {
            if (!start) return
            const p = getPoint(e)
            const dx = Math.abs(p.clientX - start.x)
            const dy = Math.abs(p.clientY - start.y)
            if (dx > TAP_THRESHOLD || dy > TAP_THRESHOLD) moved = true
        }

        const onEnd = () => {
            if (start && !moved) {
                setActive(a => !a) // plain tap, no drag -> toggle
            }
            start = null
            moved = false
        }

        el.addEventListener("touchstart", onStart, { capture: true, passive: true })
        el.addEventListener("touchmove", onMove, { capture: true, passive: true })
        el.addEventListener("touchend", onEnd, { capture: true, passive: true })
        el.addEventListener("mousedown", onStart, { capture: true })
        el.addEventListener("mousemove", onMove, { capture: true })
        el.addEventListener("mouseup", onEnd, { capture: true })

        return () => {
            el.removeEventListener("touchstart", onStart, { capture: true })
            el.removeEventListener("touchmove", onMove, { capture: true })
            el.removeEventListener("touchend", onEnd, { capture: true })
            el.removeEventListener("mousedown", onStart, { capture: true })
            el.removeEventListener("mousemove", onMove, { capture: true })
            el.removeEventListener("mouseup", onEnd, { capture: true })
        }
    }, [])

    return (
        <div
            ref={wrapperRef}
            className={styles.proteinViewer}
            style={{ touchAction: active ? "none" : "pan-y" }}
        >
            <div
                ref={canvasRef}
                className={styles.canvasArea}
                style={{ pointerEvents: active ? "auto" : "none" }}
            />
            {!active && <div className={styles.hint}></div>}
        </div>
    )
}