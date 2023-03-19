import { call, put } from "redux-saga/effects";
import { setFollow } from "../../../ducks/follow";
import { requestFollow } from "../../requests/followRequest/followRequest";




export function* handleFollow(action) {
    try {
        const { data } = yield call(requestFollow, action);

        console.log(data)
        yield put(setFollow(data));

    } catch (error) {
        console.log(error)
    }
}