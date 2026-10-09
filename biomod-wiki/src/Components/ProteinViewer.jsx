import { useEffect, useRef, useState } from "react"
import { Stage } from "ngl"
import styles from "./ProteinViewer.module.css"

const TAP_THRESHOLD = 8

// Same idea as before: which chain letter belongs to which legend item.
// This still has to be written by hand, because your PDB file's chain
// letters (A, B, C, L, M, T) don't carry English labels — only your
// team's own REMARK notes tell us what each one means.
const CHAIN_TO_COMPONENT = {
    A: "aptamer",
    B: "tmsd",
    C: "dendrimer",
    M: "methylene-blue",
    T: "biomarker"
}

export default function ProteinViewer({ pdbUrl, externalActiveId = null, onComponentHover }) {
    const wrapperRef = useRef(null)
    const viewerDivRef = useRef(null) // NGL will build its own canvas inside this div
    const stageRef = useRef(null)
    const reprMapRef = useRef({}) // stores each colored "layer" so we can show/hide them later

    const [active, setActive] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [loadError, setLoadError] = useState(null)
    const selectedComponentRef = useRef(null)
    const externalActiveRef = useRef(externalActiveId)

    const onHoverRef = useRef(onComponentHover)
    useEffect(() => {
        onHoverRef.current = onComponentHover
    }, [onComponentHover])

    // Show only the selected component's layer; null = show everything
    const applyHighlight = (componentId) => {
        const reprMap = reprMapRef.current
        Object.entries(reprMap).forEach(([id, repr]) => {
            const shouldShow = !componentId || componentId === id
            repr.setVisibility(shouldShow)
        })
    }

    useEffect(() => {
        externalActiveRef.current = externalActiveId
        applyHighlight(externalActiveId)
    }, [externalActiveId])

    useEffect(() => {
        if (!viewerDivRef.current) return

        // This is NGL's equivalent of $3Dmol.createViewer(...)
        const stage = new Stage(viewerDivRef.current, {
            backgroundColor: "#0C0922",
            tooltip: false
        })
        stageRef.current = stage
        let cancelled = false

        fetch(pdbUrl)
            .then((res) => {
                if (!res.ok) throw new Error(`Could not load protein file (${res.status})`)
                return res.text()
            })
            .then((pdbText) => {
                if (cancelled) return null
                setLoadError(null)
                // NGL wants a Blob, not raw text, when loading from memory
                const blob = new Blob([pdbText], { type: "text/plain" })

                return stage.loadFile(blob, { ext: "pdb" }).then((component) => {
                    if (cancelled) return
                    const rootStyles = getComputedStyle(document.documentElement)
                    const colors = {
                        dendrimer: rootStyles.getPropertyValue("--dendrimer").trim(),
                        tmsd: rootStyles.getPropertyValue("--tmsd").trim(),
                        aptamer: rootStyles.getPropertyValue("--aptamer").trim(),
                        methyleneBlue: rootStyles.getPropertyValue("--methylene-blue").trim(),
                        biomarker: rootStyles.getPropertyValue("--biomarker").trim()
                    }

                    // Each line below adds ONE colored "layer" to the model.
                    // ":X" means "chain X" in NGL's selection language.
                    // DNA chains use "cartoon" (a ribbon); small molecules
                    // (dendrimer, linker, methylene blue) use "ball+stick"
                    // since they have no backbone for a ribbon to follow.
                    const reprMap = {}

                    reprMap["tmsd"] = component.addRepresentation("cartoon", {
                        sele: ":B", color: colors.tmsd
                    })
                    reprMap["aptamer"] = component.addRepresentation("cartoon", {
                        sele: ":A", color: colors.aptamer
                    })
                    reprMap["biomarker"] = component.addRepresentation("cartoon", {
                        sele: ":T", color: colors.biomarker
                    })
                    reprMap["dendrimer"] = component.addRepresentation("ball+stick", {
                        sele: ":C", color: colors.dendrimer
                    })
                    reprMap["methylene-blue"] = component.addRepresentation("ball+stick", {
                        sele: ":M", color: colors.methyleneBlue
                    })
                    // Linker (chain L) — always visible, no legend entry,
                    // just shown in plain gray so the structure looks whole.
                    component.addRepresentation("ball+stick", {
                        sele: ":L", color: "gray"
                    })

                    reprMapRef.current = reprMap
                    applyHighlight(externalActiveRef.current || selectedComponentRef.current)

                    stage.viewer.rotationGroup.rotation.y = Math.PI / 2
                    stage.viewer.rotationGroup.updateMatrixWorld(true)
                    component.autoView() // same idea as viewer.zoomTo()

                    // This is NGL's click detection — the equivalent of
                    // 3Dmol's setClickable, which never worked for us.
                    stage.signals.clicked.add((pickingProxy) => {
                        if (!pickingProxy || !pickingProxy.atom) return
                        const chain = pickingProxy.atom.chainname
                        const componentId = CHAIN_TO_COMPONENT[chain] || null

                        const next = selectedComponentRef.current === componentId ? null : componentId
                        selectedComponentRef.current = next
                        applyHighlight(next)
                        onHoverRef.current?.(next)
                    })

                    stage.signals.hovered.add((pickingProxy) => {
                        const chain = pickingProxy?.atom?.chainname
                        const componentId = CHAIN_TO_COMPONENT[chain] || null
                        const visibleComponent = componentId || selectedComponentRef.current

                        applyHighlight(visibleComponent)
                        onHoverRef.current?.(componentId || selectedComponentRef.current)
                    })

                })
            })
            .catch((error) => {
                if (!cancelled) setLoadError(error.message)
            })

        const handleResize = () => stage.handleResize()
        window.addEventListener("resize", handleResize)

        return () => {
            cancelled = true
            window.removeEventListener("resize", handleResize)
            stage.dispose() // NGL's cleanup method, equivalent of viewer.clear()
        }
    }, [pdbUrl])

    useEffect(() => {
        if (!active) {
            selectedComponentRef.current = null
            onHoverRef.current?.(null)
            applyHighlight(null)
        }
    }, [active])

    // Everything below is UNCHANGED from before — the tap-to-activate
    // logic works on plain DOM events, so it doesn't care which 3D
    // library is running underneath it.
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
            if (!active && start && !moved) setActive(true)
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
    }, [active])

    return (
        <div className={styles.frame}>
            <div
                ref={wrapperRef}
                className={styles.proteinViewer}
                style={{ touchAction: active ? "none" : "pan-y" }}
            >
                <div
                    ref={viewerDivRef}
                    className={styles.canvasArea}
                    style={{ pointerEvents: active ? "auto" : "none" }}
                />

                {!active && <div className={styles.hint}>Give hannah money to view</div>}

                {loadError && <div className={styles.error}>Protein viewer error: {loadError}</div>}

                {active && (
                    <button
                        type="button"
                        className={styles.closeButton}
                        aria-label="Stop interacting with viewer"
                        onClick={() => setActive(false)}
                    >
                        ×
                    </button>
                )}

                <button
                    type="button"
                    className={styles.infoButton}
                    aria-label="Show viewer instructions"
                    onClick={() => setShowInfo((v) => !v)}
                >
                    i
                </button>

                {showInfo && (
                    <div className={styles.infoBox}>
                        <p><strong>Tap</strong> to activate the viewer</p>
                        <p><strong>Drag</strong> while active to rotate the DNA</p>
                        <p><strong>Pinch</strong> (or scroll, on desktop) to zoom in and out</p>
                        <p><strong>Tap a part</strong> while active to highlight just that component</p>
                        <p>Use the <strong>×</strong> button to exit</p>
                    </div>
                )}
            </div>
        </div>
    )
}