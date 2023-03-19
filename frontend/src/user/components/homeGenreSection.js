import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomeGenreSection = () => {
  const { randomVideos } = useSelector((state) => state.videosList);
    console.log(randomVideos)
    return (
        <>
            {randomVideos?.length > 0 &&
                <div className="p-5">
                    
                <dir className="grid md:grid-cols-2 md:grid-flow-row lg:grid-cols-4 lg:grid-flow-row gap-4">
                  {randomVideos?.map((x) => {
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

                      </div>
                    )
                  })}


                </dir>
                </div>
            }
        </>
    );
}
 
export default HomeGenreSection;