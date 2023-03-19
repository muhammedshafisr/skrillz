import axios from "axios";
import { useEffect } from "react";
import { setHistory } from "../../redux/ducks/video";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HistorySection = () => {
    const dispatch = useDispatch();
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Months start at 0!
    let day = today.getDate();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    const formattedToday = day + '-' + month + '-' + year;
    const user = JSON.parse(localStorage.getItem("user"));
    const { history } = useSelector((state) => state.videosList)
    console.log(formattedToday)
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.request({
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                    method: "GET",
                    url: "http://localhost:8080/api/user/history"
                })

                dispatch(setHistory(data))
            }
            catch (error) {
                console.log(error)
            }
        })()
    }, [user.token, dispatch])

    const handleClearHIstory = async () => {
        try {
            const { data } = await axios.request({
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                method: "DELETE",
                url: "http://localhost:8080/api/user/clear_history"
            })

            dispatch(setHistory(data))
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {history &&
                history?.map((x, idx) => (
                    <>
                        <h1 className="text-white">{x?._id?.date === formattedToday ? "Today": x?._id?.date}</h1>
                        <dir key={idx} className="grid md:grid-cols-2 md:grid-flow-row lg:grid-cols-4 lg:grid-flow-row gap-4">
                            {x?.result?.map((y, idx) => (
                                <div class="max-w-sm bg-slate-900 shadow-2xl cursor-pointer 
                        rounded-lg transform 
                        transition duration-500 hover:scale-110">
                                    <Link to={`/view_video/`}>
                                        {/* <img
                        class="rounded-t-lg"
                        src="\img\c6a973107454175.6032abf24f3fb.png"
                        alt=""
                      /> */}
                                        <video muted
                                            onMouseOver={(e) => e.target.play()}
                                            onMouseLeave={(e) => e.target.pause()}
                                            className="max-h-[150px] min-h-[150px] w-full object-cover bg-black rounded-t-md" src={`${y[0]?.video.url}`}></video>

                                    </Link>

                                    <div
                                        className="absolute top-0 left-0 opacity-0 w-full hover:opacity-100 flex items-end justify-end">
                                        <button className="border">
                                            <p className="text-white text-sm">Remove</p>
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </dir>
                        <div className="flex justify-end">
                        <button
                          onClick={() => handleClearHIstory()}
                          className="text-sky-500 p-1 shadow-cyan-600 shadow-md hover:ripple-bg-slate-800"
                        >
                          Clear history
                        </button>
                        </div>
                    </>
                ))
            }
            {! history &&
            <div className="text-white flex justify-center p-3">
                History is empty
          </div>
            }
        </>
    );
}

export default HistorySection;