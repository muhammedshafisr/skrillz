import AdminNavbar from "../components/adminNavbar";
import SearchSection from "../components/searchList";

const AdminSearchList = () => {
    return (
        <>
            <AdminNavbar />
            <div className="padder_auto my-16 md:ml-60">
                <SearchSection />
            </div>
        </>
    );
}
 
export default AdminSearchList;