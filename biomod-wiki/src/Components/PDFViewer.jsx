
import styles from "./PDFViewer.module.css"
import {useState} from "react"
import VerticalCard from "./VerticalCard"



/**
 * A dropdown (VerticalCard) that opens an embedded PDF.
 * @param pdfPath URL of the PDF, usually a file under /public/files (e.g. "/files/dendrimer-biosensors.pdf")
 * @param caption The dropdown header text
 * @param id The element id of the card
 */
export default function PDFViewer({pdfPath, caption = "View PDF", id = "pdf-viewer-card"}) {
    
    const [isOpen, setIsOpen] = useState(false)

    return (
        <VerticalCard
            id={id}
            caption={caption}
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            content={
                <div className={styles.viewer}>
                    <iframe
                        src={pdfPath}
                        className={styles.PDFViewer}
                        title={caption}
                    />
                </div>
            }
        />
    )
}

