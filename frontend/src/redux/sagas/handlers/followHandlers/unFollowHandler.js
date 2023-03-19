import { call, put } from "redux-saga/effects";
import { setFollow } from "../../../ducks/follow";
import { requestUnFollow } from "../../requests/followRequest/unFollowRequest";




export function* handleUnFollow(action) {
    try {
        const { data } = yield call(requestUnFollow, action);

        console.log(data)
        yield put(setFollow(data));
        
    } catch (error) {
        console.log(error)
    }
}