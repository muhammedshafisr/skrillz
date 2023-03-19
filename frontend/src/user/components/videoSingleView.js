import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setComments,
  setDisLike,
  setLike,
  viewVideo,
} from "../../redux/ducks/video";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { AiOutlineDislike } from "@react-icons/all-files/ai/AiOutlineDislike";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import { IoCheckmarkSharp } from "@react-icons/all-files/io5/IoCheckmarkSharp";
import { AiFillDislike } from "@react-icons/all-files/ai/AiFillDislike";

const VideoSingleView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");
  const [select, setSelect] = useState("Violent or repulsive content");
  const [loading, Setloading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const { videoSingleView } = useSelector((state) => state.videosList);
  const navigate = useNavigate();
  console.log(videoSingleView);
  useEffect(() => {
    const userId = user?.user?._id;
    dispatch(viewVideo(id, userId));
  }, [dispatch, id, user?.user?._id]);

  const handleLike = async () => {
    const totalLikes = videoSingleView?.totalLikes;
    if (!user) {
      return navigate("/login");
    }
    try {
      const { data } = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        data: JSON.stringify({ id }),
        method: "post",
        url: "http://localhost:8080/api/user/view_video/like_video",
      });
      if (data.status) {
        dispatch(setLike(totalLikes + 1));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDisLike = async () => {
    const totalLikes = videoSingleView?.totalLikes;
    if (!user) {
      return navigate("/login");
    }
    try {
      const { data } = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        data: JSON.stringify({ id }),
        method: "post",
        url: "http://localhost:8080/api/user/view_video/disLIke_video",
      });

      if (data.status) {
        dispatch(setDisLike(totalLikes - 1));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReportModal = () => {
    const popUp = document
      .querySelector("#uploadModal")
      .classList.contains("collapse");
    popUp
      ? document.querySelector("#uploadModal").classList.remove("collapse")
      : document.querySelector("#uploadModal").classList.add("collapse");
  };

  const handleReport = async (e) => {
    e.preventDefault();
    Setloading(true);
    const uploader = videoSingleView?.viewVideo?.userId;
    try {
      const { data } = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        data: JSON.stringify({ select, text, id, uploader }),
        method: "post",
        url: "http://localhost:8080/api/user/view_video/report_video",
      });

      if (data) {
        Setloading(false);
        setText("");
        setSelect("Violent or repulsive content");
        handleReportModal();

        const popupHead = document.querySelector("#popup-head");
        const popupBody = document.querySelector("#popup-body");
        popupHead.innerHTML = "Successfully";
        popupBody.innerHTML = "Reported";
        popupHead.classList.add("text-green-600");
        document
          .querySelector("#popup-modal-success")
          .classList.remove("collapse");
      } else {
        Setloading(false);
        setText("");
        setSelect("Violent or repulsive content");
        handleReportModal();
        const popupHead = document.querySelector("#popup-head");
        const popupBody = document.querySelector("#popup-body");
        popupHead.innerHTML = "Declined";
        popupBody.innerHTML = "You have already reported this video";
        popupHead.classList.add("text-red-600");
        document
          .querySelector("#popup-modal-success")
          .classList.remove("collapse");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    const popup_modal = document.querySelector("#popup-modal-success");
    popup_modal.classList.add("collapse");
  };

  const handleSubmit = async (e) => {
    const inp = document.querySelector('#commentBoxValidator');
    e.preventDefault();

    if (!user) {
      return navigate("/login");
    }

    if(!comment.trim().length) {
      return inp?.classList?.contains("hidden") && inp?.classList?.remove("hidden");
    }
    
    const commenter = user?.user?.email;
    const commenterImage = user?.user?.image;

    try {
      const { data } = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        data: JSON.stringify({
          videoId: id,
          commenter,
          commenterImage,
          comment,
        }),
        method: "post",
        url: "http://localhost:8080/api/user/view_video/sendComment",
      });

      ! inp?.classList?.contains("hidden") && inp?.classList?.add("hidden");
      setComment("");
      dispatch(setComments(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    videoSingleView?.viewVideo && (
      <>
        {/* success modal start*/}
        <div
          id="popup-modal-success"
          tabindex="-1"
          className="flex justify-center collapse fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:w-full md:inset-0 h-modal md:h-full"
        >
          <div className="relative w-8/12 md:w-full h-full max-w-md md:h-auto">
            <div className="relative rounded-lg shadow dark:bg-gray-700">
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto text-green-600 w-14 h-10 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <IoCheckmarkSharp />
                </svg>
                <h3
                  id="popup-head"
                  className="text-lg font-normal dark:text-gray-400"
                ></h3>
                <h5 id="popup-body" className="mb-3 text-white"></h5>
                <button
                  onClick={handleOk}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-cyan-600 bg-white focus:ring-4 focus:outline-none focus:ring-green-600 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* success modal end*/}

        <div
          id="uploadModal"
          data-modal-backdrop="static"
          tabindex="-1"
          aria-hidden="false"
          className="fixed flex collapse justify-center items-center top-0 z-50 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto h-full"
        >
          <div className="relative  shadow-cyan-600 shadow-md w-full h-auto max-w-2xl md:h-auto">
            <div className="relative rounded-lg shadow dark:bg-gray-700">
              <div className="flex py-2 items-center z-50 border-b border-slate-700 justify-between rounded-t bg-gray-900">
                <h1 className="text-base px-5 text-white font-bold">
                  Report video
                </h1>
                <button
                  type="button"
                  onClick={handleReportModal}
                  className="text-gray-400 bg-transparent hover:bg-cyan-600 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="staticModal"
                >
                  <svg
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
              </div>

              <div className="bg-slate-900 py-8 px-3">
                <div className="container mx-auto">
                  <div className="max-w-sm mx-auto md:max-w-lg">
                    <div className="w-full">
                      <div className="py-3 rounded">
                        <form id="uploadForm" onSubmit={handleReport}>
                          <div className="flex justify-center">
                            <div className="mb-3 w-96">
                              <label for="underline_select" className="sr-only">
                                Underline select
                              </label>
                              <select
                                id="underline_select"
                                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                onChange={(e) => setSelect(e.target.value)}
                                required
                              >
                                <option value="Violent or repulsive content">
                                  Violent or repulsive content
                                </option>
                                <option value="Hateful or abusive content">
                                  Hateful or abusive content
                                </option>
                                <option value="Harassment or bullying">
                                  Harassment or bullying
                                </option>
                                <option value="Captions issue">
                                  Captions issue
                                </option>
                              </select>
                              <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
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
                                placeholder="Text"
                                required
                              />
                            </div>
                          </div>
                          <div className="flex justify-center pt-7">
                            {!loading && (
                              <button className="select-none text-sky-500 p-1 shadow-cyan-600 shadow-md hover:ripple-bg-slate-800">
                                Report
                              </button>
                            )}
                            {loading && (
                              <button
                                disabled
                                className="select-none text-sky-500 p-1 pl-3 shadow-cyan-600 shadow-md hover:ripple-bg-slate-800"
                              >
                                Please wait
                                <span className="pl-3 h-3 w-3">
                                  <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
                                  <span className="relative right-3 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
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

        <div className="flex flex-col xl:flex-row">
          <div className="w-full xl:px-2 xl:min-w-80%">
            <div className="h-vh-75">
              {videoSingleView?.viewVideo?.video.status && (
                <>
                  <video
                    className="h-vh-20 md:h-vh-28 w-full object-cover bg-black"
                    controls
                  ></video>
                  <div className="flex justify-center">
                    <h1 className="relative bottom-48 md:bottom-64">
                      Sorry, this video is temporally blocked !
                    </h1>
                  </div>
                </>
              )}
              {!videoSingleView?.viewVideo?.video.status && (
                <video
                  className="h-vh-20 md:h-vh-28 w-full object-cover bg-black"
                  controls
                  src={`${videoSingleView?.viewVideo?.video?.url}`}
                ></video>
              )}
              {videoSingleView?.totalLikes > 0 ? (
                <>
                  <h1 className="text-white">
                    {videoSingleView?.totalLikes} Likes
                  </h1>
                </>
              ) : (
                <>
                  <h1>No likes</h1>
                </>
              )}
              <div className="flex justify-end">
                {videoSingleView?.likes ? (
                  <>
                    <AiFillLike className="mr-2 w-6 h-6 cursor-pointer text-white" />
                  </>
                ) : (
                  <>
                    <AiOutlineLike
                      onClick={handleLike}
                      className="mr-2 w-6 h-6 cursor-pointer text-white"
                    />
                  </>
                )}
                {videoSingleView?.disLikes ? (
                  <>
                    <AiFillDislike className="mr-2 w-6 h-6 cursor-pointer text-white" />
                  </>
                ) : (
                  <>
                    <AiOutlineDislike
                      onClick={handleDisLike}
                      className="mr-2 w-6 h-6 cursor-pointer text-white"
                    />
                  </>
                )}
                {user && (
                  <h1
                    onClick={handleReportModal}
                    className="cursor-pointer text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                    Report
                  </h1>
                )}
              </div>
            </div>

            <div className="">
              <>
                <section className="dark:bg-gray-900">
                  <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-base font-bold text-slate-100 dark:text-white">
                        Comments
                      </h2>
                    </div>
                    <form className="mb-6" onSubmit={handleSubmit}>
                      <div className="py-2 px-4 bg-slate-900 rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label for="comment" className="sr-only">
                          Your comment
                        </label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          id="comment"
                          rows="2"
                          className="px-0 w-full text-sm bg-slate-900 text-white border-0 focus:ring-0 focus:outline-none"
                          placeholder="Write a comment..."
                          required
                        ></textarea>
                      </div>
                        <p id="commentBoxValidator" className="text-red-600 hidden">Input box cannot be empty !</p>
                      <button
                        type="submit"
                        className="inline-flex items-center mt-4 bg-slate-900 py-2.5 px-4 text-xs font-medium text-center bg-primary-700 rounded-lg text-sky-500 p-1 shadow-cyan-600 shadow-md hover:ripple-bg-slate-800"
                      >
                        Post comment
                      </button>
                    </form>

                    {videoSingleView &&
                    videoSingleView?.comments?.length > 0 ? (
                      videoSingleView.comments?.map((x) =>
                        x.chat[0].commenter === user?.user?.email ? (
                          <article className="p-6 mb-6 text-base rounded-lg dark:bg-gray-900">
                            <footer className="flex justify-between items-center md:mb-2">
                              <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-500 dark:text-white">
                                  <img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src={
                                      x?.chat[0]?.commenterImage
                                        ? `/img/${x?.chat[0]?.commenterImage}`
                                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                    }
                                    alt="Michael Gough"
                                  />
                                  Me
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                                  <time
                                    pubdate
                                    datetime="2022-02-08"
                                    title="February 8th, 2022"
                                  >
                                    {x.chat[0].date}
                                  </time>
                                </p>
                              </div>
                              <button
                                id="dropdownComment1Button"
                                data-dropdown-toggle="dropdownComment1"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-100"
                                type="button"
                              >
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                </svg>
                                <span className="sr-only">
                                  Comment settings
                                </span>
                              </button>
                              {/* <div
                                id="dropdownComment1"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                              >
                                <ul
                                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="dropdownMenuIconHorizontalButton"
                                >
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Edit
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Remove
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Report
                                    </a>
                                  </li>
                                </ul>
                              </div> */}
                            </footer>
                            <p className="text-sm text-gray-600 dark:text-gray-400 inline-block md:hidden">
                                  <time
                                    pubdate
                                    datetime="2022-02-08"
                                    title="February 8th, 2022"
                                  >
                                    {x.chat[0].date}
                                  </time>
                                </p>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                              {x.chat[0].comment}
                            </p>
                            <div className="flex items-center mt-4 space-x-4">
                              <button
                                type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                              >
                                <svg
                                  aria-hidden="true"
                                  className="mr-1 w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                  ></path>
                                </svg>
                                Reply
                              </button>
                            </div>
                          </article>
                        ) : (
                          <article className="p-6 mb-6 ml-6 lg:ml-12 text-base rounded-lg dark:bg-gray-900">
                            <footer className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-500 dark:text-white">
                                  <img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src={
                                      x?.chat[0]?.commenterImage
                                        ? `/img/${x?.chat[0]?.commenterImage}`
                                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                    }
                                    alt="Jese Leos"
                                  />
                                  {x?.chat[0]?.commenter}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  <time
                                    pubdate
                                    datetime="2022-02-12"
                                    title="February 12th, 2022"
                                  >
                                    {x.chat[0].date}
                                  </time>
                                </p>
                              </div>
                              <button
                                id="dropdownComment2Button"
                                data-dropdown-toggle="dropdownComment2"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-100 rounded-lg"
                                type="button"
                              >
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                </svg>
                                <span className="sr-only">
                                  Comment settings
                                </span>
                              </button>
                              {/* <div
                                id="dropdownComment2"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                              >
                                <ul
                                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="dropdownMenuIconHorizontalButton"
                                >
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Edit
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Remove
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Report
                                    </a>
                                  </li>
                                </ul>
                              </div> */}
                            </footer>
                            <p className="text-gray-500 dark:text-gray-400">
                              {x?.chat[0]?.comment}
                            </p>
                            <div className="flex items-center mt-4 space-x-4">
                              <button
                                type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                              >
                                <svg
                                  aria-hidden="true"
                                  className="mr-1 w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                  ></path>
                                </svg>
                                Reply
                              </button>
                            </div>
                          </article>
                        )
                      )
                    ) : (
                      <div className="flex justify-center text-gray-500">
                        No comments yet
                      </div>
                    )}
                  </div>
                </section>
              </>
            </div>
          </div>
          <div>
            <ul>
              <span className="text-white">Recommended</span>
              <li className="py-2 max-w-[250px]">
                <video
                  muted
                  onMouseOver={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                  title="video"
                  className="w-full aspect-video"
                  src="\video\git.mp4"
                >
                  <source src="\video\git.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </li>
              <li className="py-2 max-w-[250px]">
                <video
                  onMouseOver={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                  title="video"
                  className="w-full aspect-video"
                  src="\video\git.mp4"
                >
                  <source src="\video\git.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </li>
              <li className="py-2 max-w-[250px]">
                <video
                  onMouseOver={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                  title="video"
                  className="w-full aspect-video"
                  src="\video\git.mp4"
                >
                  <source src="\video\git.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </li>
              <li className="py-2 max-w-[250px]">
                <video
                  onMouseOver={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                  title="video"
                  className="w-full aspect-video"
                  src="\video\git.mp4"
                >
                  <source src="\video\git.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </li>
              <li className="py-2 max-w-[250px]">
                <video
                  onMouseOver={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                  title="video"
                  className="w-full aspect-video"
                  src="\video\git.mp4"
                >
                  <source src="\video\git.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </li>
              <li className="py-2 max-w-[250px]">
                <video
                  onMouseOver={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                  title="video"
                  className="w-full aspect-video"
                  src="\video\git.mp4"
                >
                  <source src="\video\git.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </li>
              <li className="py-2 max-w-[250px]">
                <video
                  onMouseOver={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                  title="video"
                  className="w-full aspect-video"
                  src="\video\git.mp4"
                >
                  <source src="\video\git.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  );
};
export default VideoSingleView;
