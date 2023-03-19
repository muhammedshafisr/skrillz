import Navbar from "../components/navbar";
import EditProfileSection from "../components/editProfile";
import { useEffect } from "react";

const EditProfile = () => {
    useEffect(() => {
        document.title = "Skrillz | Edit Profile"
      }, []);

    return (
        <>
        <Navbar />
        <EditProfileSection />
        </>
    );
}
 
export default EditProfile;