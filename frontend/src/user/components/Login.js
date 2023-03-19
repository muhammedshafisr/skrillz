import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, removeError } from "../../redux/ducks/user";
import { removeAuthError } from "../../redux/ducks/authUser";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.UserLoginError);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      userEmail,
      userPassword
    };

    dispatch(getUser(data));
  };

  useEffect(() => {
    dispatch(removeError());
    dispatch(removeAuthError());

  }, [])
  

  return (
    <div className="inp_section flex justify-center items-center min-h-screen max-h-screen md:pl-14">
      <form
        className="flex flex-col items-center min-w-[400px]"
        onSubmit={handleSubmit}
        >
        <h1 className="font-normal text-xl subpixel-antialiased text-slate-50 select-none">Welcome back</h1>
        <label className="block">
          {/* { user && history.push('/') } */}
          {loginError && <p className="text-red-700">{loginError.error} </p>}
          <span className="select-none after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Email
          </span>
          <input
            type="email"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            className="select-none min-w-[350px] peer mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="you@example.com"
          />
          <p className="select-none mt-2 invisible peer-invalid:visible text-red-600 text-sm">
            Please provide a valid email address.
          </p>
        </label>

        <label className="block">
          <span className="select-none after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password
          </span>
          <input
            type="password"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
            name="password"
            className="min-w-[350px] mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
        </label>
        <Link to="/signup" className="text-sky-500 mt-2 select-none">
          New user? signup now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 inline-block text-sky-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </Link>

        <button className="select-none text-neutral-50 shadow-lg shadow-cyan-800 bg-sky-500 w-28 h-8 mt-4 rounded-full hover:bg-sky-600 active:bg-sky-300 focus:outline-none focus:ring focus:ring-green-400 transition ease-in-out duration-1000">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
