import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewReportsSection = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const admin = JSON.parse(localStorage.getItem('admin'))
  const [reports, setReports] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.request({
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin?.token}`,
          },
          method: "get",
          url: `http://localhost:8080/api/admin/user/reports/viewReports?id=${id}`,
        });

        console.log(data);
        setVideo(data.video);
        setReports(data.reports);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  return (
    <>
      {video && (
        <div className="flex flex-col xl:flex-row">
          <div className="w-full xl:px-2 xl:min-w-80%">
            <div className="h-vh-75">
              <video
                class="h-vh-20 md:h-vh-28 w-full object-cover bg-black"
                controls
                src={`${video?.video?.url}`}
              ></video>
            </div>
          </div>
        </div>
      )}
      {reports && (
        <div className="p-4">
            <table className="overflow-scroll w-full bg-slate-900 text-sm text-left text-gray-300 border dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center w-60">
                Reporter Id
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Content
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((x, idx) => (
              <tr className="bg-slate-900 border-b dark:bg-gray-800 dark:border-gray-700">
                <th className="w-60">
                  <div className="pl-3">{x?.reporterId}</div>
                </th>
                <td className="px-4 py-4 text-center">
                  {x?.reports?.select} :-
                  {x?.reports?.text}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      {!reports &&
        <div className="text-white flex justify-center p-3">
            No reports yet
        </div>
      }
    </>
  );
};

export default ViewReportsSection;
