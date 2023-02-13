import axios from "axios";

export function requestRemoveCover (action) {
    return axios.request({
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${action.token}`,
          },
          method: "patch",
          url: "http://localhost:8080/api/user/profile/remove_cover"
    })
}