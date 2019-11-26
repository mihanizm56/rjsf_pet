import { call, put } from "redux-saga/effects";
import {
  startLoadingAction,
  stopLoadingAction,
  setSchemaAction
} from "../actions";
import { schemaRequest } from "../../../services/requests";

import { sleep } from "../../../services/sleep";

export function* formWorkerSaga() {
  console.log("formWorkerSaga goes");

  yield put(startLoadingAction());

  yield sleep(500);

  const { schema } = yield call(schemaRequest);

  yield put(setSchemaAction(schema));

  yield put(stopLoadingAction());
}
