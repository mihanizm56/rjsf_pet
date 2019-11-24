import { call, put } from "redux-saga/effects";
import {
  startLoadingAction,
  stopLoadingAction,
  setSchemaAction,
  removeSchemaAction,
  setErrorsAction,
  removeErrorsAction
} from "../actions";
import { schemaRequest } from "../../../services/requests";
import { batchActions } from "redux-batched-actions";

export function* formWorkerSaga() {
  console.log("formWorkerSaga goes");

  yield put(startLoadingAction());

  const { schema } = yield call(schemaRequest);

  yield put(batchActions([setSchemaAction(schema), stopLoadingAction()]));
}
