import { call, put } from "redux-saga/effects";
import { requestFollow } from "../../requests/followRequest/followRequest";




export function* handleFollow(action) {
    try {
        const response = yield call(requestFollow, action);

        console.log(response.data)

    } catch (error) {
        console.log(error)
    }
}