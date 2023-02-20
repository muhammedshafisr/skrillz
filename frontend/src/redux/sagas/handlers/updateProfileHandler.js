import { call, put } from "redux-saga/effects";
import { handleSuccess } from "../../../user/components/editProfile";
import { setUser } from "../../ducks/user";
import { requestProfileUpdate } from "../requests/updateProfileRequest";

export function* handleProfileUpdate(action) {
  const token = JSON.parse(localStorage.getItem("user"));

  try {
    const response = yield call(requestProfileUpdate, action);
    const user = { user: response.data.user, token: token.token };

    localStorage.removeItem("user");

    yield put(setUser(response.data.user));
    localStorage.setItem("user", JSON.stringify(user));
    handleSuccess("Success", "Profile updated");
  } catch (error) {
    console.log(error);
  }
}
