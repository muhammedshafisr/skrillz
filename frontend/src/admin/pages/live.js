import AdminNavbar from "../components/adminNavbar";
import LiveSection from "../components/live";

const Live = () => {
    return (
        <>  
            <AdminNavbar />
            <div className="padder_auto my-16 md:ml-60">
                <LiveSection />
            </div>
        </>
    );
}
 
export default Live;