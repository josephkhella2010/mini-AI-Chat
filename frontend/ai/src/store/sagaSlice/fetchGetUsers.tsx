import { call, put, takeLatest } from "redux-saga/effects";
import { setUsers } from "../reduxSlice/MainUserSlice";
import { fetchApi } from "../../utilities/apiHeader";
import {
  setClearLoading,
  setError,
  setLoading,
} from "../reduxSlice/LoadingAndErrorSlice";
import type { SagaIterator } from "redux-saga";
import type { UserType } from "../../utilities/interfaces";

const fetchApiUrl = () => fetchApi<UserType[]>("/users", "GET", {}, false);
function* fetchUsersSaga(): SagaIterator {
  try {
    yield put(setLoading());
    const ApiUsers = yield call(fetchApiUrl);
    const users = ApiUsers?.users;

    yield put(setUsers(users));

    yield put(setClearLoading());
  } catch (error: any) {
    const msg =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      "Add item failed";
    yield put(setError(msg));
  }
}

export function* watchfetchUsers() {
  yield takeLatest("FETCH_USERS", fetchUsersSaga);
}
