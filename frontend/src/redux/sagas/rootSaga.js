import { fork, takeLatest, all } from "redux-saga/effects";
import { AUTH_USER } from "../ducks/authUser";
import { GET_USER } from "../ducks/user";
import { AUTH_ADMIN } from "../ducks/adminAuth";
import { ADD_COVER, REMOVE_COVER, REMOVE_IMAGE, UPDATE_COVER, UPDATE_PROFILE } from "../ducks/profile";
import { handleRequestAdminAuth } from "./handlers/adminAuthHandler";
import { handleRequestAuth } from "./handlers/authUser";
import { handleRequestLogin } from "./handlers/loginUser";
import { handleCoverRemove } from "./handlers/removeCoverHandler";
import { handleAddCover } from "./handlers/addCoverHandler";
import { handleUpdateCover } from "./handlers/updateCoverHandler";
import { handleProfileUpdate } from "./handlers/updateProfileHandler";
import { handleRemoveProfileImage } from "./handlers/removeProfileImageHandler";
import { SEARCH_IT } from "../ducks/search";
import { handleSearch } from "./handlers/searchHandler";
import { GET_FOLLOW, GET_FOLLOWERS, GET_UNFOLLOW } from "../ducks/follow";
import { handleFollow } from "./handlers/followHandlers/followHandler";
import { getFollowersHandler } from "./handlers/followHandlers/getFollowersHandler";
import { handleUnFollow } from "./handlers/followHandlers/unFollowHandler";
import { VIEW_VIDEO } from "../ducks/video";
import { handleViewVideo } from "./handlers/videoHandlers/viewVideoHandler";

// catching user authentication
export function* watchAuthUser() {
  yield takeLatest(AUTH_USER, handleRequestAuth);
}

// catching user login
export function* watchLoginUser() {
  yield takeLatest(GET_USER, handleRequestLogin);
}

export function* watchRemoveCover() {
  yield takeLatest(REMOVE_COVER, handleCoverRemove);
}

export function* watchAddCover() {
  yield takeLatest(ADD_COVER, handleAddCover);
}

export function* watchUpdateCover() {
  yield takeLatest(UPDATE_COVER, handleUpdateCover);
}

export function* watchUpdateProfile() {
  yield takeLatest(UPDATE_PROFILE, handleProfileUpdate);
}

export function* watchRemoveProfileImage() {
  yield takeLatest(REMOVE_IMAGE, handleRemoveProfileImage);
}

// Searching
export function* watchSearch() {
  yield takeLatest(SEARCH_IT, handleSearch);
}

// follow request
export function* watchFollow() {
  yield takeLatest(GET_FOLLOW, handleFollow);
}

// unFollow request
export function* watchUnFollow() {
  yield takeLatest(GET_UNFOLLOW, handleUnFollow);
}

// view video
export function* watchViewVideo() {
  yield takeLatest(VIEW_VIDEO, handleViewVideo);
}


// get all followers
export function* watchGetFollowers() {
  yield takeLatest(GET_FOLLOWERS, getFollowersHandler);
}

// admin saga for temporary
export function* watchLoginAdmin() {
  yield takeLatest(AUTH_ADMIN, handleRequestAdminAuth);
}

// exporting to watcher saga
export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchAuthUser),
    fork(watchLoginAdmin),
    fork(watchRemoveCover),
    fork(watchAddCover),
    fork(watchUpdateCover),
    fork(watchUpdateProfile),
    fork(watchRemoveProfileImage),
    fork(watchSearch),
    fork(watchFollow),
    fork(watchGetFollowers),
    fork(watchUnFollow),
    fork(watchViewVideo)
  ]);
}
