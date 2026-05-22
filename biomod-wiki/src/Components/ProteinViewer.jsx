import {useEffect, useRef} from "react"
import * as $3Dmol from "3dmol"
import styles from "./ProteinViewer.module.css"

export default function ProteinViewer({pdbUrl}) {
    const viewerRef = useRef(null)
    useEffect(() => {
        if(!viewerRef.current) return

        const viewer = $3Dmol.createViewer(viewerRef.current, {
            backgroundColor: "white",
        })

        fetch(pdbUrl)
            .then((res) => res.text())
            .then((data) => {
                viewer.addModel(data, "pdb")
                viewer.setStyle({}, {
                    cartoon: {
                        color: "spectrum",
                    }
                })
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

    return (
        <div
            ref = {viewerRed}
            className = {styles.protein-viewer}
        />
    )
}