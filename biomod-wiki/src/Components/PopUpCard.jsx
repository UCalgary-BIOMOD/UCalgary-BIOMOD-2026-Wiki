import styles from "./PopUpCard.module.css";
import ImageCarousel from "./ImageCarousel";
import LinkWrapper from "./LinkComponents";

/** 
 * Open state logic adapted from Mobiscroll via 
 * https://demo.mobiscroll.com/react/popup/showing-the-popover (Accessed: Aug 23, 2026)
 */

/*INCLUDE REFERENCE IN GIT HUB READ ME*/

/**
 * The PopUpCard component displays a team member's photo and opens a popup card with additional photos and information when clicked.
 * @param {Object} props - The properties passed to the component. 
 * @param {string} props.nameHeadShot - The URL of the team member's headshot photo.
 * @param {string} props.name - The name of the team member.
 * @param {string} props.photo1 - The URL of the first fun photo of the team member.
 * @param {string} props.photo2 - The URL of the second fun photo of the team member.
 * @param {string} props.photo3 - The URL of the third fun photo of the team member.
 * @param {string} props.role - The role of the team member.
 * @param {string} props.year - The year of study of the team member.
 * @param {string} props.major - The major of the team member.
 * @param {string} props.cardGame - The favorite card game of the team member.
 * @param {string} props.cardGameURL - The URL to learn more about the team member's favorite card game.
 * @param {string} props.snack - The favorite snack of the team member.
 * @param {string} props.description - A brief description of the team member.  
 * @returns 
 */

export default function PopUpCard({nameHeadShot, name, photo1, photo2, photo3, role, year, major, cardGame, cardGameURL, snack, description, isPopupOpen, onOpen, onClose}) {
    return (
        <div className={styles.teamMember} data-popup-open={isPopupOpen}>
            <p className={styles.popupName}>{name}</p>
            <p className={styles.teamMemberRole}>{role}</p>
            <img className={styles.headShot} src = {nameHeadShot} alt={name} onClick={onOpen}></img>
            <div 
                className={`
                    ${styles.popUpCard} 
                    ${isPopupOpen ? styles.show : ""} 
                    ${name === "Meagan Davies" ? styles.meaganPopup : ""}
                    ${name === "Neeor Alam" ? styles.neeorPopup : ""}
                    ${name === "Shahzaib Khan" ? styles.shahzaibPopup : ""}
                `}>
                <button onClick={onClose} className={styles.closeButton}>X</button>
                <h2 className={styles.teamMemberName}>{name}</h2>
                <div className={styles.imageCarousel}> 
                    <ImageCarousel 
                        imgs = {[
                            {id: 1, src: photo1},
                            {id: 2, src: photo2},
                            {id: 3, src: photo3},
                        ]}
                    />
                </div>
                <div className={styles.teamMemberInfo}>
                    <p><strong>Role:</strong> {role}</p>
                    <p><strong>Year:</strong> {year}</p>
                    <p><strong>Major:</strong> {major}</p>
                    <p><strong>Favorite Card Game:</strong> 
                        <span className={styles.cardGameURL}>
                            <LinkWrapper to={cardGameURL}>{cardGame}</LinkWrapper>
                        </span>
                    </p>
                    <p><strong>Favorite Snack:</strong> {snack}</p>
                    <p><strong>Description:</strong> {description}</p>
                </div>
            </div>
        </div>
    )
}