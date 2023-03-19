import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import UserAuthReducer, { error } from "./ducks/authUser";
import UserLoginReducer, { loginError } from "./ducks/user";
import AdminLoginReducer, { adminError } from "./ducks/adminAuth";
import UserAuthorization from "./ducks/userAuthorization";
import SearchItems from "./ducks/search";
import VideoList from "./ducks/video";
import FollowList from "./ducks/follow";
import Community from "./ducks/community";

const reducer = combineReducers({
  UserAuth: UserAuthReducer,
  UserAuthError: error,
  UserLogin: UserLoginReducer,
  UserLoginError: loginError,
  AdminAuth: AdminLoginReducer,
  AdminAuthError: adminError,
  isAuth: UserAuthorization,
  searchList: SearchItems,
  videosList: VideoList,
  followList: FollowList,
  CommunityList: Community
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
