import { call, put } from "redux-saga/effects";
import { setSearch } from "../../ducks/search";
import { requestSearch } from "../requests/searchRequest";

export function* handleSearch(action) {
  try {
    const response = yield call(requestSearch, action);

    yield put(setSearch(response.data));
  } catch (error) {
    console.log(error);
  }
}
