import { call, put, takeLatest } from "redux-saga/effects";
import { fetchApi } from "../../utilities/apiHeader";
import {
  setClearLoading,
  setError,
  setLoading,
} from "../reduxSlice/LoadingAndErrorSlice";
import type { SagaIterator } from "redux-saga";
import type { UserType } from "../../utilities/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
interface RegisterResponse {
  msg: string;
  user: UserType;
  token?: string;
}

function* fetchDeleteUser(action: PayloadAction<number>): SagaIterator {
  try {
    yield put(setLoading());

    const response: RegisterResponse = yield call(
      fetchApi,
      `delete-user/userId=${action.payload}`,
      "DELETE",
      {},
      true,
    );

    const { msg } = response;

    yield put(setClearLoading());
    toast.success(msg);
  } catch (error: any) {
    const msg =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong";

    yield put(setError(msg));
    toast.error(msg);
  }
}

export function* watchFetchDeleteUser() {
  yield takeLatest("FETCH_DELETE_USER", fetchDeleteUser);
}
