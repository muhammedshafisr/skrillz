import Navbar from "../components/navbar";
import LoginForm from "../components/login";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    document.title = "Skrillz | Login"
  }, []);
  
  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  );
};

export default Login;
