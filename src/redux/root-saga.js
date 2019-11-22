import { all, fork } from "redux-saga/effects";
import { formWatcherSaga, formFetchValuesWatcherSaga } from "./form-module";

export function* rootSaga() {
  yield all([fork(formWatcherSaga), fork(formFetchValuesWatcherSaga)]);
}
