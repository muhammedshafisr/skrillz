import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReportsSection = () => {
    const [reports, setReports] = useState(null);
  const admin = JSON.parse(localStorage.getItem('admin'))

    useEffect(() => {
        (async () => {
            try {
              const { data } = await axios.request({
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${admin?.token}`,
                },
                method: "get",
                url: "http://localhost:8080/api/admin/getReports",
              });
      
              console.log(data)
              setReports(data)
      
            } catch (err) {
              console.log(err);
            }
          })();
    }, [])

    const handleBlock = async (id) => {
      try {
        const { data } = await axios.request({
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin?.token}`,
          },
          data: JSON.stringify({ id }),
          method: "PATCH",
          url: `http://localhost:8080/api/admin/user/reports/blockVideo`,
        });
  
        setReports(data)
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleUnBlock = async (id) => {
      try {
        const { data } = await axios.request({
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin?.token}`,
          },
          data: JSON.stringify({ id }),
          method: "PATCH",
          url: `http://localhost:8080/api/admin/user/reports/unBlockVideo`,
        });
  
        setReports(data)
      } catch (error) {
        console.log(error);
      }
    };

    return (
        <>
            <table className="overflow-scroll w-full bg-slate-900 text-sm text-left text-gray-300 border dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Video
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Total reports
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <>
            {! reports && 
                <h1>No reports</h1>
            }
            </>
            {reports && 
              reports?.map((x, idx) => (
                <tr key={idx} className="bg-slate-900 border-b dark:bg-gray-800 dark:border-gray-700">
                  <th>
                    <div className="pl-3">
                      <Link to={`/admin/user/view_video/${x?._id?.videoId}`}>
                      <div className="text-base font-semibold">
                        <video className="w-20" src={`${x?.result[0].video.url}`}></video>
                      </div>
                      </Link>
                    </div>
                  </th>
                  <th
                    scope="row"
                    className="flex items-center justify-center px-6 py-4 whitespace-nowrap dark:text-white"
                  >

                    <div className="pl-3">
                      <div className="text-base font-semibold">{`${x?.result[0].video.name}`}</div>
                    </div>
                  </th>
                  <td className="px-4 py-4 text-center">{`${x?.count}`}</td>
                  <td className="px-6 py-4">
                    {! x?.result[0].video.status && <div className="flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                      Active
                    </div>}
                    {x?.result[0].video.status && <div className="flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-600 mr-2"></div>{" "}
                      Blocked
                    </div>}
                  </td>
                  <td className="py-4 text-center">
                    <Link
                      to={`/admin/reports/viewDetails/${x?._id?.videoId}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View details
                    </Link>
                    {! x?.result[0].video.status &&
                      <> <span className="pl-4 text-red-600 cursor-pointer" onClick={() => handleBlock(x?.result[0]?._id)}>
                        block<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 inline">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      </span> </>
                    }
                    {x?.result[0].video.status &&
                      <> <span className="pl-4 text-green-600 cursor-pointer" onClick={() => handleUnBlock(x?.result[0]?._id)}>
                        Unblock<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 inline">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>

                      </span> </>
                    }
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </>
    );
}
 
export default ReportsSection;