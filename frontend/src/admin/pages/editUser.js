import AdminNavbar from "../components/adminNavbar";
import EditUser from "../components/editUsers"
const UserEdit = () => {
    return (
        <>
            <AdminNavbar />
            <div className="">
                <EditUser />
            </div>
        </>
    );
}

export default UserEdit;