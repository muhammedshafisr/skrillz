import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { setAdminAuthError, setAuthAdmin } from "../../redux/ducks/adminAuth";
import { useDispatch, useSelector } from "react-redux";
import { IoGameControllerOutline } from "@react-icons/all-files/io5/IoGameControllerOutline";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const admin = useSelector((state) => state.AdminAuth.admin);

  function handleMenu() {
    const menu = document.querySelector("#menu");

    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  }

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    if (admin) {
      dispatch(setAuthAdmin(admin));
      dispatch(setAdminAuthError({ undefined }));
    }
  }, [dispatch]);

  const handleLogout = () => {
    // removing user from local storage and global state
    localStorage.removeItem("admin");
    dispatch(setAuthAdmin(undefined));
  };

  return (
    <>
      <div className="grid md:grid-cols-6 bg-slate-900">
        <div className="md:col-span-1">
          {admin && (
            <nav className="relative text-right md:fixed md:w-2/12 z-10">
              <div className="md:p-4 min-w-[230px] bg-slate-900 border-r border-slate-800">
                <ul
                  className="text-sm h-screen shadow-slate-800 shadow-2xl mt-5 pt-14 bg-slate-900 hidden fixed md:block md:relative w-full"
                  id="menu"
                >
                  <Link
                    to="/admin"
                    className="hover:ripple-bg-cyan-500 shadow-slate-700 shadow-2xl px-4 flex justify-center hover:text-green-600 transition ease-out duration-1000"
                  >
                    <li className="text-slate-100 font-normal flex justify-center items-center py-1 h-12">
                      <span className="font-bold text-base select-none gradient__text">
                        Dashboard
                      </span>
                      <svg
                        className="w-5 ml-2 text-green-500"
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
                    to="/admin/user"
                    className="hover:ripple-bg-cyan-500 shadow-slate-700 shadow-2xl px-4 flex justify-center transition ease-out duration-1000"
                  >
                    <li className="py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                      <span className="select-none font-bold text-base gradient__text">
                        Users
                      </span>
                    </li>
                  </Link>
                  <Link
                    to="/admin/videos"
                    className="hover:ripple-bg-cyan-500 shadow-slate-700 shadow-2xl px-4 flex justify-center transition ease-out duration-1000"
                  >
                    <li className="select-none py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                      <span className="break-normal font-bold text-base text-center gradient__text">
                        Videos
                      </span>
                    </li>
                  </Link>
                  <Link
                    to="/admin/live"
                    className="hover:ripple-bg-cyan-500 shadow-slate-700 shadow-2xl px-4 flex justify-center transition ease-out duration-1000"
                  >
                    <li className="select-none py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                      <span className="break-normal font-bold text-base text-center gradient__text">
                        Live
                      </span>
                    </li>
                  </Link>
                  <Link
                    to="/admin/communities"
                    className="hover:ripple-bg-cyan-500 shadow-slate-700 shadow-2xl px-4 flex justify-center transition ease-out duration-1000"
                  >
                    <li className="select-none py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                      <span className="font-bold text-base gradient__text">
                        Communities
                      </span>
                    </li>
                  </Link>
                  <Link
                    to="/admin/reports"
                    className="hover:ripple-bg-cyan-500 shadow-slate-700 shadow-2xl px-4 flex justify-center transition ease-out duration-1000"
                  >
                    <li className="select-none py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                      <span className="font-bold text-base gradient__text">
                        Reports
                      </span>
                    </li>
                  </Link>
                  <li className="select-none py-1 font-normal flex justify-center items-center text-slate-100 h-12 md:hidden">
                    <Link
                      onClick={handleLogout}
                      className="px-4 flex justify-center"
                    >
                      <span className="text-base">Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          )}
        </div>

        <main className="fixed bg-transparent md:px-16 md:col-span-10 backdrop-blur-sm bg-slate-900 border-b border-slate-800 md:fixed flex justify-between w-full z-20 shadow-inner shadow-cyan-800">
          <h1 className="font-bold uppercase p-4 select-none animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            <Link
              to="/admin"
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
              <form className="flex items-center">
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
                <Link to={`/admin/search/${searchText}`}>
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
                </Link>
              </form>
            </div>
          </div>

          <div className="flex items-center select-none">
            {!admin && (
              <Link
                to="/admin"
                className="hidden shadow-slate-700 shadow-2xl border btn p-1 text-slate-100 rounded hover:bg-sky-500 hover:text-slate-100 transition ease-out duration-1000 md:block"
              >
                Admin
              </Link>
            )}

            {admin && (
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

export default AdminNavbar;
