import { all } from "redux-saga/effects";
import { watchfetchUsers } from "./fetchGetUsers";
import { watchFetchAddUser } from "./fetchRegisterUser";
import { watchFetchLoginUser } from "./fetchLoginUser";

export default function* rootSaga() {
  yield all([watchfetchUsers(), watchFetchAddUser(), watchFetchLoginUser()]);
}
