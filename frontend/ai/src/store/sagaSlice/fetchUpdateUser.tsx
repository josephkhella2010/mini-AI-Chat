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
import { setUpdateUser } from "../reduxSlice/MainUserSlice";

interface PayloadType {
  msg: string;
  user: UserType;
}

function* fetchUpdateUser(
  action: PayloadAction<{ userId: number; data: UserType }>,
): SagaIterator {
  try {
    yield put(setLoading());
    const fetchApiUrl = () =>
      fetchApi(
        `update-user/userId=${action.payload.userId}`,
        "PUT",
        action.payload.data,
        true,
      );
    const resonse: PayloadType = yield call(fetchApiUrl);
    const { msg, user } = resonse;
    yield put(
      setUpdateUser({
        userId: action.payload.userId,
        data: user,
      }),
    );
    toast.success(msg);
    localStorage.setItem("user", JSON.stringify(user));

    yield put(setClearLoading());
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

export function* watchFetchUpdateUser() {
  yield takeLatest("FETCH_UPDATE_USER", fetchUpdateUser);
}
