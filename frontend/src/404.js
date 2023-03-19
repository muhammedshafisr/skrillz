import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="h-screen w-screen flex items-center">
        <div className="container min-w-full flex flex-col md:flex-row items-center justify-center px-5 text-gray-500">
        <div>
            <img className="w-60 md:w-72 lg:96" src="/img/sadface.gif" alt="" />
          </div>
          <div className="md:pl-14 lg:pl-24">
            <div className="text-5xl font-dark font-bold">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn't find this page.{" "}
            </p>
            <p className="mb-8">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>

            <Link to="/">
            <button className="select-none text-sky-500 p-1 shadow-cyan-700 shadow-md hover:ripple-bg-slate-600">
              back to homepage
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
