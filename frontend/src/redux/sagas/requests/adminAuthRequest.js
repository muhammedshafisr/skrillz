import axios from "axios";

export function adminAuthRequest(data) {
  return axios.request({
    headers: { "Content-type": "application/json" },
    method: "post",
    data: JSON.stringify({ data }),
    url: "http://localhost:8080/api/admin/login",
  });
}
