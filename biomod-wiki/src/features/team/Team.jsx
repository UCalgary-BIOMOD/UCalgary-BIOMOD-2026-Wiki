import content from "./team-content.json";
import TextBlock from "/src/Components/TextComponents.jsx";
import LinkWrapper from "/src/Components/LinkComponents.jsx";
import PageLayout from "/src/Components/PageLayout.jsx";
import PopUpCard from "/src/Components/PopUpCard.jsx";
import ImageCarousel from "/src/Components/ImageCarousel.jsx";

export default function Team() {
    const sections = [
        {
            id: "team",
            title: "Team",
            render: () => (
                <>
                    <TextBlock {...content.Team}/>
                    {content.Team.members.map((member) => ( /* Render a PopUpCard for each team member, passing in their details as props */
                        <PopUpCard
                            key={member.name}
                            {...member}
                        />
                    ))}
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