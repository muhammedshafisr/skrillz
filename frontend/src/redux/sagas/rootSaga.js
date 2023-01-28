import { fork, takeLatest, all } from "redux-saga/effects";
import { AUTH_USER } from "../ducks/authUser";
import { GET_USER } from "../ducks/user";
import { handleRequestAdminAuth } from "./handlers/adminAuthHandler";
import { handleRequestAuth } from "./handlers/authUser";
import { handleRequestLogin } from "./handlers/loginUser";
import { AUTH_ADMIN } from "../ducks/adminAuth";


// catching user authentication 
export function* watchAuthUser() {
  yield takeLatest(AUTH_USER, handleRequestAuth);
}

// catching user login
export function* watchLoginUser() {
  yield takeLatest(GET_USER, handleRequestLogin);
}

// admin saga for temporary
export function* watchLoginAdmin() {
  yield takeLatest(AUTH_ADMIN, handleRequestAdminAuth);
}

// exporting to watcher saga
export default function* rootSaga() {
  yield all([fork(watchLoginUser), fork(watchAuthUser), fork(watchLoginAdmin)]);
}
