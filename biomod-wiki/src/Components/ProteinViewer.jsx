import { useEffect, useRef, useState } from "react"
import { Stage } from "ngl"
import styles from "./ProteinViewer.module.css"

/*How far (in px) a pointer may move between press and release and still count as a tap rather than a drag*/
const TAP_THRESHOLD = 8

/*
    Maps each chain letter in the PDB file to the id of its legend item (see MoleculeLegend.jsx).
    This is written by hand because the chain letters (A, B, C, L, M, T) carry no labels of their own;
    the meaning of each chain is recorded in the REMARK lines of /public/proteins/all_components_merged.pdb.
    Chain L (linker) has no legend item and is always shown.
*/
const CHAIN_TO_COMPONENT = {
    A: "aptamer",
    B: "tmsd",
    C: "dendrimer",
    M: "methylene-blue",
    T: "biomarker"
}

/**
 * Interactive 3D viewer for the full biosensor model, built on NGL (https://nglviewer.github.io/).
 * The viewer starts inactive so the page can still scroll past it; a tap activates it, and the x button deactivates it.
 * Each molecule component is its own NGL representation (a "layer"), so the legend can show or hide it independently.
 * @param pdbUrl Path to the PDB file, e.g. "/proteins/all_components_merged.pdb"
 * @param externalActiveId The component id highlighted from outside (the legend). null shows every component.
 * @param onComponentHover Called with the component id under the pointer (or the clicked one), or null, so the legend can follow
 */
export default function ProteinViewer({ pdbUrl, externalActiveId = null, onComponentHover }) {
    const wrapperRef = useRef(null)
    const viewerDivRef = useRef(null) // NGL builds its canvas inside this div
    const stageRef = useRef(null)
    const reprMapRef = useRef({}) // component id -> NGL representation, used to show/hide each layer

    const [active, setActive] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [loadError, setLoadError] = useState(null)
    const selectedComponentRef = useRef(null)
    const externalActiveRef = useRef(externalActiveId)

    const onHoverRef = useRef(onComponentHover)
    useEffect(() => {
        onHoverRef.current = onComponentHover
    }, [onComponentHover])

    /*Shows only the given component's layer. null shows everything.*/
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

        /*Create the NGL stage (the 3D scene) inside the viewer div*/
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
                /*NGL loads from memory through a Blob rather than a raw string*/
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

                    /*
                        Each addRepresentation call below adds one colored layer to the model.
                        ":X" selects chain X in NGL's selection language.
                        DNA chains are drawn as a "cartoon" ribbon; the small molecules
                        (dendrimer, linker, methylene blue) are drawn as "ball+stick" because they have no backbone to follow.
                    */
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
                    /*Linker (chain L): always visible and gray, with no legend entry, so the structure looks connected*/
                    component.addRepresentation("ball+stick", {
                        sele: ":L", color: "gray"
                    })

                    reprMapRef.current = reprMap
                    applyHighlight(externalActiveRef.current || selectedComponentRef.current)

                    stage.viewer.rotationGroup.rotation.y = Math.PI / 2
                    stage.viewer.rotationGroup.updateMatrixWorld(true)
                    component.autoView() // fit the whole model in the frame

                    /*Clicking a part highlights its component; clicking the same one again clears it*/
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
            stage.dispose() // frees the WebGL context
        }
    }, [pdbUrl])

    useEffect(() => {
        if (!active) {
            selectedComponentRef.current = null
            onHoverRef.current?.(null)
            applyHighlight(null)
        }
    }, [active])

    /*
        Tap-to-activate: the viewer ignores the pointer until the user taps it, so scrolling past it on a touch screen does not rotate the model.
        A press that moves more than TAP_THRESHOLD counts as a drag (a scroll), not a tap.
        This uses plain DOM events, so it is independent of the 3D library.
    */
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
                {loadError && <div className={styles.error}>Protein viewer error: {loadError}</div>}

                {!active && <div className={styles.hint}>Tap to interact</div>}

                <button
                    type="button"
                    className={styles.closeButton}
                    aria-label={active ? "Stop interacting with viewer" : "Viewer is not active"}
                    disabled={!active}
                    onClick={() => setActive(false)}
                >
                    ×
                </button>

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