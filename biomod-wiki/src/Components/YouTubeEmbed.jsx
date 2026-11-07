import YouTube from "react-youtube"
import styles from "./YouTubeEmbed.module.css"
/**
 * YoutubeEmbed seeks to allow easy embedding of videos into the project with a component.
 * The video always fills the width of its container at a 16:9 ratio (see YouTubeEmbed.module.css), so it needs no width or height.
 * @param src The URL fragment of the video. The src of https://www.youtube.com/watch?v=dQw4w9WgXcQ would be dQw4W9WgXcQ
 * @returns The react-youtube video embed object with the proper options
 */
export default function YouTubeEmbed({src}) {
    /*Player options: fill the wrapper and do not autoplay*/
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0,
        }
    }

    

    

    return (
        
        <div className = {styles.wrapper}>
            <YouTube videoId={src} opts={opts} className = {styles.player}/>
        </div>
        
    );
}
