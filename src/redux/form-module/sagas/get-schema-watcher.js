import { take, fork } from "redux-saga/effects";
import { fetchSchemaAction } from "../actions";
import { formWorkerSaga } from "./get-schema-worker";

export function* formWatcherSaga() {
  while (true) {
    yield take(fetchSchemaAction.toString());

    yield fork(formWorkerSaga);
  }
}
