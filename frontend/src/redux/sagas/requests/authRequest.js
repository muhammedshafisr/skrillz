import axios from "axios";

export function requestCreateUser(data) {
  console.log("im going form signup");
  return axios.request({
    headers: { "Content-type": "application/json" },
    method: "post",
    data: JSON.stringify({ data }),
    url: "http://localhost:8080/api/user/signup",
  });
}
