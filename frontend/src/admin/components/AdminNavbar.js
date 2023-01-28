import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setAdminAuthError, setAuthAdmin } from "../../redux/ducks/adminAuth";
import { useDispatch, useSelector } from "react-redux"

const AdminNavbar = () => {

  const admin = useSelector((state) => state.AdminAuth.admin);
  const dispatch = useDispatch();


  function handleMenu() {
    const menu = document.querySelector("#menu");

    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  }

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'));

    if (admin) {
      dispatch(setAuthAdmin(admin));
      dispatch(setAdminAuthError({undefined}));
    }
  }, [])

  const handleLogout = () => {

    // removing user from local storage and global state
    localStorage.removeItem('admin');
    dispatch(setAuthAdmin(undefined));

  }


    return (
        <>
        <div className="grid md:grid-cols-6 bg-slate-900">
        <div className="md:col-span-1 md:flex md:justify-center">
          { admin && 
          <nav className="relative min-w-150 text-right md:fixed md:w-2/12 z-10">
            <ul
              className="text-sm h-screen mt-14 pt-7 bg-slate-900 hidden fixed border-r border-slate-800 md:block md:relative w-full"
              id="menu"
            >
              <li className="text-gray-700 font-bold py-1 h-12">
                <Link to="/admin" className="px-4 flex justify-center">
                  <span className="text-base">Dashboard</span>
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
              <li className="py-1 font-bold text-gray-700 h-12">
                <Link href="#" className="px-4 flex justify-center">
                  <span className="text-base">Users</span>
                </Link>
              </li>
              <li className="py-1 font-bold text-gray-700 h-12">
                <Link href="#" className="px-4 flex justify-center">
                  <span className="text-base text-center">Channels</span>
                </Link>
              </li>
              <li className="py-1 font-bold text-gray-700 h-12">
                <Link href="#" className="px-4 flex justify-center">
                  <span className="text-base">Reports</span>
                </Link>
              </li>
              <li className="py-1 font-bold text-gray-700 h-12 md:hidden">
                <Link onClick={ handleLogout } className="px-4 flex justify-center">
                  <span className="text-base">Logout</span>
                </Link>
              </li>
            </ul>
          </nav> }
        </div>

        <main className="fixed md:px-16 md:col-span-10 backdrop-blur-sm bg-slate-900 border-b border-slate-800 md:fixed flex justify-between w-full z-20">
          <h1 className="font-bold uppercase p-4">
            <Link
              href="/"
              className="text-slate-100 hover:text-sky-500 tracking-widest"
            >
              Skrillz
            </Link>
          </h1>
          {/* <div className="search_nav flex justify-between items-center h-14">
            <div className="search_input md:w-96">
              <label className="relative block">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-6 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </span>
                <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search ..."
                  type="text"
                  name="search"
                />
              </label>
            </div>
          </div> */}

          <div className="flex items-center">
            {! admin && <Link
              to="/admin"
              className="hidden btn text-slate-100 rounded hover:bg-sky-500 hover:text-slate-100 transition ease-out duration-1000 md:block"
            >
              Admin
            </Link>}
            {admin && <Link
              onClick={ handleLogout }
              className="hidden btn text-slate-100 rounded hover:bg-sky-500 hover:text-slate-100 transition ease-out duration-1000 md:block"
            >
              Logout
            </Link>}
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
}
 
export default AdminNavbar;