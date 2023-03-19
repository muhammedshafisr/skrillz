import { useEffect } from "react";
import AdminNavbar from "../components/adminNavbar";
import EditUser from "../components/editUsers"
const UserEdit = () => {
    useEffect(() => {
        document.title = "Skrillz | Edit User"
      }, []);

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