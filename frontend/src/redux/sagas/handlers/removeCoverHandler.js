import { call, put } from "redux-saga/effects";
import { setUser } from "../../ducks/user";
import { setIsUser } from "../../ducks/userAuthorization";
import { requestRemoveCover } from "../requests/removeCoverRequest";
import { handleError } from "./userErrorHandler";

export function* handleCoverRemove(action) {
  const token = JSON.parse(localStorage.getItem("user"));
  try {
    const response = yield call(requestRemoveCover, action);
    const updatedUser = { user: response.data.user, token: token.token };

    localStorage.removeItem("user");
    yield put(setUser(response.data.user));
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
    yield call(handleError, error);
  }
}
