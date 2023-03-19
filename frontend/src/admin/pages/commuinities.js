import AdminNavbar from "../components/adminNavbar";
import CommunitySection from "../components/communities";

const Communities = () => {
    return (
        <>
            <AdminNavbar />
            <div className="padder_auto my-16 md:ml-60">
                <CommunitySection />
            </div>
        </>
    );
}
 
export default Communities;