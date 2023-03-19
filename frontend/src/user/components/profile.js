import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addCover,
  getProfile,
  removeCover,
  setProfile,
  updateCover,
} from "../../redux/ducks/profile";
import UploadModal from "./uploadModal";
import VideoSection from "./profileVideoManager";
import { useEffect } from "react";
import axios from "axios";
import { setVideos } from "../../redux/ducks/video";


const UserProfile = () => {
  const user = useSelector((state) => state.UserLogin.user);
  const dispatch = useDispatch();
  const index = user?.email?.indexOf("@");
  const userName = user?.email?.slice(0, index);
  const token = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.request({
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
          method: "GET",
          url: "http://localhost:8080/api/user/profile",
        });

        // use it when add saga ...
        // dispatch(getProfile(token.token))

        dispatch(setVideos(data))
      } catch (error) {
        console.log(error);
      }
    })();
  });

  const handlePopup = () => {
    document.querySelector("#popup-modal").classList.remove("collapse");
  };

  const handlePopupCancel = () => {
    document.querySelector("#popup-modal").classList.add("collapse");
  };

  const handleDelete = async () => {
    document.querySelector("#popup-modal").classList.add("collapse");
    // deleting cover
    dispatch(removeCover(token.token));
  };

  const handleChangeCover = async () => {
    CancelShowSaveButton();
    const cover_image = document.querySelector("#file-upload").files[0].name;

    dispatch(updateCover(cover_image, token.token));
  };

  const handleAddCover = async () => {
    const cover_image = document.querySelector("#addCover_inp").files[0].name;

    dispatch(addCover(cover_image, token.token));
  };

  const showSaveButton = () => {
    document.querySelector(".saveButton").classList.remove("collapse");
  };
  const CancelShowSaveButton = () => {
    document.querySelector(".saveButton").classList.add("collapse");
  };

  const showUploadModal = () => {
    document.querySelector("#uploadModal").classList.remove("collapse");
  };

  return (
    <>
      <UploadModal />

      <div
        id="popup-modal"
        tabindex="-1"
        className="flex justify-center collapse fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:w-full md:inset-0 h-modal md:h-full"
      >
        <div className="relative w-8/12 md:w-full h-full max-w-md md:h-auto">
          <div className="relative bg-gradient-to-r from-cyan-600 to-slate-900 rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={handlePopupCancel}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                Are you sure you want to delete this?
              </h3>
              <button
                onClick={handleDelete}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={handlePopupCancel}
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="img_container">
        {!user?.cover_image && (
          <>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-slate-500 px-6 pt-5 pb-6">
              <form className="flex items-center space-x-6">
                <label className="block">
                  <input
                    id="addCover_inp"
                    onClick={showSaveButton}
                    type="file"
                    className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "
                  />
                </label>
              </form>
            </div>
            <div
              id="saveButton"
              className="flex justify-center pt-4 collapse saveButton"
            >
              <button
                onClick={handleAddCover}
                className="select-none text-neutral-50 bg-sky-500 w-16 h-8 rounded hover:bg-sky-600 active:bg-sky-300 focus:outline-none focus:ring focus:ring-green-400 transition ease-in-out duration-1000"
              >
                Save
              </button>
              <button
                onClick={CancelShowSaveButton}
                className="select-none ml-3 text-neutral-50 bg-sky-500 w-16 h-8 rounded hover:bg-sky-600 active:bg-sky-300 focus:outline-none focus:ring focus:ring-green-400 transition ease-in-out duration-1000"
              >
                Cancel
              </button>
            </div>
          </>
        )}
        {user?.cover_image && (
          <>
            <img
              className="h-48 w-screen md:h-72"
              src={`/img/${user.cover_image}`}
              alt="Cover_pic"
            />

            <div className="flex justify-end">
              <div className="flex text-sm text-gray-600">
                <label
                  onClick={showSaveButton}
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-slate-500 ml-2 cursor-pointer"
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
              </div>
              <div
                className="ml-3 text-gray-600 cursor-pointer"
                onClick={handlePopup}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </div>
            </div>
            <div
              id="saveButton_"
              className="flex justify-center pt-4 collapse saveButton"
            >
              <button
                onClick={handleChangeCover}
                className="select-none text-neutral-50 bg-sky-500 w-16 h-8 rounded hover:bg-sky-600 active:bg-sky-300 focus:outline-none focus:ring focus:ring-green-400 transition ease-in-out duration-1000"
              >
                Save
              </button>
              <button
                onClick={CancelShowSaveButton}
                className="select-none ml-3 text-neutral-50 bg-sky-500 w-16 h-8 rounded hover:bg-sky-600 active:bg-sky-300 focus:outline-none focus:ring focus:ring-green-400 transition ease-in-out duration-1000"
              >
                Cancel
              </button>
            </div>
          </>
        )}
        <div className="flex justify-between mt-5">
          <div className="flex">
            <span className="text-slate-400 select-none">@ {userName}</span>
            <Link to="/profile/edit_profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-slate-500 ml-2 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Link>
          </div>
          <button
            onClick={showUploadModal}
            className="select-none text-sky-500 p-1 shadow-slate-900 shadow-md hover:ripple-bg-slate-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            Upload video
          </button>
        </div>
        <div className="flex pt-9 md:p-9 border-b border-slate-800">
          <VideoSection />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
