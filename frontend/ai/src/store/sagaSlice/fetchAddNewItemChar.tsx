/* import { call, put, takeLatest } from "redux-saga/effects";
import { fetchApi } from "../../utilities/apiHeader";
import {
  setClearLoading,
  setError,
  setLoading,
} from "../reduxSlice/LoadingAndErrorSlice";
import type { SagaIterator } from "redux-saga";
import type { ItemsChatType } from "../../utilities/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setAddNewItemChat } from "../reduxSlice/MainUserSlice";
interface AddItemPayload {
  userId: number;
  chatId: number;
  data: {
    question: string;
  };
}
function* fetchAddNewItemChat(
  action: PayloadAction<{
    userId: number;
    chatId: number;
    data: ItemsChatType;
  }>,
): SagaIterator {
  try {
    yield put(setLoading());
    const ApiUrl = () =>
      fetchApi(
        `add-chat-item/userId=${action.payload.userId}/chatId=${action.payload.chatId}`,
        "POST",
        { question: action.payload.data.question },
        true,
      );
    const response = yield call(ApiUrl);
    const { msg, item } = response;

    yield put(
      setAddNewItemChat({
        userId: action.payload.userId,
        chatId: action.payload.chatId,
        data: item,
      }),
    );
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

export default function* wathchAddNewItemChat() {
  yield takeLatest("FETCH_ADD_NEW_ITEM_CHAT", fetchAddNewItemChat);
}
 */
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchApi } from "../../utilities/apiHeader";
import {
  setClearLoading,
  setError,
  setLoading,
} from "../reduxSlice/LoadingAndErrorSlice";
import type { SagaIterator } from "redux-saga";
import type { ItemsChatType } from "../../utilities/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setAddNewItemChat } from "../reduxSlice/MainUserSlice";

interface AddItemPayload {
  userId: number;
  chatId: number;
  data: {
    question: string;
  };
}

function* fetchAddNewItemChat(
  action: PayloadAction<AddItemPayload>,
): SagaIterator {
  try {
    yield put(setLoading());

    const ApiUrl = () =>
      fetchApi(
        `add-chat-item/userId=${action.payload.userId}/chatId=${action.payload.chatId}`,
        "POST",
        { question: action.payload.data.question },
        true,
      );

    const response: { msg: string; item: ItemsChatType } = yield call(ApiUrl);

    const { msg, item } = response;

    yield put(
      setAddNewItemChat({
        userId: action.payload.userId,
        chatId: action.payload.chatId,
        data: item,
      }),
    );

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

export default function* wathchAddNewItemChat() {
  yield takeLatest("FETCH_ADD_NEW_ITEM_CHAT", fetchAddNewItemChat);
}
