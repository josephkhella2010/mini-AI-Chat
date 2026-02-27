import { call, put, takeLatest } from "redux-saga/effects";
import { setLogInUser } from "../reduxSlice/MainUserSlice";
import { fetchApi } from "../../utilities/apiHeader";
import {
  setClearLoading,
  setError,
  setLoading,
} from "../reduxSlice/LoadingAndErrorSlice";
import type { SagaIterator } from "redux-saga";
import type { loginPayload, UserType } from "../../utilities/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
interface LoginResponse {
  msg: string;
  user: UserType;
  token: string;
}

function* fetchLoginUserSaga(
  action: PayloadAction<loginPayload>,
): SagaIterator {
  const fetchApiUrl = () =>
    fetchApi<LoginResponse>("login-user", "POST", action.payload, false);
  try {
    yield put(setLoading());
    const response: LoginResponse = yield call(fetchApiUrl);
    const { user, token, msg } = response;
    yield put(setLogInUser({ user, token }));
    toast.success(msg);
    yield put(setClearLoading());
  } catch (error: any) {
    const msg =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      JSON.stringify(error?.response?.data) ||
      error?.message ||
      "Something went wrong";
    yield put(setError(msg));
    toast.error(msg);
  }
}

export function* watchFetchLoginUser() {
  yield takeLatest("FETCH_LOGIN_USER", fetchLoginUserSaga);
}
