import { call, put } from "redux-saga/effects";
import { setUser } from "../../ducks/user";
import { requestAddCover } from "../requests/addCoverRequest";
import { handleError } from "./userErrorHandler";



export function* handleAddCover (action) {
  const token = JSON.parse(localStorage.getItem("user"));
    try {
        const response = yield call(requestAddCover, action);

        const updatedUser = {user: response.data.user, token: token.token}
        
        localStorage.removeItem("user");
        yield put(setUser(response.data.user));
        localStorage.setItem("user", JSON.stringify(updatedUser));

    } catch (error) {
        console.log(error);
        yield call(handleError, error);
    }
}