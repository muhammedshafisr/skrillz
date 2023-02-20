import { call, put } from "redux-saga/effects";
import { setUser } from "../../ducks/user";
import { setIsUser } from "../../ducks/userAuthorization";
import { requestUserAuthorization } from "../requests/authorizationRequest";



export function* handleUserAuthorization(action) {
    try {
        const response = yield call(requestUserAuthorization, action);
        const user = response.data.user;

        yield put(setUser(user))

    } catch (error) {
        localStorage.removeItem("user");
        yield put(setUser(null))
        yield put(setIsUser(error.response.data.error));
        console.log(error.response.data.error);
    }
}
