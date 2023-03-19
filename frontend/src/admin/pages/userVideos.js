import { useEffect } from "react";
import AdminNavbar from "../components/adminNavbar";
import UserVideoSection from "../components/userVideos";

const UserVideos = () => {
    useEffect(() => {
        document.title = "Skrillz | Video Management"
      }, []);

    return (
        <>
            <AdminNavbar />
            <div className="padder_auto my-16 md:ml-60">
                <UserVideoSection />
            </div>
        </>
    );
}
 
export default UserVideos;