/* /* import { call, put, takeLatest } from "redux-saga/effects";
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
 */
/* 
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

    const response: {
      msg: string;
      chat: { chatId: number };
      item: ItemsChatType;
    } = yield call(ApiUrl);

    const { msg, item, chat } = response;

    const realChatId = chat.chatId;

    // ✅ Save chatId when first chat is created
    if (!localStorage.getItem("chatId")) {
      localStorage.setItem("chatId", String(realChatId));
    }

    // ✅ Use returned chatId instead of payload chatId
    yield put(
      setAddNewItemChat({
        userId: action.payload.userId,
        chatId: realChatId,
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

export default function* watchAddNewItemChat() {
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
  chatId?: number | null;
  data: {
    question: string;
  };
}

function* fetchAddNewItemChat(
  action: PayloadAction<AddItemPayload>,
): SagaIterator {
  try {
    yield put(setLoading());

    // if chatId does not exist send null
    const chatId = action.payload.chatId ?? "null";

    const ApiUrl = () =>
      fetchApi(
        `add-chat-item/userId=${action.payload.userId}/chatId=${chatId}`,
        "POST",
        { question: action.payload.data.question },
        true,
      );

    const response: {
      msg: string;
      chat: { chatId: number };
      item: ItemsChatType;
    } = yield call(ApiUrl);

    const { msg, chat, item } = response;

    const realChatId = chat.chatId;

    // save active chatId
    localStorage.setItem("chatId", String(realChatId));

    // update redux store
    yield put(
      setAddNewItemChat({
        userId: action.payload.userId,
        chatId: realChatId,
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

export default function* watchAddNewItemChat() {
  yield takeLatest("FETCH_ADD_NEW_ITEM_CHAT", fetchAddNewItemChat);
}
