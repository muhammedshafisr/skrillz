import { useEffect } from "react";
import AdminNavbar from "../components/adminNavbar";
import ReportsSection from "../components/reports";

const Reports = () => {
    useEffect(() => {
        document.title = "Skrillz | Reports"
      }, []);

    return (
        <>
            <AdminNavbar />
            <div className="padder_auto my-16 md:ml-60">
                <ReportsSection />
            </div>
        </>
    );
}
 
export default Reports;