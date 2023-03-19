import { call, put } from "redux-saga/effects";
import { requestCreateUser } from "../requests/authRequest";
import { setAuthUser, setAuthError } from "../../ducks/authUser";
import { handleShowOtpModal } from "../../../user/components/signup";

export function* handleRequestAuth(action) {
  try {
    const response = yield call(requestCreateUser, action);
    const user = response.data;

    // save the user to local storage
    localStorage.setItem("user", JSON.stringify(user));
    console.log(user)
    yield put(setAuthUser(user));
    handleShowOtpModal();
  } catch (error) {
    yield put(setAuthError(error));
    console.log(error.response.data);
  }
}
