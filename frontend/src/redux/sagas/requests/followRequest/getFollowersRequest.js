import axios from "axios";

export function requestGetFollowers(action) {
    return axios.request({
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${action.token}`,
          },
          method: "GET",
          url: "http://localhost:8080/api/user/get_followers"
    });
}