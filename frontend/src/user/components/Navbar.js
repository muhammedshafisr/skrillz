import { useEffect } from "react";
import { Link } from "react-router-dom";
import { removeError, setUser } from "../../redux/ducks/user";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserLogin.user);

  function handleMenu() {
    const menu = document.querySelector("#menu");

    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  }

  const handleLogout = () => {
    console.log("hello");
    // removing user from local storage and global state
    localStorage.removeItem("user");
    dispatch(setUser(undefined));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch(setUser(user));
      dispatch(removeError());
    }
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-6 bg-slate-900">
        <div className="md:col-span-1 md:flex md:justify-center z-10">
          <nav className="relative min-w-150 text-right md:fixed md:w-2/12 z-10">
            <div className="md:p-4 bg-slate-900">
            <ul
              className="text-sm h-screen shadow-slate-800 shadow-2xl mt-14 pt-7 bg-slate-900 hidden fixed border-r border-slate-800 md:block md:relative w-full"
              id="menu"
            >
              <li className="text-slate-100 shadow-slate-700 shadow-2xl font-normal flex justify-center items-center py-1 h-12">
                <Link
                  to="/"
                  className="px-4 flex justify-center hover:text-green-600 transition ease-in duration-500"
                >
                  <span className="text-base select-none">Home</span>
                  <svg
                    className="w-5 ml-2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </Link>
              </li>
              <li className="shadow-slate-700 shadow-2xl py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                <Link href="#" className="px-4 flex justify-center">
                  <span className="select-none text-base hover:text-yellow-500 transition ease-in duration-700">
                    Community
                  </span>
                </Link>
              </li>
              <li className="select-none shadow-slate-700 shadow-2xl py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                <Link href="#" className="px-4 flex justify-center">
                  <span className="break-normal text-base text-center hover:text-lime-700 transition ease-in duration-700">
                    Liked videos 
                  </span>
                </Link>
              </li>
              <li className="select-none shadow-slate-700 shadow-2xl py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                <Link href="#" className="px-4 flex justify-center">
                  <span className="text-base hover:text-teal-500 transition ease-in duration-700">
                    History
                  </span>
                </Link>
              </li>
              <li className="select-none shadow-slate-700 shadow-2xl py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                <Link href="#" className="px-4 flex justify-center">
                  <span className="text-base hover:text-indigo-800 transition ease-in duration-700">
                    Categories
                  </span>
                </Link>
              </li>
              <li className="select-none shadow-slate-700 shadow-2xl py-1 font-normal flex justify-center items-center text-slate-100 h-12">
                <Link href="#" className="px-4 flex justify-center">
                  <span className="text-base hover:text-fuchsia-800 transition ease-in duration-700">
                    Following
                  </span>
                </Link>
              </li>
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
                )}
              </li>
            </ul>
            </div>
          </nav>
        </div>

        <main className="fixed bg-transparent md:px-16 md:col-span-10 backdrop-blur-sm bg-slate-900 border-b border-slate-800 md:fixed flex justify-between w-full z-20">
          <h1 className="font-bold uppercase p-4 select-none">
            <Link
              href="/"
              className="text-slate-100 hover:text-sky-500 tracking-widest transition ease-out duration-700"
            >
              Skrillz
            </Link>
          </h1>
          <div className="search_nav flex justify-between items-center h-14">
            <div className="search_input md:w-96 drop-shadow-lg">
              <label className="relative block select-none">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-6 text-gray-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </span>
                <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-slate-700 hover:bg-slate-600 w-full rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search ..."
                  type="text"
                  name="search"
                />
              </label>
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
                className="hidden btn p-1 text-slate-100 rounded hover:bg-sky-500 hover:text-slate-100 transition ease-out duration-1000 md:block"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
