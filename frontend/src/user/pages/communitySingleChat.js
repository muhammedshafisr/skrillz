import { useEffect } from "react";
import SingleChat from "../components/communitySingleChat";
import Navbar from "../components/navbar";

const CommunityChat = () => {
    useEffect(() => {
        document.title = "Skrillz | Community"
      }, []);

    return (
        <>  
            <Navbar />
            <SingleChat />
        </>
    );
}
 
export default CommunityChat;