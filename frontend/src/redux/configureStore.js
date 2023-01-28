import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import UserAuthReducer, { error } from "./ducks/authUser";
import UserLoginReducer, { loginError } from "./ducks/user";
import AdminLoginReducer, { adminError } from "./ducks/adminAuth";

const reducer = combineReducers({
  UserAuth: UserAuthReducer,
  UserAuthError: error,
  UserLogin: UserLoginReducer,
  UserLoginError: loginError,
  AdminAuth: AdminLoginReducer,
  AdminAuthError: adminError,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
