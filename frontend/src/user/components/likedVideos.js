import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLikedVideos } from "../../redux/ducks/video";

const LikedVideoList = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const { likedVideos } = useSelector((state) => state.videosList);
  console.log(likedVideos);
  useEffect(() => {
    (async () => {
      const { data } = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        method: "get",
        url: "http://localhost:8080/api/user/liked_videos",
      });

      dispatch(setLikedVideos(data.likedVideos));
    })();
  }, [dispatch, user?.token]);

  return (
    <>
      {likedVideos && (
        <dir className="grid md:grid-cols-2 md:grid-flow-row lg:grid-cols-4 lg:grid-flow-row gap-4">
          {likedVideos?.map((x) => (
            <>
              {x.result.map((y) => (
                <>
                {console.log(y)}
                  <div
                    class="max-w-sm bg-slate-900 shadow-2xl cursor-pointer 
                        rounded-lg transform 
                        transition duration-500 hover:scale-110"
                  >
                    <Link to={`/view_video/${y._id}`}>
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
                        src={`${y.video.url}`}
                      ></video>
                    </Link>

                    <div className="absolute top-0 left-0 opacity-0 w-full hover:opacity-100 flex items-end justify-end">
                      <button className="border">
                        <p className="text-white text-sm">Remove</p>
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </>
          ))}
        </dir>
      )}
      {!likedVideos &&
        <div className="text-white flex justify-center p-3">
          No videos liked
        </div>
      }
    </>
  );
};

export default LikedVideoList;
