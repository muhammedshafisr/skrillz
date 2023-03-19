import { useEffect } from "react";
import LikedVideoList from "../components/likedVideos";
import Navbar from "../components/navbar";

const LikedVideos = () => {
  useEffect(() => {
    document.title = "Skrillz | Liked Videos"
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="section_padder mr-3 my-16 ml-2 md:my-16 md:ml-60 md:mr-4">
        <LikedVideoList />
      </div>
    </>
  );
};

export default LikedVideos;
