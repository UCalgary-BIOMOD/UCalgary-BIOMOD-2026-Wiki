import content from "./team-content.json";
import TextBlock from "/src/Components/TextComponents.jsx";
import LinkWrapper from "/src/Components/LinkComponents.jsx";
import PageLayout from "/src/Components/PageLayout.jsx";
import PopUpCard from "/src/Components/PopUpCard.jsx";


export default function Team() {
    const sections = [
        {
            id: "team",
            title: "Team",
            render: () => (
                <>
                    <TextBlock {...content.Team}/>
                    <PopUpCard 
                        name="Nam" 
                        role="Dry Lab Member" 
                        year="4th Year" 
                        major="Biochemistry and Bioinformatics" 
                        cardGame="Big Two" 
                        snack="Haribo" 
                        description="Poopoo"
                        photo1="/images/aptonix-logo.png"
                        photo2="/images/i-want-to-go-home.jpg"
                        photo3="/images/aptonix-logo.png"
                    />
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
                    <h2>woof</h2>
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