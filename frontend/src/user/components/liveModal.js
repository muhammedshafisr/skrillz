import axios from "axios";
import { useState } from "react";
import { setProfile } from "../../redux/ducks/profile";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LiveModal = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const hideUploadModal = () => {
    document.querySelector("#liveModal").classList.add("collapse");
  };

  const handleImageSet = (e) => {
    const imgInp = document.querySelector("#imgInp").files[0];
    setThumbnail(imgInp.name);

  }

  const handleNext = async (e) => {
    e.preventDefault();
    
    try {
        const { data } = await axios.request({
            headers: {"Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`},
            method: "post",
            data: JSON.stringify({ thumbnail, description }),
            url: "http://localhost:8080/api/user/profile/live_setUp"
        });

        if(data.status) {
            hideUploadModal();
            navigate("/live_now");
        }

    } catch (error) {
        console.log(error);
    }


  }

  return (
    <>
      <div
        id="liveModal"
        data-modal-backdrop="static"
        tabindex="-1"
        aria-hidden="false"
        className="fixed flex collapse justify-center items-center top-0 z-50 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto min-h-full"
      >
        <div className="relative  shadow-cyan-600 shadow-md w-full h-auto max-w-2xl md:h-auto">
          <div className="relative rounded-lg shadow dark:bg-gray-700">
            <div class="flex py-2 items-center z-50 border-b border-slate-700 justify-between rounded-t bg-gray-900">
              <h1 className="text-base px-5 text-white font-bold">
                Setup Live
              </h1>
              <button
                type="button"
                onClick={hideUploadModal}
                class="text-gray-400 bg-transparent hover:bg-cyan-600 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="staticModal"
              >
                <svg
                  class="w-5 h-5"
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
            </div>

            <div className="bg-slate-900 px-3">
              <div className="container mx-auto">
                <div className="max-w-sm mx-auto md:max-w-lg">
                  <div className="w-full">
                    <div className="py-3 rounded">
                      <form id="uploadForm" onSubmit={handleNext}>
                        <div className="flex justify-center items-center">
                          <div className="mb-3 w-full">
                            <label class="block min-w-[120px] max-w-[120px] h-8 cursor-pointer">
                              <input
                                type="file"
                                id="imgInp"
                                onChange={(e) => handleImageSet(e)}
                                class="hidden w-10 h-10 text-sm text-gray-500 file:py-2 file:px-6 file:rounded file:border-1 file:border-gray-400"
                              />
                              <span className="w-10 h-10 select-none text-sky-500 p-1 shadow-cyan-600 shadow-md hover:ripple-bg-slate-800">
                                Add Thumbnail
                              </span>
                            </label>
                          </div>
                          <div>
                            <img src= {`/img/${thumbnail}`} alt="" />
                          </div>
                        </div>
                        <div className="py-4">
                          <input
                            value={ description }
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control
                            block
                            w-full
                            mt-2
                            text-sm
                            font-normal
                             text-gray-700
                             bg-slate-800 bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                             focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="text"
                            placeholder="Description"
                          />
                        </div>
                        <div className="flex justify-center pb-4">
                          {!loading && (
                            <button className="select-none text-sky-500 p-1 px-4 shadow-cyan-600 shadow-md hover:ripple-bg-slate-800">
                              Next
                            </button>
                          )}
                          {loading && (
                            <button
                              disabled
                              className="select-none text-sky-500 p-1 pl-3 shadow-cyan-600 shadow-md hover:ripple-bg-slate-800"
                            >
                              Please wait
                              <span class="pl-3 h-3 w-3">
                                <span class="animate-ping inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
                                <span class="relative right-3 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                              </span>
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveModal;
