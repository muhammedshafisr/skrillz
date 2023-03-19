import Navbar from "../components/navbar";
import HistorySection from "../components/history";
import { useEffect } from "react";

const History = () => {
  useEffect(() => {
    document.title = "Skrillz | History"
  }, []);

  return (
    <>
      <Navbar />
      <div className="section_padder mr-3 my-16 ml-2 md:my-16 md:ml-60 md:mr-4">
        <HistorySection />
      </div>
    </>
  );
};

export default History;
