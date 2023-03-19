import OtpSection from "../components/otpSection";
import Navbar from "../components/navbar"
import { useEffect } from "react";

const VerifyOtp = () => {
    useEffect(() => {
        document.title = "Skrillz | Verify OTP"
      }, []);

    return (
        <>
        <Navbar />
        <div className="section_padder mr-3 my-16 ml-2 md:my-16 md:ml-60 md:mr-4 bg-slate-900">
        <OtpSection />
        </div>
        </>
    );
}
 
export default VerifyOtp;