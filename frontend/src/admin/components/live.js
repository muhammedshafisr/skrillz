import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LiveSection = () => {
  const admin = JSON.parse(localStorage.getItem('admin'))
    const [videos, setVideos] = useState(null);

    useEffect(() => {
        (async () => {
          try {
            const { data } = await axios.request({
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${admin?.token}`,
              },
              method: "get",
              url: "http://localhost:8080/api/admin/live",
            });
    
            console.log(data)
            setVideos(data);
        } catch (err) {
            console.log(err);
          }
        })();
      }, []);

      const handleBlock = async (roomId, userId, userName, streamId) => {
        try {
            const { data } = await axios.request({
              method: "get",
              url: `https://rtc-api.zego.im/?Action=CloseRoom
              &RoomId=${roomId}`
            });
    
            console.log(data)
            setVideos(data);
        } catch (err) {
            console.log(err);
          }
      }

      const handleUnBlock = () => {

      }

    return (
        <>
      <div className="relative p-3">
        <table className="overflow-scroll w-full bg-slate-900 text-sm text-left text-gray-300 border dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Video
              </th>
              <th scope="col" className="px-6 py-3">
                Streamer
              </th>
              <th scope="col" className="px-6 py-3">
                Reports
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {videos?.map((x) => (
                <tr className="bg-slate-900 border-b dark:bg-gray-800 dark:border-gray-700">
                <th>
                <div className="pl-3">
                      <Link to={`/admin/user/view_video/${x?._id?.videoId}`}>
                      <div className="text-base font-semibold">
                        <img className="w-20" src={`/img/${x?.thumbnail}`} alt=""/>
                      </div>
                      </Link>
                    </div>
                </th>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 whitespace-nowrap dark:text-white"
                >

                  <div className="pl-3">
                    <div className="text-base font-semibold">{x?.userId}</div>
                  </div>
                </th>
                <td className="px-4 py-4">hmm</td>
                <td className="px-6 py-4">
                  {x.status ? <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                    Active
                  </div> : <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-600 mr-2"></div>{" "}
                    Blocked
                  </div>
                  }
                </td>
                <td className="py-4">
                  {x.status ? <span className="pl-4 text-red-600 cursor-pointer" onClick={() => handleBlock(x._id)}>
                      block<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 inline">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    </span> : <span className="pl-4 text-green-600 cursor-pointer" onClick={() => handleUnBlock(x._id)}>
                      active<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 inline">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>

                    </span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    );
}
 
export default LiveSection;