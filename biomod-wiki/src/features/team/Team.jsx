import content from "./team-content.json";
import TextBlock from "/src/Components/TextComponents.jsx";
import LinkWrapper from "/src/Components/LinkComponents.jsx";
import PageLayout from "/src/Components/PageLayout.jsx";
import PopUpCard from "/src/Components/PopUpCard.jsx";
import ImageCarousel from "/src/Components/ImageCarousel.jsx";
import styles from "/src/Components/TreeAnimation.module.css";
import TreeAnimation from "/src/Components/TreeAnimation.jsx";
import { useState } from "react";

export default function Team() {
    const [openMember, setOpenMember] = useState(null);
    const sections = [
        {
            id: "team",
            title: "Team",
            render: () => (
                <>
                    <TextBlock {...content.Team}/>
                    <TreeAnimation onOutsideClick={() => setOpenMember(null)}>
                        {content.Team.members.map((member) => (
                            <div
                                key={member.name}
                                className={styles.memberPosition}
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
                    <h2>hi</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                </>
            )
        },
        {
            id: "support",
            title: "Support",
            render: () => (
                <>
                    <TextBlock {...content.Support}/>
                    <h2>meow</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                </>
            )
        },
        {
            id: "photoGallery",
            title: "Photo Gallery",
            render: () => (
                <>
                    <TextBlock {...content.PhotoGallery}/>
                    <ImageCarousel 
                        imgs = {[
                            {id: 1, src: "/images/team1.JPG"},
                            {id: 2, src: "/images/team2.JPG"},
                            {id: 3, src: "/images/team3.JPG"},
                            {id: 4, src: "/images/team4.JPG"},
                        ]}
                    />
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                    <h2>.</h2>
                </>
            )
        },
    ]
    return (
        <PageLayout sections = {sections}/>
    )
}