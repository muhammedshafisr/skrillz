import { call, put } from "redux-saga/effects";
import { setViewVideo } from "../../../ducks/video";
import { requestViewVideo } from "../../requests/videoRequest/viewVideoRequest";


export function* handleViewVideo(action) {
    try {
        const { data } = yield call(requestViewVideo, action);
        yield put(setViewVideo(data));
    } catch (error) {
        console.log(error);
    }
}