import { useEffect } from "react";
import AdminNavbar from "../components/adminNavbar";
import SingleViewSection from "../components/userVideosSingleView";

const VideoSingleView = () => {
    useEffect(() => {
        document.title = "Skrillz | View Video"
      }, []);

    return (
        <>
            <AdminNavbar />
            <div className="padder_auto my-16 md:ml-60">
                <SingleViewSection />
            </div>
        </>
    );
}
 
export default VideoSingleView;