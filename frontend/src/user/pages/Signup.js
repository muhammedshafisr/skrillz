import SignupForm from "../components/signup";
import Navbar from "../components/navbar";
import { useEffect } from "react";

const Signup = () => {
  useEffect(() => {
    document.title = "Skrillz | Signup"
  }, []);

  return (
    <>
      <Navbar />
      <SignupForm />
    </>
  );
};

export default Signup;
