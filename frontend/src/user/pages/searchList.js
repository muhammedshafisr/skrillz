import Navbar from "../components/navbar";
import SearchLister from "../components/searchList";

const SearchList = () => {
    return (
        <>
        <Navbar />
        <div className="section_padder mr-3 my-16 ml-2 md:my-16 md:ml-60 md:mr-4 gradient__bg">
        <SearchLister />
        </div>
        </>
    );
}
 
export default SearchList;