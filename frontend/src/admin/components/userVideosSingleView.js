import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleViewSection = () => {
  const { id } = useParams();
  const admin = JSON.parse(localStorage.getItem('admin'))
  const [video, setVideo] = useState(null);

  useEffect(() => {
    ( async() => {
      try {
        const { data } = await axios.request({
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin?.token}`,
          },
          method: "get",
          url: `http://localhost:8080/api/admin/user/view_video?id=${id}`,
        });

        console.log(data)
        setVideo(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  return (
    <>
    {video && 
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
      }
    </>
  );
};

export default SingleViewSection;
