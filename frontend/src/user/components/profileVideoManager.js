import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProfile } from "../../redux/ducks/profile";
import { setVideos } from "../../redux/ducks/video";
import LiveModal from "./liveModal";

const VideoSection = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  let data = useSelector((store) => store.videosList);
  const token = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  console.log(data)
  useEffect(() => {
    tabsData[0].videos = data?.videos?.videos
  })

  const tabsData = [
    {
      label: "Videos",
      videos: `${data?.myVideos}`,
    },
    {
      label: "Live",
      content: "Live Now",
    },
    {
      label: "Playlist",
      videosList: "Nothing to show",
    },
    {
      label: "About",
      About: "Nothing to show right now",
    },
  ];


  const handleDelete = async (cloudId, id) => {
    console.log(id)
    try {
      const { data } = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        method: "DELETE",
        data: JSON.stringify({ cloudId, id }),
        url: "http://localhost:8080/api/user/delete_video",
      });

      dispatch(setVideos( data ));
    } catch (error) {
      console.log(error)
    }

  }

  const showLiveModal = () => {
    document.querySelector("#liveModal").classList.remove("collapse");
  };

  return (
    <>
    <LiveModal />
      <div className="w-full">
        <div className="flex space-x-11 border-b">
          {/* Loop through tab data and render button for each. */}
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={idx}
                className={`py-2 border-b-4 transition-colors duration-500 ${idx === activeTabIndex
                  ? "border-teal-500 text-cyan-500"
                  : "border-transparent hover:border-gray-200 text-cyan-50"
                  }`}
                // Change the active tab on click.
                onClick={() => setActiveTabIndex(idx)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        {/* Show active tab content. */}
        <div className="pt-9">
          {tabsData[activeTabIndex].label === "Videos" && (
            <>
              {data?.myVideos?.length > 0 ? (
                <dir className="grid md:grid-cols-2 md:grid-flow-row lg:grid-cols-4 lg:grid-flow-row gap-4">
                  {data?.myVideos.map((x) => {
                    return (

                      <div class="max-w-sm bg-slate-900 shadow-2xl cursor-pointer 
                      rounded-lg transform 
                      transition duration-500 hover:scale-110">
                        <Link to={`/view_video/${x._id}`}>
                          {/* <img
                        class="rounded-t-lg"
                        src="\img\c6a973107454175.6032abf24f3fb.png"
                        alt=""
                      /> */}
                          <video muted
                            onMouseOver={(e) => e.target.play()}
                            onMouseLeave={(e) => e.target.pause()}
                            className="max-h-[150px] min-h-[150px] w-full object-cover bg-black rounded-t-md" src={`${x?.video?.url}`}></video>

                        </Link>

                        <div
                            className="absolute top-0 left-0 opacity-0 w-full hover:opacity-100 flex items-end justify-end">
                              <button className="border" onClick={() => handleDelete(x?.video?.cloudinaryId, x?._id)}>
                              <p className="text-white text-sm">Remove</p>
                              </button>
                            </div>

                      </div>
                    )
                  })}


                </dir>
              ) : (
                <h3 className="text-center">No videos</h3>
              )}
            </>
          )}
          {tabsData[activeTabIndex].label === "Live" && (
            <div className="flex justify-center">
              <button onClick={ showLiveModal } className="text-sky-500 p-1 shadow-cyan-600 shadow-md hover:ripple-bg-slate-800">
                Live now
              </button>
            </div>
          )}
          {tabsData[activeTabIndex].label === "Playlist" && (
            <h3 className="text-center">Nothing to show !!</h3>
          )}
          {tabsData[activeTabIndex].label === "About" && (
            <h3 className="text-center">Nothing to show !!</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoSection;
