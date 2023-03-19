import { put, call } from "redux-saga/effects";
import { requestGetFollowers } from "../../requests/followRequest/getFollowersRequest";
import { setFollow } from "../../../ducks/follow";


export function* getFollowersHandler(action) {
    try {
        const { data } = yield call(requestGetFollowers, action);
        console.log(data)
        yield put(setFollow(data));
    } catch (error) {
        console.log(error)
    }

}