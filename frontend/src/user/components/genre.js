import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GenreSction = () => {
  const [data, setData] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    ( async() => {
      const { data } = await axios.request({
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          method: "get",
          url: "http://localhost:8080/api/user/genre"
    })

    console.log(data)
    setData(data)
    }) ();
  }, [user?.token])

  

  const tabsData = [
    {
      label: "Role play",
      videos: `${data}`,
    },
    {
      label: "Action",
      videos: `${data}`,
    },
    {
      label: "Adventure",
      videos: `${data}`,
    },
    {
      label: "Strategy",
      videos: `${data}`,
    },
    {
      label: "Sports",
      videos: `${data}`,
    },
  ];


  return (
      <>
    <div className="flex">
      <div className="w-full">
        <div className="flex space-x-11 justify-center">
          {/* Loop through tab data and render button for each. */}
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={idx}
                className={`py-2 border-b-4 transition-colors duration-500 ${
                  idx === activeTabIndex
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
          {tabsData[activeTabIndex].label === "Role play" && (
            <>
              {data?.length > 0 ? (
                <dir className="grid md:grid-cols-2 md:grid-flow-row lg:grid-cols-4 lg:grid-flow-row gap-4">
                  {data?.map((x) => {
                    return (
                      x.category === tabsData[activeTabIndex].label &&
                    <>
                    <div
                        class="max-w-sm bg-slate-900 shadow-2xl cursor-pointer 
                      rounded-lg transform 
                      transition duration-500 hover:scale-110"
                      >
                        <Link to={`/view_video/${x._id}`}>
                          {/* <img
                        class="rounded-t-lg"
                        src="\img\c6a973107454175.6032abf24f3fb.png"
                        alt=""
                      /> */}
                          <video
                            muted
                            onMouseOver={(e) => e.target.play()}
                            onMouseLeave={(e) => e.target.pause()}
                            className="max-h-[150px] min-h-[150px] w-full object-cover bg-black rounded-t-md"
                            src={`${x?.video?.url}`}
                          ></video>
                        </Link>
                      </div>
                    </>
                    )
                  })}
                </dir>
              ) : (
                <h3 className="text-center">No videos</h3>
              )}
            </>
          )}
          {tabsData[activeTabIndex].label === "Action" && (
            <>
            {data?.length > 0 ? (
              <dir className="grid md:grid-cols-2 md:grid-flow-row lg:grid-cols-4 lg:grid-flow-row gap-4">
                {data?.map((x) => {
                  return (
                    x.category === tabsData[activeTabIndex].label &&
                  <>
                  {console.log(x)}
                  <div
                      class="max-w-sm bg-slate-900 shadow-2xl cursor-pointer 
                    rounded-lg transform 
                    transition duration-500 hover:scale-110"
                    >
                      <Link to={`/view_video/${x._id}`}>
                        {/* <img
                      class="rounded-t-lg"
                      src="\img\c6a973107454175.6032abf24f3fb.png"
                      alt=""
                    /> */}
                        <video
                          muted
                          onMouseOver={(e) => e.target.play()}
                          onMouseLeave={(e) => e.target.pause()}
                          className="max-h-[150px] min-h-[150px] w-full object-cover bg-black rounded-t-md"
                          src={`${x?.video?.url}`}
                        ></video>
                      </Link>
                    </div>
                  </>
                  )
                })}
              </dir>
            ) : (
              <h3 className="text-center">No videos</h3>
            )}
          </>
          )}
          {tabsData[activeTabIndex].label === "Adventure" && (
            <>
            {data?.length > 0 ? (
              <dir className="grid md:grid-cols-2 md:grid-flow-row lg:grid-cols-4 lg:grid-flow-row gap-4">
                {data?.map((x) => {
                  return (
                    x.category === tabsData[activeTabIndex].label &&
                  <>
                  {console.log(x)}
                  <div
                      class="max-w-sm bg-slate-900 shadow-2xl cursor-pointer 
                    rounded-lg transform 
                    transition duration-500 hover:scale-110"
                    >
                      <Link to={`/view_video/${x._id}`}>
                        {/* <img
                      class="rounded-t-lg"
                      src="\img\c6a973107454175.6032abf24f3fb.png"
                      alt=""
                    /> */}
                        <video
                          muted
                          onMouseOver={(e) => e.target.play()}
                          onMouseLeave={(e) => e.target.pause()}
                          className="max-h-[150px] min-h-[150px] w-full object-cover bg-black rounded-t-md"
                          src={`${x?.video?.url}`}
                        ></video>
                      </Link>
                    </div>
                  </>
                  )
                })}
              </dir>
            ) : (
              <h3 className="text-center">No videos</h3>
            )}
          </>
          )}
          {tabsData[activeTabIndex].label === "Strategy" && (
            <>
            {data?.length > 0 ? (
              <dir className="grid md:grid-cols-2 md:grid-flow-row lg:grid-cols-4 lg:grid-flow-row gap-4">
                {data?.map((x) => {
                  return (
                    x.category === tabsData[activeTabIndex].label &&
                  <>
                  {console.log(x)}
                  <div
                      class="max-w-sm bg-slate-900 shadow-2xl cursor-pointer 
                    rounded-lg transform 
                    transition duration-500 hover:scale-110"
                    >
                      <Link to={`/view_video/${x._id}`}>
                        {/* <img
                      class="rounded-t-lg"
                      src="\img\c6a973107454175.6032abf24f3fb.png"
                      alt=""
                    /> */}
                        <video
                          muted
                          onMouseOver={(e) => e.target.play()}
                          onMouseLeave={(e) => e.target.pause()}
                          className="max-h-[150px] min-h-[150px] w-full object-cover bg-black rounded-t-md"
                          src={`${x?.video?.url}`}
                        ></video>
                      </Link>
                    </div>
                  </>
                  )
                })}
              </dir>
            ) : (
              <h3 className="text-center">No videos</h3>
            )}
          </>
          )}
          {tabsData[activeTabIndex].label === "Sports" && (
            <>
            {data?.length > 0 ? (
              <dir className="grid md:grid-cols-2 md:grid-flow-row lg:grid-cols-4 lg:grid-flow-row gap-4">
                {data?.map((x) => {
                  return (
                    x.category === tabsData[activeTabIndex].label &&
                  <>
                  {console.log(x)}
                  <div
                      class="max-w-sm bg-slate-900 shadow-2xl cursor-pointer 
                    rounded-lg transform 
                    transition duration-500 hover:scale-110"
                    >
                      <Link to={`/view_video/${x._id}`}>
                        {/* <img
                      class="rounded-t-lg"
                      src="\img\c6a973107454175.6032abf24f3fb.png"
                      alt=""
                    /> */}
                        <video
                          muted
                          onMouseOver={(e) => e.target.play()}
                          onMouseLeave={(e) => e.target.pause()}
                          className="max-h-[150px] min-h-[150px] w-full object-cover bg-black rounded-t-md"
                          src={`${x?.video?.url}`}
                        ></video>
                      </Link>
                    </div>
                  </>
                  )
                })}
              </dir>
            ) : (
              <h3 className="text-center">No videos</h3>
            )}
          </>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default GenreSction;
