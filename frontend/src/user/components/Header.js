const Header = () => {
  return (
    <div className="md:col-span-1 md:flex md:justify-center">
      <nav className="relative min-w-150 text-right md:fixed md:w-2/12 z-10">
        <ul
          className="text-sm h-screen mt-14 pt-7 bg-slate-900 hidden fixed border-r border-gray-100 md:block md:relative w-full"
          id="menu"
        >
          <li className="text-gray-700 font-bold py-1 h-12">
            <Link to="/" className="px-4 flex justify-center">
              <span className="text-base">Home</span>
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
              <span className="text-base">Community</span>
            </Link>
          </li>
          <li className="py-1 font-bold text-gray-700 h-12">
            <Link href="#" className="px-4 flex justify-center">
              <span className="text-base text-center">Liked videos</span>
            </Link>
          </li>
          <li className="py-1 font-bold text-gray-700 h-12">
            <Link href="#" className="px-4 flex justify-center">
              <span className="text-base">History</span>
            </Link>
          </li>
          <li className="py-1 font-bold text-gray-700 h-12">
            <Link href="#" className="px-4 flex justify-center">
              <span className="text-base">Categories</span>
            </Link>
          </li>
          <li className="py-1 font-bold text-gray-700 h-12">
            <Link href="#" className="px-4 flex justify-center">
              <span className="text-base">Following</span>
            </Link>
          </li>
          <li className="py-1 font-bold text-gray-700 h-12 md:hidden">
            <Link href="#" className="px-4 flex justify-end">
              <span className="text-base">Login</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
