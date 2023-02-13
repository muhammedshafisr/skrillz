import AdminNavbar from "../components/adminNavbar";
import UserSection from "../components/userSection";

const User = () => {
    return (
        <>
            <AdminNavbar />
            <div className="padder_auto my-16 md:ml-60 bg-slate-100">
                <UserSection />
            </div>
        </>
    );
}

export default User;