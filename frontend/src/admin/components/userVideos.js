import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UserVideoSection = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState(null);
  const [isList, setIsList] = useState(false);
  const admin = JSON.parse(localStorage.getItem('admin'))

  useEffect(() => {
    (async () => {
      const { data } = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
        method: "GET",
        url: `http://localhost:8080/api/admin/user/getUserVideos?id=${id}`,
      });

      setVideos(data);
    })();
  }, [id]);

  const blockVideo = async (id, userId) => {
    try {
      const { data } = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
        data: JSON.stringify({ id, userId }),
        method: "PATCH",
        url: `http://localhost:8080/api/admin/user/blockVideo`,
      });

      setVideos(data.videos);
    } catch (error) {
      console.log(error);
    }
  };

  const unBlockVideo = async (id, userId) => {
    try {
      const { data } = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
        data: JSON.stringify({ id, userId }),
        method: "PATCH",
        url: `http://localhost:8080/api/admin/user/unBlockVideo`,
      });

      setVideos(data.videos);
    } catch (error) {
      console.log(error);
    }
  };

  const getReports = (id) => {};

  return (
    <>
      {videos && (
        <dir className="grid md:grid-cols-2 md:grid-flow-row lg:grid-cols-4 lg:grid-flow-row gap-4">
          {videos?.map((x, idx) => (
            <>
              <div
                key={idx}
                className="max-w-sm bg-slate-900 shadow-2xl cursor-pointer 
                        rounded-lg transform 
                        transition duration-500 hover:scale-110"
              >
                <Link to={`/admin/user/view_video/${x._id}`}>
                  {/* <img
                          className="rounded-t-lg"
                          src="\img\c6a973107454175.6032abf24f3fb.png"
                          alt=""
                        /> */}
                  <video
                    muted
                    onMouseOver={(e) => e.target.play()}
                    onMouseLeave={(e) => e.target.pause()}
                    className="max-h-[150px] min-h-[150px] w-full object-cover bg-black rounded-t-md"
                    src={`${x.video.url}`}
                  ></video>
                </Link>

                <div className="absolute top-0 left-0 opacity-0 w-full hover:opacity-100 flex items-end justify-end">
                  <div>
                    <div
                      onClick={() => setIsList(!isList)}
                      className="p-4 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer"
                    >
                      Options
                      <div>
                        {isList ? (
                          <div>
                            <svg
                              width={10}
                              height={6}
                              viewBox="0 0 10 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.00016 0.666664L9.66683 5.33333L0.333496 5.33333L5.00016 0.666664Z"
                                fill="#1F2937"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div>
                            <svg
                              width={10}
                              height={6}
                              viewBox="0 0 10 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.00016 5.33333L0.333496 0.666664H9.66683L5.00016 5.33333Z"
                                fill="#1F2937"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    {isList && (
                      <div className="w-24 mt-2 p-2 bg-white shadow rounded">
                        <ul>
                          {!x?.video?.status && (
                            <li
                              onClick={(e) => blockVideo(x._id, x.userId)}
                              className="text-sm hover:bg-slate-200 py-1"
                            >
                              Block
                            </li>
                          )}
                          {x?.video?.status && (
                            <li
                              onClick={(e) => unBlockVideo(x._id, x.userId)}
                              className="text-sm hover:bg-slate-200 py-1"
                            >
                              UnBlock
                            </li>
                          )}
                          <Link
                            to={`/admin/reports/viewDetails/${x?._id}`}
                          >
                            <li
                              onClick={(e) => getReports(x._id)}
                              className="text-sm hover:bg-slate-200"
                            >
                              Reports
                            </li>
                          </Link>
                        </ul>
                      </div>
                    )}
                    <style>
                      {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
                    </style>
                  </div>
                </div>
              </div>
            </>
          ))}
        </dir>
      )}
      {!videos && <div>No videos</div>}
    </>
  );
};

export default UserVideoSection;
