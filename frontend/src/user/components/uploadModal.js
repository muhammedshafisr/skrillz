import { useState } from "react";
import axios from "axios";
import { setProfile } from "../../redux/ducks/profile";
import { useDispatch } from "react-redux";
import { setVideos } from "../../redux/ducks/video";

const UploadModal = () => {
  const [video, setVideo] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, Setloading] = useState(false);
  const [nameRequired, setNameRequired] = useState(null);
  const [descriptionRequired, setDescriptionRequired] = useState(null);
  const [imageRequired, setImageRequired] = useState(null);
  const [select, setSelect] = useState("Role play");
  const [videoRequired, setVideoRequired] = useState(null);
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("user"));

  const hideUploadModal = () => {
    document.querySelector("#uploadModal").classList.add("collapse");
  };

  const handleImageSet = (e) => {
    const imgInp = document.querySelector("#thumbInp").files[0];
    setThumbnail(imgInp.name);
  };

  const handleUploadVideo = async (e) => {
    e.preventDefault();
    setNameRequired("");
    setDescriptionRequired("");
    setImageRequired("");
    setVideoRequired("");

    if (!name.trim().length) {
      return setNameRequired("Input box cannot be empty !");
    } else if (!description.trim().length) {
      return setDescriptionRequired("Input box cannot be empty !");
    } else if (!thumbnail.trim().length) {
      return setImageRequired("Thumbnail is required !");
    } else if (!/\.(jpg|jpeg|png|gif)$/i.test(thumbnail)) {
      return setImageRequired("Sorry ! thumbnail only accept images");
    } 
    // else if (!/\.(mp4|webm|ogg)$/i.test(video)) {
    //   return setVideoRequired("Sorry ! video only accept videos");
    // } 
    else {
      Setloading(true);
      const formData = new FormData();
      formData.append("videoFile", video[0]);
      formData.append("name", name);
      formData.append("thumbnail", thumbnail);
      formData.append("description", description);
      formData.append("category", select);

      try {
        const { data } = await axios.request({
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token.token}`,
          },
          data: formData,
          method: "post",
          url: "http://localhost:8080/api/user/upload_video",
        });

        Setloading(false);
        setVideo("");
        setName("");
        setDescription("");
        document.querySelector("#formFileSm").value = "";

        dispatch(setVideos(data));
        hideUploadModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div
        id="uploadModal"
        data-modal-backdrop="static"
        tabindex="-1"
        aria-hidden="false"
        className="fixed flex collapse justify-center items-center top-0 z-50 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto h-full"
      >
        <div className="relative  shadow-cyan-600 shadow-md w-full h-auto max-w-2xl md:h-auto">
          <div className="relative rounded-lg shadow dark:bg-gray-700">
            <div class="flex py-2 items-center z-50 border-b border-slate-700 justify-between rounded-t bg-gray-900">
              <h1 className="text-base px-5 text-white font-bold">
                Video uploading
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

            <div className="bg-slate-900 py-8 px-3">
              <div className="container mx-auto">
                <div className="max-w-sm mx-auto md:max-w-lg">
                  <div className="w-full">
                    <div className="py-3 rounded">
                      <form id="uploadForm" onSubmit={handleUploadVideo}>
                        <div className="flex justify-center">
                          <div className="mb-3 w-96">
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="form-control
                                                                block
                                                                w-full
                                                                mt-2
                                                                text-sm
                                                                font-normal
                                                                text-gray-700
                                                                bg-white bg-clip-padding
                                                                border border-solid border-gray-300
                                                                rounded
                                                                transition
                                                                ease-in-out
                                                                m-0
                                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              type="text"
                              placeholder="Name"
                              required
                            />
                            {nameRequired && (
                              <p className="text-red-600">{nameRequired}</p>
                            )}
                            <input
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="form-control
                                                                block
                                                                w-full
                                                                mt-2
                                                                text-sm
                                                                font-normal
                                                                text-gray-700
                                                                bg-white bg-clip-padding
                                                                border border-solid border-gray-300
                                                                rounded
                                                                transition
                                                                ease-in-out
                                                                m-0
                                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              type="text"
                              placeholder="Description"
                              required
                            />
                            {descriptionRequired && (
                              <p className="text-red-600">
                                {descriptionRequired}
                              </p>
                            )}
                            <select
                                id="underline_select"
                                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b border-gray-700 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                                onChange={(e) => setSelect(e.target.value)}
                                required
                              >
                                <option value="Role play">
                                  Role play
                                </option>
                                <option value="Action">
                                  Action
                                </option>
                                <option value="Adventure">
                                  Adventure
                                </option>
                                <option value="Strategy">
                                  Strategy
                                </option>
                                <option value="Sports">
                                  Sports
                                </option>
                              </select>
                            <div className="py-3 w-full flex items-center justify-between">
                              <label class="block min-w-[120px] max-w-[120px] h-8 cursor-pointer">
                                <input
                                  type="file"
                                  id="thumbInp"
                                  onChange={(e) => handleImageSet(e)}
                                  class="hidden w-10 h-10 text-sm text-gray-500 file:py-2 file:px-6 file:rounded file:border-1 file:border-gray-400"
                                />
                                <span className="min-w-[100px] max-w-[100px] h-10 flex items-center select-none text-sky-500 p-1 shadow-slate-600 shadow-md hover:ripple-bg-slate-800">
                                  Add Thumbnail
                                </span>
                              </label>
                              <div>
                                {thumbnail && (
                                  <img
                                    className="w-28 h-28"
                                    src={`/img/${thumbnail}`}
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            {imageRequired && (
                              <p className="text-red-600">{imageRequired}</p>
                            )}
                            <input
                              accept="video/mp4"
                              onChange={(e) => setVideo(e.target.files)}
                              className="form-control
                                                                    block
                                                                    w-full
                                                                    text-sm
                                                                    font-normal
                                                                    text-gray-700
                                                                    bg-white bg-clip-padding
                                                                    border border-solid border-gray-300
                                                                    rounded
                                                                    transition
                                                                    ease-in-out
                                                                    m-0
                                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="formFileSm"
                              type="file"
                              required
                            />
                            {videoRequired && (
                              <p className="text-red-600">{videoRequired}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-center pt-7">
                          {!loading && (
                            <button className="select-none text-sky-500 p-1 shadow-cyan-600 shadow-md hover:ripple-bg-slate-800">
                              Upload
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

export default UploadModal;
