import { all } from "redux-saga/effects";
import { watchfetchUsers } from "./fetchGetUsers";
import { watchFetchAddUser } from "./fetchRegisterUser";

export default function* rootSaga() {
  yield all([watchfetchUsers(), watchFetchAddUser()]);
}
