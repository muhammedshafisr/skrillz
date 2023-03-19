import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeImage, updateProfile } from "../../redux/ducks/profile";
import PopUpModalDelete from "./popupModalDelete";
import PopUpModalSuccess from "./popupModalSuccess";

const EditProfileSection = () => {
  const user = useSelector((state) => state.UserLogin.user);
  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [address, setAddress] = useState(
    user?.address ? user.address : "Add address"
  );
  const token = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = document.querySelector("#file-upload")?.files[0]?.name;

    const data = {
      firstname,
      lastname,
      address,
      image,
    };

    dispatch(updateProfile(data, token.token));
  };

  const handlePopupDelete = () => {
    document.querySelector("#popup-modal-delete").classList.remove("collapse");
  };

  const handleRemoveProfile = async () => {
    // deleting profile picture
    dispatch(removeImage(token.token));
  };

  return (
    <>
      <PopUpModalSuccess />
      <PopUpModalDelete delete={handleRemoveProfile} />

      <div className="section_padder mr-3 my-16 ml-2 md:my-16 md:ml-60 md:mr-4">
        <div className="flex flex-col items-center pt-5">
          <div>
            {user?.image && (
              <>
                <img
                  className="h-24 w-24 rounded-full ring-2 ring-cyan-600 mb-2 bg-cover bg-center"
                  src={`/img/${user?.image}`}
                  alt=""
                />
                <div className="px-3 pb-4 text-gray-600 cursor-pointer flex justify-between">
                  <label
                    htmlFor="file-upload"
                    className="inline-block cursor-pointer rounded-md bg-slate-900 font-medium text-indigo-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-slate-500 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 inline-block"
                    onClick={handlePopupDelete}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </div>
              </>
            )}
            {!user?.image && (
              <div className="my-2 flex justify-center rounded-md border-2 border-dashed border-slate-600">
                <div className="space-y-1 text-center">
                  
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium"
                    >
                      <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="block w-full text-sm text-slate-500"
              
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
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
                  id="first_name"
                  class="bg-gray-700 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="firstname"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
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
                  id="last_name"
                  class="bg-gray-700 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="lastname"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  class="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="company"
                  class="cursor-not-allowed bg-gray-700 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                  name="email"
                  value={user?.email}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  class="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  class="cursor-not-allowed bg-gray-700 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                  name="phone"
                  value={user?.phone}
                  required
                />
              </div>
            </div>
            <div class="mb-6 w-full">
              <label
                htmlFor="email"
                class="block w-full mb-2 text-sm font-medium text-gray-500 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                id="email"
                class="bg-gray-700 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
              />
            </div>

            <button
              type="submit"
              class="select-none text-neutral-50 rounded-md shadow-cyan-800 bg-sky-500 w-32 h-8  hover:bg-sky-600 active:bg-sky-300 focus:outline-none focus:ring focus:ring-green-400 transition ease-in-out duration-1000"
            >
              Save Changes
            </button>
            <div className="flex justify-end w-full mt-3 text-slate-100">
              <Link
                className="hover:text-blue-700"
                to="/profile/edit_profile/change_password"
              >
                Change password ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileSection;

export const handleSuccess = (head, body) => {
  const popup_modal = document.querySelector("#popup-modal-success");
  const popup_head = document.querySelector("#popup-head");
  const popup_body = document.querySelector("#popup-body");

  popup_modal.classList.remove("collapse");
  popup_head.innerHTML = head;
  popup_body.innerHTML = body;
};
