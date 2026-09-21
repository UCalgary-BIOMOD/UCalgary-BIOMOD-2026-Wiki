
import styles from "./PDFViewer.module.css"
import {useState} from "react"
import VerticalCard from "./VerticalCard"



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

