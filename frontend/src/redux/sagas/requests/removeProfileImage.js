import axios from "axios";

export function requestRemoveProfileImage(action) {
    return axios.request({
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${action.token}`,
          },
          method: "patch",
          url: "http://localhost:8080/api/user/profile/edit_profile/removeProfilePicture"
    })
}