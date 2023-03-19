import { useEffect } from "react";
import Footer from "../components/footer";
import HomeLiveSection from "../components/homeLiveSection";
import Navbar from "../components/navbar";

const Home = () => {
  useEffect(() => {
    document.title = "Skrillz | Free Online Gaming, Live-streaming & Esports  Platform"
  }, []);

  return (
    <>
      <Navbar />
      <div className="section_padder mr-3 mt-16 ml-2 md:mt-16 md:ml-60 md:mr-4">
        <HomeLiveSection />
      
      </div>
      <Footer />
    </>
  );
};

export default Home;
