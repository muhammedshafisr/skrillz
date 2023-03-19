import axios from "axios";

export function requestViewVideo (action) {
    const { id, userId } = action;
    return axios.request({
        headers: {
            "Content-type": "application/json",
          },
          method: "get",
          url: `http://localhost:8080/api/user/profile/viewVideo?id=${id}&userId=${userId}`
    })
}