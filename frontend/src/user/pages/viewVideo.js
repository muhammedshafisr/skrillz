import { useEffect } from "react";
import Navbar from "../components/navbar";
import VideoSingleView from "../components/videoSingleView";

const ViewVideo = () => {
    useEffect(() => {
        document.title = "Skrillz | ViewVideo"
      }, []);

    return ( 
        <>
        <Navbar />
        <div className="section_padder mr-3 my-16 ml-2 md:my-16 md:ml-60 md:mr-4">
            <VideoSingleView />
        </div>
        </>
    );
}
 
export default ViewVideo;