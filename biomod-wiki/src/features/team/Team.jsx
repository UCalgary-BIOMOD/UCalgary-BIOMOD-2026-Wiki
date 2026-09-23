import content from "./team-content.json";
import TextBlock from "/src/Components/TextComponents.jsx";
import PageLayout from "/src/Components/PageLayout.jsx";
import PopUpCard from "/src/Components/PopUpCard.jsx";
import ImageCarousel from "/src/Components/ImageCarousel.jsx";
import treeStyles from "/src/Components/TreeAnimation.module.css";
import teamStyles from "./Team.module.css"
import TreeAnimation from "/src/Components/TreeAnimation.jsx";
import { useState } from "react";
import mainHeading from "/src/Components/MainHeading.jsx";
import MainHeading from "../../Components/MainHeading";

export default function Team() {
    const [openMember, setOpenMember] = useState(null);
    const sections = [
        {
            id: "team",
            title: "Team",
            render: () => (
                <>
                    <div className={teamStyles.teamSection}>
                        <TreeAnimation onOutsideClick={() => setOpenMember(null)}>
                            {content.Team.members.map((member) => (
                                <div
                                    key={member.name}
                                    className={treeStyles.memberPosition}
                                    style={member.treePosition}
                                >
                                    <PopUpCard {...member}
                                        isPopupOpen={openMember === member.name}
                                        onOpen={() => setOpenMember(member.name)}
                                        onClose={() => setOpenMember(null)}
                                    />
                                </div>
                            ))}
                        </TreeAnimation>
                    </div>
                </>
            )
        },
        {
            id: "support",
            title: "Support",
            render: () => (
                <>
                    <MainHeading mainHeadingImgs = {["./images/main-heading.png"]} mainHeadingHeight = "10vw" caption = "SUPPORT"></MainHeading>
                    <div className={teamStyles.supportSection}>
                        <div className={teamStyles.supportBackground}>
                        </div>
                        <div className={teamStyles.supportGrid}>
                            {content.Support.supporters.map((supporter) => (
                                <div key={supporter.name} className={teamStyles.supportMember}>
                                    <img src={supporter.photo} alt={supporter.name} className={teamStyles.supportImage}/>
                                    <p className={teamStyles.supportName}>{supporter.name}</p>
                                    <p className={teamStyles.supportRole}>{supporter.role}</p>
                                    <p className={teamStyles.supportDepartment}>{supporter.department}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )
        },
        {
            id: "photoGallery",
            title: "Photo Gallery",
            render: () => (
                <>
                    <MainHeading mainHeadingImgs = {["./images/main-heading.png"]} mainHeadingHeight = "10vw" caption = "PHOTO GALLERY"></MainHeading>
                    <div className={teamStyles.photoGallerySection}>
                        <div className={teamStyles.photoGalleryBackground}>
                        </div>
                        <div className={teamStyles.imageCarouselContainer}>
                            <ImageCarousel
                                imgs = {[
                                    {id: 1, src: "/images/team1.JPG"},
                                    {id: 2, src: "/images/team2.JPG"},
                                    {id: 3, src: "/images/team3.JPG"},
                                    {id: 4, src: "/images/team4.JPG"},
                                ]}
                            />
                        </div>
                    </div>
                </>
            )
        },
    ]
    return (
        <PageLayout sections = {sections} bannerImgs = {["./images/basic-banner.png"]} bannerHeight = "50svh" caption = "TEAM"></PageLayout>
    )
}