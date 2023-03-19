import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const SearchSection = () => {
  const { name } = useParams();
  const [searchItems, setSearchItems] = useState(null);
  const admin = JSON.parse(localStorage.getItem('admin'))


  useEffect(() => {
    (async () => {
      const { data } = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
        method: "get",
        url: `http://localhost:8080/api/admin/search?name=${name}`,
      });
      setSearchItems(data);
      console.log(data);
    })();
  }, [name]);
  return (
    <>
      <div className="mx-auto">
        <div className="p-4 shadow-cyan-600 shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flow-root">
            <ul className="divide-y divide-cyan-400 dark:divide-gray-700">
              {searchItems?.length < 1 && (
                <h1 className="text-center text-white">No result found</h1>
              )}
              {searchItems?.length > 0 &&
                searchItems?.map((x, index) => (
                  <li className="py-5" key={index}>
                    <div className="flex">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex-shrink-0">
                          <Link to={`/admin/reports/viewDetails/${x._id}`}>
                            <img
                              className="h-24 md:h-40 w-full object-cover"
                              src={`/img/${x?.video?.thumbnail}`}
                              alt=""
                            />
                          </Link>
                        </div>
                      </div>

                      <div className="text-base font-semibold mx-14 md:mx-32">
                        <h1 className="text-cyan-500 font-bold text-lg">{x?.video?.name}</h1>
                        <h1 className="text-slate-400 font-medium text-base">{x?.video?.description}</h1>
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

export default SearchSection;
