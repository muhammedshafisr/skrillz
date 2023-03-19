import { useState } from "react";
import { authAdmin } from "../../redux/ducks/adminAuth";
import { useDispatch, useSelector } from "react-redux"

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const adminLoginError = useSelector((state) => state.AdminAuthError);

  const handleSubmit = (e) => {
    e.preventDefault();

    const admin = { email, password };
    console.log('going to take action')
    dispatch(authAdmin(admin));
    
  }

  


  return (
    <div className="inp_section flex justify-center items-center min-h-[500px] max-h-screen mt-6">
      <form className="flex flex-col items-center min-w-[400px]" onSubmit={ handleSubmit }>
        <label className="block">
        { adminLoginError  && <p className="text-red-700">{ adminLoginError.error} </p> }
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Username
          </span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value= { email }
            className="min-w-[350px] peer mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="you@example.com"
          />
          <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
            Please provide a valid email address.
          </p>
        </label>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password
          </span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value= { password }
            name="password"
            className="min-w-[350px] mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
        </label>

        <button className="text-neutral-50 shadow-lg shadow-cyan-500/50 bg-sky-500 w-28 h-8 mt-4 rounded-full hover:bg-sky-600 active:bg-sky-300 focus:outline-none focus:ring focus:ring-green-400 transition ease-in-out duration-1000">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
