import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFollowers, getUnFollow } from "../../redux/ducks/follow";

const Follows = () => {
  const dispatch = useDispatch();
  const { followList } = useSelector((state) => state);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getFollowers(user.token));
  }, []);

  const handleUnFollow = (id) => {
    dispatch(getUnFollow(id, user.token))
  };
  
  return (
    <>
      {followList.followers === null ?

        <div role="status" className="w-full animate-pulse p-4 bg-slate-900 shadow-cyan-600 shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>

     : followList &&
      <div className="mx-auto">
        <div className="p-4 bg-slate-900 shadow-cyan-600 shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flow-root">

            <ul className="divide-y divide-cyan-400 dark:divide-gray-700">
              {followList.followers.result === "no results" ? (
                <h1 className="text-center text-white">Currently no followers</h1>
              ) :
                followList?.followers.map((x, index) => (
                  <li className="py-5" key={index}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={`/img/${x.image
                            ? x.image
                            : "blank-profile-picture-973460_640.webp"
                            }`}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate dark:text-white">
                          {x.firstname + " " + x.lastname}
                        </p>
                        <p className="text-sm text-cyan-500 truncate dark:text-gray-400">
                          {x.email}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold justify-center w-2/12 md:w-1/12">
                        <button
                          onClick={() => handleUnFollow(x._id)}
                          className="text-sky-500 p-1 shadow-cyan-600 shadow-md hover:ripple-bg-slate-800"
                        >
                          Unfollow
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    }
      
    </>
  );
};

export default Follows;