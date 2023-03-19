import { TiGroup } from "@react-icons/all-files/ti/TiGroup";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CommunityManager = () => {
  const [communityName, setCommunityName] = useState("");
  const [image, setImage] = useState("");
  const [nameRequired, setNameRequired] = useState(null);
  const [imageRequired, setImageRequired] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!communityName.trim().length) {
      return setNameRequired("Input box cannot be empty !");
    }
    else if (!image.trim().length) {
    return setImageRequired("Thumbnail is required !");
  } else if (!/\.(jpg|jpeg|png|gif)$/i.test(image)) {
    return setImageRequired("Sorry ! thumbnail only accept images");
  }
    try {
      const { data } = await axios.request({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        method: "post",
        data: JSON.stringify({ communityName, image }),
        url: "http://localhost:8080/api/user/create_community",
      });

      console.log(data, "this is from the backend");
      navigate("/community");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-center items-center w-full h-[80vh]">
          <form
            onSubmit={handleSubmit}
            className="shadow-cyan-600 shadow-md w-96 p-11"
          >
            <div className="flex justify-center">
              <TiGroup className="pb-4 text-cyan-600 text-6xl" />
            </div>
            <input
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              className="form-control
                            block
                            w-full
                            mb-2
                            text-sm
                            font-normal
                             text-gray-50
                             bg-slate-800 bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                             focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              type="text"
              placeholder="Community name"
            />
            {nameRequired && (
                              <p className="text-red-600">{nameRequired}</p>
                            )}
            <label class="block min-w-[120px] max-w-[120px] cursor-pointer">
                                <input
                                  type="file"
                                  id="thumbInp"
                                  onChange={(e) => setImage(e?.target?.files[0]?.name)}
                                  class="text-sm text-gray-500 file:py-2 file:px-6 file:rounded file:border-1 file:border-gray-400"
                                />
                                {/* <span className="min-w-[100px] max-w-[100px] h-10 flex items-center select-none text-sky-500 p-1 shadow-slate-600 shadow-md hover:ripple-bg-slate-800">
                                  Add Thumbnail
                                </span> */}
                              </label>
                              {imageRequired && (
                              <p className="text-red-600">{imageRequired}</p>
                            )}
            <div className="flex justify-center pt-8">
              <button className="select-none text-sky-500 p-1 px-4 shadow-cyan-600 shadow-md hover:ripple-bg-slate-800">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommunityManager;
