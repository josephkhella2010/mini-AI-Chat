import { call, put, takeLatest } from "redux-saga/effects";
import { setAddUser } from "../reduxSlice/MainUserSlice";
import { fetchApi } from "../../utilities/apiHeader";
import {
  setClearLoading,
  setError,
  setLoading,
} from "../reduxSlice/LoadingAndErrorSlice";
import type { SagaIterator } from "redux-saga";
import type { RegisterPayload, UserType } from "../../utilities/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
interface RegisterResponse {
  msg: string;
  user: UserType;
  token?: string;
}

function* fetchAddUserSaga(
  action: PayloadAction<RegisterPayload>,
): SagaIterator {
  const fetchApiUrl = () =>
    fetchApi<RegisterResponse>("register-user", "POST", action.payload, false);
  console.log("SAGA RUNNING 🔥", action.payload);
  try {
    yield put(setLoading());
    const response: RegisterResponse = yield call(fetchApiUrl);
    yield put(setAddUser(response.user));
    yield put(setClearLoading());
    toast.success(response.msg);
  } catch (error: any) {
    console.log("FULL ERROR:", error);

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

export function* watchFetchAddUser() {
  yield takeLatest("FETCH_ADD_USER", fetchAddUserSaga);
}
