import axios from "axios";

export function requestSearch (action) {
    return axios.request({
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${action.token}`
          },
          method: "get",
          url: `http://localhost:8080/api/user/search/${action.text}`
    })
}