import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const VideoSection = () => {
  const [videos, setVideos] = useState(null);
  const admin = JSON.parse(localStorage.getItem('admin'))

  useEffect(() => {
    (async () => {
      const { data } = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
        method: "get",
        url: "http://localhost:8080/api/admin/videos",
      });
      setVideos(data);
    })();
  }, []);

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
                <Link to={`/admin/reports/viewDetails/${x._id}`}>
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
              </div>
            </>
          ))}
        </dir>
      )}
      {!videos && <div>No videos</div>}
    </>
  );
};

export default VideoSection;
