import GenreSction from "../components/genre";
import Navbar from "../components/navbar";

const Genre = () => {
  return (
    <>
      <Navbar />
      <div className="section_padder mr-3 my-16 ml-2 md:my-16 md:ml-60 md:mr-4">
        <GenreSction />
      </div>
    </>
  );
};

export default Genre;
