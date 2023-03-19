import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeError, setUser } from "../../redux/ducks/user";
import { useDispatch, useSelector } from "react-redux";
import { setIsUser } from "../../redux/ducks/userAuthorization";
import { IoGameControllerOutline } from "@react-icons/all-files/io5/IoGameControllerOutline";
import { searchIt } from "../../redux/ducks/search";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserLogin.user);
  const auth = useSelector((state) => state.isAuth.isUser);
  const token = JSON.parse(localStorage.getItem("user"));
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  function handleMenu() {
    const menu = document.querySelector("#menu");

    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  }

  const handleLogout = () => {
    // removing user from local storage and global state
    localStorage.removeItem("user");
    dispatch(setUser(null));
  };

  const handlePopupCancel = () => {
    document.querySelector("#popup-modal").classList.add("collapse");
    dispatch(setIsUser(null));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = searchText.replace(/\s/g,'');
    dispatch(searchIt(text, token?.token));
    navigate("/search")
  };

  return (
    <>
      {" "}
      {auth === "Blocked" && (
        <>
          <div
            id="popup-modal"
            tabindex="-1"
            className="flex justify-center fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
          >
            <div className="relative w-full h-full max-w-md md:h-auto">
              <div className="relative bg-gradient-to-r from-slate-700 to-slate-900 rounded-lg shadow dark:bg-gray-700">
                <button
                  onClick={handlePopupCancel}
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div className="p-6 text-center">
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="text-lg font-normal text-red-600 dark:text-gray-400">
                    403 Not authorized !!
                  </h3>
                  <h5 className="mb-3 text-white">Please try to login again</h5>
                  <Link to="/login" onClick={handlePopupCancel}>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      className="text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      Ok
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="grid md:grid-cols-6 bg-slate-900">
        <div className="md:col-span-1">
          <nav className="relative text-right md:fixed md:w-2/12 z-10">
            <div className="md:p-4 min-w-[230px] bg-slate-900 border-r border-slate-800">
              <ul
                className="text-sm h-screen shadow-slate-800 shadow-2xl mt-5 pt-14 bg-slate-900 hidden fixed md:block md:relative w-full"
                id="menu"
              >
                {user && (
                  <Link to="/profile">
                    <li className="box-border text-clip overflow-hidden select-none text-slate-100 shadow-slate-700 shadow-2xl font-normal flex flex-col items-center py-1">
                      <img
                        className="h-10 w-10 rounded-full ring-2 ring-white"
                        src={
                          user.image
                            ? `/img/${user.image}`
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                        }
                        alt=""
                      />
                      <p className="box-border py-3">{user.email}</p>
                    </li>
                  </Link>
                )}
                <Link
                  to="/"
                  className="hover:ripple-bg-cyan-500 shadow-slate-700 shadow-2xl px-4 flex justify-center hover:text-green-600 transition ease-out duration-1000"
                >
                  <li className="text-slate-100 font-normal flex justify-center items-center py-1 h-12">
                    <span className="text-base select-none">Home</span>
                    <svg
                      className="w-5 ml-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                  </li>
                </Link>
                <Link
                  to="/community"
                  className="hover:ripple-bg-cyan-500 shadow-slate-700 shadow-2xl px-4 flex justify-center transition ease-out duration-1000"
                >
                  <li className="py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                    <span className="select-none text-base hover:text-yellow-500 transition ease-in duration-700">
                      Community
                    </span>
                  </li>
                </Link>
                <Link
                  to="/likedVideos"
                  className="hover:ripple-bg-cyan-500 shadow-slate-700 shadow-2xl px-4 flex justify-center transition ease-out duration-1000"
                >
                  <li className="select-none py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                    <span className="break-normal text-base text-center hover:text-lime-700 transition ease-in duration-700">
                      Liked videos
                    </span>
                  </li>
                </Link>
                <Link
                  to="/history"
                  className="hover:ripple-bg-cyan-500 shadow-slate-700 shadow-2xl px-4 flex justify-center transition ease-out duration-1000"
                >
                  <li className="select-none py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                    <span className="text-base hover:text-teal-500 transition ease-in duration-700">
                      History
                    </span>
                  </li>
                </Link>
                <Link
                  to="/genre"
                  className="hover:ripple-bg-cyan-500 shadow-slate-700 shadow-2xl px-4 flex justify-center transition ease-out duration-1000"
                >
                  <li className="select-none py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                    <span className="text-base hover:text-indigo-800 transition ease-in duration-700">
                      Genre
                    </span>
                  </li>
                </Link>
                <Link
                  to="/followers"
                  className="hover:ripple-bg-cyan-500 shadow-slate-700 shadow-2xl px-4 flex justify-center transition ease-out duration-1000"
                >
                  <li className="select-none py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                    <span className="text-base hover:text-fuchsia-800 transition ease-in duration-700">
                      Following
                    </span>
                  </li>
                </Link>
                <li className="select-none py-1 font-normal flex justify-center items-center text-slate-100 h-12 md:hidden">
                  {!user && (
                    <Link to="/login" className="px-4 flex justify-center">
                      <span className="text-base">Login</span>
                    </Link>
                  )}
                  {user && (
                    <Link
                      onClick={handleLogout}
                      className="px-4 flex justify-center text-slate-100"
                    >
                      <span className="text-base select-none">Logout</span>
                    </Link>
                  )}{" "}
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <main className="fixed bg-transparent md:px-16 md:col-span-10 backdrop-blur-sm bg-slate-900 border-b border-slate-800 md:fixed flex justify-between w-full z-20 shadow-inner shadow-cyan-800">
          <h1 className="font-bold uppercase p-4 select-none animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            <Link
              to="/"
              className="hover:text-sky-500 tracking-widest transition ease-out duration-1000"
            >
              Skrillz
              <span className="inline-block animate-bounce text-cyan-600 pl-1">
                <IoGameControllerOutline />
              </span>
            </Link>
          </h1>
          <div className="search_nav flex justify-between items-center h-14">
            <div className="search_input md:w-96 drop-shadow-lg">
              <form className="flex items-center" onSubmit={handleSubmit}>
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    id="simple-search"
                    className="bg-gray-900 border border-gray-300 text-cyan-600 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="p-2.5 text-sm font-medium text-white bg-cyan-600 rounded-r-lg border border-cyan-50 hover:bg-cyan-900 focus:ring-4 focus:outline-none focus:ring-cyan-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </form>
            </div>
          </div>

          <div className="flex items-center select-none">
            {!user && (
              <Link
                to="/login"
                className="hidden shadow-slate-700 shadow-2xl border btn p-1 text-slate-100 rounded hover:bg-sky-500 hover:text-slate-100 transition ease-out duration-1000 md:block"
              >
                Log in
              </Link>
            )}

            {user && (
              <Link
                onClick={handleLogout}
                className="hidden btn p-1 text-slate-100 rounded border hover:bg-sky-500 hover:text-slate-100 transition ease-out duration-1000 md:block"
              >
                Logout
              </Link>
            )}

            <div className="flex justify-between items-center md:justify-center">
              <div
                className="px-4 cursor-pointer md:hidden"
                id="burger"
                onClick={handleMenu}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Navbar;
