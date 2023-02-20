import { useDispatch, useSelector } from "react-redux";
import { getFollow } from "../../redux/ducks/follow";

const SearchList = () => {
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.searchList.searchList);
  const token = JSON.parse(localStorage.getItem("user"));
  console.log(searchList);
  const handleFollow = (id) => {
    dispatch(getFollow(id, token?.token));
  };

  return (
    <>
      <div className="mx-auto">
        <div className="p-4 bg-slate-900 shadow-cyan-600 shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flow-root">
            <ul className="divide-y divide-cyan-400 dark:divide-gray-700">
              {!searchList && (
                <h1 className="text-center text-white">No result found</h1>
              )}
              {searchList?.following?.map((x, index) => (
                <li className="py-5" key={index}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={`/img/${
                          x.image
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
                        onClick={() => handleFollow(x._id)}
                        className="text-sky-500 p-1 shadow-cyan-600 shadow-md hover:ripple-bg-slate-800"
                      >
                        Unfollow
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {searchList?.notFollowing?.map((x, index) => (
                <li className="py-5" key={index}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={`/img/${
                          x.image
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
                        onClick={() => handleFollow(x._id)}
                        className="text-sky-500 p-1 shadow-cyan-600 shadow-md hover:ripple-bg-slate-800"
                      >
                        Follow
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchList;
