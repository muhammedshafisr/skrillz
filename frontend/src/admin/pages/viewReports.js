import { useEffect } from "react";
import AdminNavbar from "../components/adminNavbar";
import ViewReportsSection from "../components/viewReports";

const ViewReports = () => {
    useEffect(() => {
        document.title = "Skrillz | View Reports"
      }, []);

    return (
        <>
            <AdminNavbar />
            <div className="padder_auto my-16 md:ml-60">
                <ViewReportsSection />
            </div>
        </>
    );
}
 
export default ViewReports;