import { call, put } from "redux-saga/effects";
import { adminAuthRequest } from "../requests/adminAuthRequest";
import { setAuthAdmin, setAdminAuthError } from "../../ducks/adminAuth";

export function* handleRequestAdminAuth(action) {
  try {
    const response = yield call(adminAuthRequest, action);
    const admin = response.data;

    // save the user to local storage
    localStorage.setItem("admin", JSON.stringify(admin));

    yield put(setAuthAdmin(admin));
  } catch (error) {
    console.log(error.response.data);
    yield put(setAdminAuthError(error.response.data));
  }
}
