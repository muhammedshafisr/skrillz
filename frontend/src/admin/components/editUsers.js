import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserEdit = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request({
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin?.token}`,
          },
          method: "get",
          url: `http://localhost:8080/api/admin/user/get_editUser/${id}`,
        });

        const userData = response.data.user;
        setFirstname(userData.firstname);
        setLastname(userData.lastname);
        setEmail(userData.email);
        setPhone(userData.phone);

        console.log(userData);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
        method: "post",
        data: JSON.stringify({ firstname, lastname, email, phone }),
        url: `http://localhost:8080/api/admin/user/editUser/${id}`,
      });

      const userData = response.data.user;
      setFirstname(userData.firstname);
      setLastname(userData.lastname);
      setEmail(userData.email);
      setPhone(userData.phone);
      document.querySelector("#success_log").classList.remove("hidden");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="section_padder mr-3 my-16 ml-2 md:my-24 md:ml-40 md:mr-4 bg-slate-900">
        <div className="flex flex-col items-center pt-5">
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <h1 className="font-normal text-xl subpixel-antialiased text-slate-50 select-none mb-2">
              Edit user
            </h1>
            <h2 id="success_log" className="text-green-600 hidden">
              Successfully updated
            </h2>
            <div class="grid gap-6 mb-6 grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  class="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                >
                  First name
                </label>
                <input
                  type="text"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  id="first_name"
                  class="bg-gray-700 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="firstname"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  class="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                >
                  Last name
                </label>
                <input
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  id="last_name"
                  class="bg-gray-700 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="lastname"
                  required
                />
              </div>
            </div>
            <div class="mb-6 w-full">
              <label
                htmlFor="email"
                class="block w-full mb-2 text-sm font-medium text-gray-500 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                class="bg-gray-700 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="address"
                required
              />
            </div>
            <div class="mb-6 w-full">
              <label
                htmlFor="email"
                class="block w-full mb-2 text-sm font-medium text-gray-500 dark:text-white"
              >
                Phone
              </label>
              <input
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                class="bg-gray-700 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="address"
                required
              />
            </div>

            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-4/12 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserEdit;
