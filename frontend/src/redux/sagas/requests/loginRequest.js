import axios from "axios";

export function requestLoginUser(data) {
  return axios.request({
    headers: { "Content-type": "application/json" },
    method: "post",
    data: JSON.stringify({ data }),
    url: "http://localhost:8080/api/user/login",
  });
}
