import { take, fork } from "redux-saga/effects";
import { fetchFormValuesAction } from "../actions";
import { formFetchValuesWorkerSaga } from "./fetch-result-worker";

export function* formFetchValuesWatcherSaga() {
  while (true) {
    const { payload } = yield take(fetchFormValuesAction.toString());

    console.log("SUBMIT", payload);

    yield fork(formFetchValuesWorkerSaga, payload);
  }
}
