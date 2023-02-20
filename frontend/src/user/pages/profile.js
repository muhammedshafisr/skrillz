import Navbar from "../components/navbar";
import UserProfile from "../components/profile";

const Profile = () => {
    return (
        <>
        <Navbar />
        <div className="section_padder mr-3 my-16 ml-2 md:my-16 md:ml-60 md:mr-4 bg-slate-900">
            <UserProfile />
        </div>
        <div className="min-h-[1000px]">

        </div>
        </>
    );
}
 
export default Profile;