import Follows from "../components/follows";
import Navbar from "../components/navbar";

const Followers = () => {
  return (
    <>
      <Navbar />
      <div className="section_padder mr-3 my-16 ml-2 md:my-16 md:ml-60 md:mr-4">
        <Follows />
      </div>
    </>
  );
};

export default Followers;
