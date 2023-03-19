import { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import UserProfile from "../components/profile";

const Profile = () => {
    useEffect(() => {
        document.title = "Skrillz | Profile"
      }, []);

    return (
        <>
        <Navbar />
        <div className="section_padder mr-3 my-16 ml-2 md:my-16 md:ml-60 md:mr-4">
            <UserProfile />
        <div className="min-h-[1000px]">

        </div>
        </div>
        <Footer />
        </>
    );
}
 
export default Profile;