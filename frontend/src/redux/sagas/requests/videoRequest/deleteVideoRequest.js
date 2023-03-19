import axios from "axios";

export function requestDeleteVideo (action) {
    return axios.request({
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${action.token}`,
          },
          method: "post",
          data: JSON.stringify({ cover_image: action.path }),
          url: "http://localhost:8080/api/user/profile/change_cover"
    })
}