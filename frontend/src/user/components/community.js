import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChat, setCommunity } from "../../redux/ducks/community";

const SingleChat = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const communities = useSelector((state) => state.CommunityList.communities);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          method: "GET",
          url: "http://localhost:8080/api/user/community",
        });

        console.log(data);
        dispatch(setCommunity(data));

        const changeLoading = document.querySelector("#isLoading");
        changeLoading.classList.remove("animate-pulse");
        setLoading(false);
        setChat(null);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="container fixed md:min-h-screen md:pt-0.5 md:min-w-full">
        {/* <!-- Chatting --> */}
        <div
          id="isLoading"
          className="animate-pulse flex flex-row justify-between min-h-full pl-2 md:mt-14 md:ml-56"
        >
          {/* <!-- chat list --> */}
          <>
            {communities?.communityList && (
              
              <div className="flex flex-col justify-between w-60 min-h-[91vh] max-h-[91vh] border-x-2 border-slate-600 scrollbar scrollbar-medium scrollbar-thumb-cyan-600 scrollbar-track-cyan-300 shadow-cyan-500 shadow-md">
                {/* <!-- community list -->  */}
                <div>
                  <>
                    {communities?.communityList?.map((x, idx) => (
                      <Link
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        to={`/chat/${x._id}`}
                      >
                        <div className="flex flex-row p-2 justify-center items-center">
                          <img
                            src={`/img/${x.image}`}
                            className="object-cover h-12 w-12 rounded-full"
                            alt=""
                          />
                        </div>
                      </Link>
                    ))}
                  </>
                  {/* <!-- end user list --> */}
                </div>
                <div className="flex justify-center p-2">
                  <h6 className="text-slate-50">ID :</h6>
                  <span className="text-cyan-600">{user?.user?._id}</span>
                </div>
              </div>
            )}
            {/* <!-- end chat list -->
      <!-- message --> */}
            <div className="px-5 md:min-h-[91vh] w-full shadow-cyan-500 shadow-md">
              <div className="flex flex-col items-center mt-5">
                <div className="text-slate-50">#Community</div>
                <div className="p-60 text-blue-600">
                  <Link to="/community/create_community">
                    Create new community ?
                  </Link>
                </div>
              </div>
            </div>
            {/* <!-- end message --> */}
          </>
        </div>
      </div>
    </>
  );
};

export default SingleChat;
