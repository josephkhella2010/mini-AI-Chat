import { call, put, takeLatest } from "redux-saga/effects";
import { fetchApi } from "../../utilities/apiHeader";
import {
  setClearLoading,
  setError,
  setLoading,
} from "../reduxSlice/LoadingAndErrorSlice";
import type { SagaIterator } from "redux-saga";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setGetAllChatUser } from "../reduxSlice/MainUserSlice";

function* fetchGetAllChatUser(
  action: PayloadAction<{ userId: number }>,
): SagaIterator {
  try {
    yield put(setLoading());
    const ApiFecthHeader = () =>
      fetchApi(
        `get-user-chats/userId=${action.payload.userId}`,
        "GET",
        null,
        true,
      );
    const response = yield call(ApiFecthHeader);
    const { msg, items } = response;
    yield put(setGetAllChatUser(items));
    toast.success(msg);

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

export default function* watchGetAllChatUser() {
  yield takeLatest("FETCH_ALL_CHATS_USER", fetchGetAllChatUser);
}
