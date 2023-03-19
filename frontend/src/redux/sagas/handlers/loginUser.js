import { call, put } from "redux-saga/effects";
import { requestLoginUser } from "../requests/loginRequest";
import { setUser, setLoginError } from "../../ducks/user";

export function* handleRequestLogin(action) {
  try {
    const response = yield call(requestLoginUser, action);
    const { data } = response;

    // save the user to local storage
    localStorage.setItem("user", JSON.stringify(data));
    console.log(data)
    yield put(setUser(data.user));

  } catch (error) {
    yield put(setLoginError(error));
    console.log(error.response.data);
  }
}
