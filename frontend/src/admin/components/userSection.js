import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const admin = JSON.parse(localStorage.getItem('admin'))

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.request({
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin?.token}`,
          },
          method: "get",
          url: "http://localhost:8080/api/admin/user",
        });

        const userData = { users: data.data.users };

        localStorage.removeItem("usersList");

        localStorage.setItem("usersList", JSON.stringify(userData));
        setUsers(userData.users);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleBlock = async (id) => {
    try {
      const response = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
        method: "post",
        data: JSON.stringify({ id }),
        url: "http://localhost:8080/api/admin/user/block_user",
      });

      const userData = { users: response.data.users };

      localStorage.removeItem("usersList");

      localStorage.setItem("usersList", JSON.stringify(userData));
      setUsers(userData.users);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUnBlock = async (id) => {
    try {
      const response = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
        method: "post",
        data: JSON.stringify({ id }),
        url: "http://localhost:8080/api/admin/user/unblock_user",
      });

      const userData = { users: response.data.users };

      localStorage.removeItem("usersList");

      localStorage.setItem("usersList", JSON.stringify(userData));
      setUsers(userData.users);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="relative bg-slate-900 md:pr-3">
        <div className="bg-slate-900 flex items-center justify-between pb-4  dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
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
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-gray-400 border border-slate-500 rounded-lg w-80 bg-slate-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <table className="overflow-scroll w-full bg-slate-900 text-sm text-left text-gray-300 border dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!users && 
            <>
            <h1>No users</h1>
            </>
            }
            {users && users.map((x) => {
              return (
                <tr className="bg-slate-900 border-b dark:bg-gray-800 dark:border-gray-700">
                  <th>
                    <div className="pl-3">
                      <Link to={`/admin/user/${x._id}`}>
                      <div className="text-base font-semibold">{x.firstname + " " + x.lastname}</div>
                      </Link>
                    </div>
                  </th>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 whitespace-nowrap dark:text-white"
                  >

                    <div className="pl-3">
                      <div className="text-base font-semibold">{x.email}</div>
                    </div>
                  </th>
                  <td className="px-4 py-4">{x.phone}</td>
                  <td className="px-6 py-4">
                    {x.status === "active" && <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                      Active
                    </div>}
                    {x.status === "blocked" && <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-600 mr-2"></div>{" "}
                      Blocked
                    </div>}
                  </td>
                  <td className="py-4">
                    <Link
                      to={`/admin/user/edit_user/${x._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit user
                    </Link>
                    {x.status === "active" &&
                      <> <span className="pl-4 text-red-600 cursor-pointer" onClick={() => handleBlock(x._id)}>
                        block<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 inline">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      </span> </>
                    }
                    {x.status === "blocked" &&
                      <> <span className="pl-4 text-green-600 cursor-pointer" onClick={() => handleUnBlock(x._id)}>
                        active<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 inline">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>

                      </span> </>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
