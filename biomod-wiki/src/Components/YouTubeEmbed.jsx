import YouTube from "react-youtube"

export default function YouTubeEmbed({w, h, src}) {
    
    const opts = {
        height: h,
        width: w,
        playerVars: {
            autoplay: 0,
            
        }
    }
    

    return <YouTube videoId = {src} opts = {opts}  />;
}






