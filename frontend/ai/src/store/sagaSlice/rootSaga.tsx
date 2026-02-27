import { all } from "redux-saga/effects";
import { watchfetchUsers } from "./fetchGetUsers";

export default function* rootSaga() {
  yield all([watchfetchUsers()]);
}
