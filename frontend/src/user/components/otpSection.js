import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAuthError } from "../../redux/ducks/authUser";
import { removeError } from "../../redux/ducks/user";

const OtpSection = () => {
  const [inpOne, setInpOne] = useState();
  const [inpTwo, setInpTwo] = useState();
  const [inpThree, setInpThree] = useState();
  const [inpFour, setInpFour] = useState();
  // const [inpFive, setInpFive] = useState();
  // const [inpSix, setInpSix] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("user"));

  const handleCollapseOtpModal = () => {
    document.querySelector("#staticModal").classList.add("hidden");
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otp = inpOne.concat(inpTwo, inpThree, inpFour);
    const userId = userData.userId;
    console.log(otp);
    const data = {
      otp,
      userId,
    };

    try {
      const response = await axios.request({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify({ data }),
        url: "http://localhost:8080/api/user/verifyOtp",
      });

      console.log(response.data);
      if (response?.data?.status === "success") {
        dispatch(removeError());
        dispatch(removeAuthError());
        document.querySelector("#staticModal").classList.add("hidden");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // document.addEventListener("click", function (event) {
  //   function OTPInput() {
  //     const inputs = document.querySelectorAll("#otp > *[id]");
  //     for (let i = 0; i < inputs.length; i++) {
  //       inputs[i].addEventListener("keydown", function (event) {
  //         if (event.key === "Backspace") {
  //           inputs[i].value = "";
  //           if (i !== 0) inputs[i - 1].focus();
  //         } else {
  //           if (i === inputs.length - 1 && inputs[i].value !== "") {
  //             return true;
  //           } else if (event.keyCode > 47 && event.keyCode < 58) {
  //             inputs[i].value = event.key;
  //             if (i !== inputs.length - 1) inputs[i + 1].focus();
  //             event.preventDefault();
  //           } else if (event.keyCode > 64 && event.keyCode < 91) {
  //             inputs[i].value = String.fromCharCode(event.keyCode);
  //             if (i !== inputs.length - 1) inputs[i + 1].focus();
  //             event.preventDefault();
  //           }
  //         }
  //       });
  //     }
  //   }
  //   OTPInput();
  // });

  return (
    <>
      <div
        id="staticModal"
        data-modal-backdrop="static"
        tabindex="-1"
        aria-hidden="false"
        className="fixed hidden flex justify-center items-center h-screen top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full"
      >
        <div className="relative shadow-cyan-600 shadow-md w-full h-auto max-w-2xl md:h-auto">
          <div className="relative rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-end justify-between rounded-t dark:border-gray-600">
              <button
                onClick={handleCollapseOtpModal}
                type="button"
                class="text-gray-400 bg-transparent hover:bg-cyan-600 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="staticModal"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="bg-slate-900 py-20 px-3">
              <div className="container mx-auto">
                <div className="max-w-sm mx-auto md:max-w-lg">
                  <div className="w-full">
                    <div className="h-64 py-3 rounded text-center">
                      <h1 className="text-2xl text-white font-bold">
                        OTP Verification
                      </h1>
                      <div className="flex flex-col mt-4 text-white">
                        <span>Enter the OTP you received at</span>
                        <span className="font-normal text-cyan-700">
                          {userData?.email}
                        </span>
                      </div>
                      <form onSubmit={handleVerifyOtp}>
                        <div
                          id="otp"
                          className="flex flex-row justify-center text-center px-2 mt-5"
                        >
                          <input
                            className="m-2 border-cyan-500 focus:border-cyan-500 h-10 w-10 text-center form-control rounded"
                            type="text"
                            value={inpOne}
                            onChange={(e) => setInpOne(e.target.value)}
                            id="first"
                            maxLength="1"
                            required
                          />
                          <input
                            className="m-2 border-cyan-500 focus:border-cyan-500border-cyan-500 focus:border-cyan-500 h-10 w-10 text-center form-control rounded"
                            type="text"
                            value={inpTwo}
                            onChange={(e) => setInpTwo(e.target.value)}
                            id="second"
                            maxLength="1"
                            required
                          />
                          <input
                            className="m-2 border-cyan-500 focus:border-cyan-500 h-10 w-10 text-center form-control rounded"
                            type="text"
                            value={inpThree}
                            onChange={(e) => setInpThree(e.target.value)}
                            id="third"
                            maxLength="1"
                            required
                          />
                          <input
                            className="m-2 border-cyan-500 focus:border-cyan-500 h-10 w-10 text-center form-control rounded"
                            type="text"
                            value={inpFour}
                            onChange={(e) => setInpFour(e.target.value)}
                            id="fourth"
                            maxLength="1"
                            required
                          />
                        </div>

                        <div>
                          <button className="text-sky-500 p-1 mt-4 px-3 shadow-cyan-600 shadow-md hover:px-4 hover:py-1.5">
                            Verify
                          </button>
                        </div>
                      </form>

                      <div className="flex justify-center text-center mt-5">
                        <button className="text-white">
                          <span className="font-normal">Resend OTP ?</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpSection;
