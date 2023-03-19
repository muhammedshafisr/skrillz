import AdminNavbar from "../components/adminNavbar";
import VideoSection from "../components/videos";

const Videos = () => {
    return (
        <>
            <AdminNavbar />
            <div className="padder_auto my-16 md:ml-60">
                <VideoSection />
            </div>
        </>
    );
}
 
export default Videos;