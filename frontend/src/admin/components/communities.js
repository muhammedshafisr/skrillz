import { useEffect, useState } from "react";
import axios from "axios";

const CommunitySection = () => {
  const [community, setCommunity] = useState(null);
  const admin = JSON.parse(localStorage.getItem('admin'))

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.request({
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin?.token}`,
          },
          method: "get",
          url: `http://localhost:8080/api/admin/communities`,
        });

        console.log(data);
        setCommunity(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleStatus = async (id, status) => {
    try {
        const { data } = await axios.request({
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin?.token}`,
          },
          method: "POST",
          data: JSON.stringify({ id, status}),
          url: `http://localhost:8080/api/admin/communities/change_status`,
        });

        console.log(data);
        setCommunity(data);
      } catch (err) {
        console.log(err);
      }
  }

  return (
    <>
      <div className="mx-auto">
        <div className="p-4 shadow-cyan-600 shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flow-root">
            <ul className="divide-y divide-cyan-400 dark:divide-gray-700">
              {!community && (
                <h1 className="text-center text-white">No result found</h1>
              )}
              {community &&
                community.map((x) => (
                  <li className="py-5">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={`/img/${x.image}`}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate dark:text-white">
                          {x.communityName}
                        </p>
                        <p className="text-sm text-cyan-500 truncate dark:text-gray-400">
                          {x.members.length} members
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold justify-center w-2/12 md:w-1/12">
                        {x.status && (
                          <button onClick={(e) => handleStatus(x._id, x.status)} className="select-none text-sky-500 p-1 shadow-slate-900 shadow-md hover:ripple-bg-slate-600">
                            Block
                          </button>
                        )}

                        {!x.status && (
                          <button onClick={(e) => handleStatus(x._id, x.status)} className="select-none text-sky-500 p-1 shadow-slate-900 shadow-md hover:ripple-bg-slate-600">
                            Unblock
                          </button>
                        )}
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

export default CommunitySection;
