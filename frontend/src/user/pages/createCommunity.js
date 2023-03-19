import Navbar from "../components/navbar";
import CommunityManager from "../components/createCommunity";
import { useEffect } from "react";

const Community = () => {
    useEffect(() => {
        document.title = "Skrillz | Community"
      }, []);

    return (
        <>
            <Navbar />
            <div className="section_padder mr-3 my-16 ml-2 md:my-16 md:ml-20 md:mr-4">
                <CommunityManager />
            </div>
        </>
    );
}
 
export default Community;