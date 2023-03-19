import { useEffect } from "react";
import AdminDashBoardSection from "../components/adminDashboard";
import Navbar from "../components/adminNavbar";

const AdminDashBoard = () => {
    useEffect(() => {
        document.title = "Skrillz | Free Online Gaming, Live-streaming & Esports  Platform"
      }, []);

    return (
        <>
        <Navbar />
        <div className="padder_auto my-16 md:ml-60">
            <AdminDashBoardSection />
        </div>
        </>
    );
}
 
export default AdminDashBoard;