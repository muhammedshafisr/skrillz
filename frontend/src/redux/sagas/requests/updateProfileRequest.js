import axios from "axios";

export function requestProfileUpdate(action) {
  const data = action.data

  return axios.request({
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${action.token}`,
    },
    method: "POST",
    data: JSON.stringify({ data }),
    url: "http://localhost:8080/api/user/profile/edit_profile",
  });
}
