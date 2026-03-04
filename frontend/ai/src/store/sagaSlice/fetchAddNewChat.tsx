import { call, put, takeLatest } from "redux-saga/effects";
import { fetchApi } from "../../utilities/apiHeader";
import {
  setClearLoading,
  setError,
  setLoading,
} from "../reduxSlice/LoadingAndErrorSlice";
import type { SagaIterator } from "redux-saga";
import type { ChatType } from "../../utilities/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setAddChatToUser } from "../reduxSlice/MainUserSlice";

interface ResponseType {
  msg: string;
  chat: ChatType;
}

function* fetchAddNewChat(
  action: PayloadAction<{ userId: number }>,
): SagaIterator {
  try {
    yield put(setLoading());
    const FetchApiUrl = () =>
      fetchApi(`add-chat/userId=${action.payload.userId}`, "POST", null, true);
    const response: ResponseType = yield call(FetchApiUrl);
    const { msg, chat } = response;

    // 🔥 1️⃣ Get user from localStorage
    yield put(setAddChatToUser(chat));

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

export default function* WatchAddNewChat() {
  yield takeLatest("FETCH_ADD_NEW_CHAT", fetchAddNewChat);
}
