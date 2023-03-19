import Navbar from "../components/adminNavbar";
import Login from "../components/adminLogin";
import { useEffect } from "react";

const AdminLogin = () => {
    useEffect(() => {
        document.title = "Skrillz | Admin Login"
      }, []);

    return (
        <>
        <Navbar />
        <Login />
        </>
    );
}
 
export default AdminLogin;