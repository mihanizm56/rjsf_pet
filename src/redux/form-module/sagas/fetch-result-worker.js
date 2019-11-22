import { call, put } from "redux-saga/effects";
import {
  startLoadingAction,
  stopLoadingAction,
  setErrorsAction,
  removeErrorsAction
} from "../actions";
import { mockFormValuesRequest } from "../../../services/requests";

export function* formFetchValuesWorkerSaga(payload) {
  console.log("formFetchWorkerSaga goes", payload);

  yield put(startLoadingAction());

  const { errors } = yield call(mockFormValuesRequest, payload);

  console.log("RESPONCE ERROR", errors.firstRow.firstCol.name.__errors);

  yield put(setErrorsAction(errors));
  yield put(stopLoadingAction());
}
