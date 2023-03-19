import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChat, setCommunity, setMembers } from "../../redux/ducks/community";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const CommunitySection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const chats = useSelector((state) => state.CommunityList.chats);
  const [member, setMember] = useState("");
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [socket, setSocket] = useState(null);
  const [latestMessage, setLatestMessage] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    setSocket(io("ws://localhost:8900"));
  }, []);

  useEffect(() => {
    socket?.emit("join-room", id);
    socket?.on("receive-message", (message) => {
      // setLatestMessage(message);
      displayMessage(message);
    });
  }, [socket, id]);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.request({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          method: "GET",
          url: `http://localhost:8080/api/user/community/chatList/?id=${id}`,
        });
        console.log(data);
        dispatch(setChat(data));

        const changeLoading = document.querySelector("#isLoading");
        changeLoading?.classList.remove("animate-pulse");
        setLoading(false);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, id, user.token]);

  // sending messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = user?.user?.image;
    const sender = user?.user?.email;
    const { data } = await axios.request({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "post",
      data: JSON.stringify({ id, sender, image, text }),
      url: "http://localhost:8080/api/user/community/sendChat",
    });

    if (data) {
      socket?.emit("send-message", { sender, text }, id);
      const message = {
        sender: {
          sender,
        },
        text,
      };
      displayMessage(message);
      setText("");
    } else {
      // blocking community is showing because of setting this to null; handle it more proper way
      dispatch(setChat(null));
      handleShowPopUp();
    }
  };

  // add player
  const handleAddPlayer = async (e) => {
    e.preventDefault();

    const { data } = await axios.request({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "post",
      data: JSON.stringify({ id, member }),
      url: "http://localhost:8080/api/user/community/add_new_member",
    });
    console.log(data)
    dispatch(setMembers(data.members.members));
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const displayMessage = (message) => {
    console.log(message);
    const outerDiv = document.createElement("div");
    const innerDiv = document.createElement("div");
    const image = document.createElement("img");
    const h6 = document.createElement("h6");
    const h5 = document.createElement("h5");
    const sender =
      message.sender.sender === user?.user?.email
        ? "Me"
        : message.sender.sender;

    sender === "Me"
      ? outerDiv.classList.add("flex", "justify-end", "mb-4")
      : outerDiv.classList.add("flex", "justify-start", "mb-4");
    h5.classList.add("text-xs", "underline");
    innerDiv.classList.add(
      "ml-2",
      "py-3",
      "px-4",
      "bg-gray-400",
      "rounded-br-3xl",
      "rounded-tr-3xl",
      "rounded-tl-xl",
      "text-white"
    );

    h5.textContent = sender;
    h6.textContent = message.text;

    innerDiv.appendChild(h5);
    innerDiv.appendChild(h6);
    outerDiv.appendChild(innerDiv);
    outerDiv.appendChild(image);
    document.querySelector("#display-message").appendChild(outerDiv);
  };

  const handleShowPopUp = () => {};

  const navigateToCommunity = () => {};

  return (
    <>
      {chats && (
        <>
          {chats[0]?.status ? (
            <div className="container fixed top-16 md:top-0 min-h-[92vh] md:pt-2 min-w-full">
              {/* <!-- Chatting --> */}
              <div
                id="isLoading"
                className="animate-pulse flex flex-row min-h-[92vh] pl-2 md:mt-14 md:ml-56"
              >
                <>
                  {/* <!-- message --> */}
                  <div className="px-5 flex flex-col justify-between w-full shadow-cyan-500 shadow-md">
                    <div className="flex flex-col mt-5 md:min-h-[73vh] md:max-h-[73vh] overflow-auto scrollbar scrollbar-track-cyan-500 scrollbar-medium scrollbar-thumb-slate-900">
                      {chats[0] && (
                        <>
                          <div className="flex justify-center text-slate-50">
                        {console.log(chats[0].communityName, "this is chat", chats.length)}
                            {chats[0]?.communityName}
                          </div>
                          {chats[0]?.result[0]?.chatting?.map(
                            (x, idx) => (
                              <>
                                {x?.sender !== user?.user?.email && (
                                  <div className="flex justify-start mb-4">
                                    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                      <h6 className="text-xs underline">
                                        {x?.sender}
                                      </h6>
                                      {x.text}
                                    </div>
                                    <img
                                      className="object-cover h-8 w-8 rounded-full"
                                      src={
                                        x?.image
                                          ? `/img/${x.image}`
                                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                      }
                                      alt=""
                                    />
                                  </div>
                                )}
                                {x?.sender === user?.user?.email && (
                                  <div className="flex justify-end mb-4">
                                    <img
                                      className="object-cover h-8 w-8 rounded-full"
                                      src={
                                        x?.image
                                          ? `/img/${x.image}`
                                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                      }
                                      alt=""
                                    />
                                    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                      <h6 className="text-xs underline">Me</h6>
                                      {x.text}
                                    </div>
                                  </div>
                                )}
                              </>
                            )
                          )}
                        </>
                      )}
                      <div id="display-message" ref={scrollRef}></div>
                    </div>
                    <div className="py-5">
                      <form onSubmit={handleSubmit}>
                        <label
                          for="default-search"
                          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        ></label>
                        <div class="relative">
                          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                          <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            type="search"
                            id="default-search"
                            class="block w-full p-4 pl-3 text-sm text-slate-100 border border-gray-300 rounded-lg bg-slate-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Type..."
                            required
                          />
                          <button
                            type="submit"
                            class="absolute right-2.5 bottom-2.5 bg-slate-900 text-sky-500 p-1 px-2 rounded-md shadow-cyan-600 shadow-md hover:ripple-bg-slate-800"
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* <!-- end message --> */}
                  <div className="min-w-[14rem] px-5 hidden md:block">
                    <form
                      className="flex flex-col items-center"
                      onSubmit={handleAddPlayer}
                    >
                      <label
                        for="default-search"
                        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                      ></label>
                      <div class="relative">
                        <input
                          value={member}
                          onChange={(e) => setMember(e.target.value)}
                          type="search"
                          id="default-search"
                          class="block w-full px-4 pl-2 text-sm text-slate-50 border border-gray-300 rounded-lg bg-slate-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="#ID"
                          required
                        />
                        <button
                          type="submit"
                          class="absolute right-2.5 bottom-1.5 bg-slate-900 text-sky-500 px-2 rounded-md shadow-cyan-600 shadow-md hover:ripple-bg-slate-800"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 inline-block mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                            />
                          </svg>
                          Add
                        </button>
                      </div>
                    </form>
                    <div className="flex flex-col">
                      <div className="font-semibold text-xl py-4 text-cyan-500">
                        Members
                      </div>
                        {chats[0]?.members.length > 0 &&
                        chats[0]?.members?.map((y) => (
                          <div className="font-semibold py-1">{y?.member}</div>
                        ))}
                        {! chats[0]?.members.length > 0 &&
                          <div className="font-semibold py-1">No members</div>
                        }
                    </div>
                  </div>
                </>
              </div>
            </div>
          ) : (
            <div className="section_padder mr-3 my-16 ml-2 md:my-16 md:ml-60 md:mr-4 flex h-96 text-red-600 justify-center items-center">
              This community is temporally blocked !
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CommunitySection;
