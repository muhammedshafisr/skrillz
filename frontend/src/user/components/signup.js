import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authUser } from "../../redux/ducks/authUser";
import OtpSection from "./otpSection";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const err = useSelector((state) => state.UserAuthError);
  const user = useSelector((state) => state.UserAuth.user);

  const useHandleSubmit = async (e) => {
    e.preventDefault();
    
    const user = {
      firstname,
      lastname,
      email,
      password,
      phone,
    };

    dispatch(authUser(user));
  };

  function showMePassword() {
    const inp_password = document.querySelector("#inp_password");
    const eye_open = document.querySelector("#eye_open");
    const eye_closed = document.querySelector("#eye_closed");
    showPassword ? setShowPassword(false) : setShowPassword(true);

    if (showPassword) {
      inp_password.setAttribute("TYPE", "password");
      eye_open.classList.remove("hidden");
      eye_closed.classList.add("hidden");
    } else {
      inp_password.setAttribute("TYPE", "Text");
      eye_closed.classList.remove("hidden");
      eye_open.classList.add("hidden");
    }
  }

  return (
    <>
  {/* popup modal */}

    <OtpSection />


    <div className="inp_section flex justify-center items-center min-h-screen max-h-screen md:pl-14">
      <form
        className="flex flex-col items-center min-w-[400px]"
        onSubmit={useHandleSubmit}
      >
        <h1 className="font-normal mb-3 text-xl subpixel-antialiased text-slate-50 select-none">Create your account</h1>
        <div className="duplex_inp_lab">
          {/* {user ? (
            <p className="text-green-500">Successfully signed up</p>
          ) : ( */}
            {err && <p className="text-red-700">{err.error} </p>
          }
          <label className="inline-block max-w-[180px] mr-2 select-none">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              First name
            </span>
            <input
              type="text"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              name="email"
              className="max-w-[200px] mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label className="inline-block max-w-[180px] ">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Last name
            </span>
            <input
              type="text"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              name="email"
              className="max-w-[200px] mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
        </div>

        <div className="duplex_inp_lab">
          <label className="inline-block max-w-[180px] mr-2">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              className="max-w-[200px] mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label className="inline-block max-w-[180px] ">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Phone
            </span>
            <input
              type="number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              name="email"
              className="max-w-[200px] mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
        </div>

        <label className="inline-block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password
          </span>
          <input
            id="inp_password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="email"
            className="min-w-[365px] mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
          <svg
            id="eye_open"
            onClick={showMePassword}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 inline-block relative -top-8 left-80 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <svg
            id="eye_closed"
            onClick={showMePassword}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 relative -top-8 left-[320px] cursor-pointer hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </label>

        <Link to="/login" className="text-sky-500 mt-2">
          Already registered? sign in
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

        <button className="text-neutral-50 shadow-lg shadow-cyan-500/50 bg-sky-500 w-28 h-8 mt-4 rounded-full hover:bg-sky-600 active:bg-sky-300 focus:outline-none focus:ring focus:ring-green-400 transition ease-in-out duration-1000">
          Signup
        </button>
      </form>
    </div>
    </>
  );
};

export default Signup;

export const handleShowOtpModal = () => {
  document.querySelector("#staticModal").classList.remove("hidden");
}