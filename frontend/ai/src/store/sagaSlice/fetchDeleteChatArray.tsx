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
import { setDeleteChatItem } from "../reduxSlice/MainUserSlice";

interface DeleteChatResponse {
  msg: string;
  user: UserType;
}
function* fetchDeleteChatUser(
  action: PayloadAction<{ userId: number; chatId: number }>,
): SagaIterator {
  try {
    yield put(setLoading());
    const ApiURL: () => Promise<DeleteChatResponse> = () =>
      fetchApi(
        `delete-chat-item/userId=${action.payload.userId}/chatId=${action.payload.chatId}`,
        "DELETE",
        null,
        true,
      );
    const response: DeleteChatResponse = yield call(ApiURL);
    const { msg } = response;
    yield put(
      setDeleteChatItem({
        userId: action.payload.userId,
        chatId: action.payload.chatId,
      }),
    );

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

export default function* watchDeleteChatUser() {
  yield takeLatest("FETCH_DELETE_CHAT_USER", fetchDeleteChatUser);
}
