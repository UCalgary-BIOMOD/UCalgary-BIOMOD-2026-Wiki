import YouTube from "react-youtube"
/**
 * YoutubeEmbed seeks to allow easy embedding of videos into the project with a component.
 * Must pass in properties found from YouTube's own embed object
 * How do you find these properties?
 * Go to YT video, right click, and "Copy embed code" and find the proper params below
 * @param w Width of the video
 * @param h Height of the video
 * @param src The URL fragment of the video. The src of https://www.youtube.com/watch?v=dQw4w9WgXcQ would be dQw4W9WgXcQ
 * @returns The react-youtube video embed object with the proper options
 */
export default function YouTubeEmbed({w, h, src}) {
    /*Set the options for the embed.*/
    const opts = {
        height: h,
        width: w,
        playerVars: {
            autoplay: 0,
            
        }
    }
    

    return <YouTube videoId = {src} opts = {opts}  />;
}






