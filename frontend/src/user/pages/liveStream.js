import Navbar from "../components/navbar";
import LiveStreamSetUp from "../components/liveStreamSetup";
import { useEffect } from "react";

const LiveStream = () => {
    useEffect(() => {
        document.title = "Skrillz | Live Now"
      }, []);

    return (
        <>
            <Navbar />
        <div className="section_padder mr-3 my-16 ml-2 md:my-16 md:ml-60 md:mr-4 gradient__bg">
            <LiveStreamSetUp />
        </div>
        </>
    );
}
 
export default LiveStream;