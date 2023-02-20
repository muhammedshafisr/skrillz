import { call, put } from "redux-saga/effects";
import { setUser } from "../../ducks/user";
import { requestRemoveProfileImage } from "../requests/removeProfileImage";
import { handleError } from "./userErrorHandler";

export function* handleRemoveProfileImage(action) {
  const token = JSON.parse(localStorage.getItem("user"));
  try {
    const response = yield call(requestRemoveProfileImage, action);
    const updatedUser = { user: response.data.user, token: token.token };

    localStorage.removeItem("user");
    yield put(setUser(response.data.user));
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
    yield call(handleError, error);
  }
}
