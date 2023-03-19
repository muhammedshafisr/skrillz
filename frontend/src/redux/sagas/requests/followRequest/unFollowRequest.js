import axios from "axios";

export function requestUnFollow(action) {
    return axios.request({
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${action.token}`,
          },
          method: "patch",
          data: JSON.stringify({id: action.id}),
          url: "http://localhost:8080/api/user/unFollow"
    });
}