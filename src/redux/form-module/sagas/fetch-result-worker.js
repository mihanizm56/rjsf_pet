import { call, put } from "redux-saga/effects";
import {
  startLoadingAction,
  stopLoadingAction,
  setErrorsAction,
  removeErrorsAction
} from "../actions";
import { mockFormValuesRequest } from "../../../services/requests";

const sleep = ms =>
  new Promise(res => {
    setTimeout(() => res(), ms);
  });

export function* formFetchValuesWorkerSaga(payload) {
  console.log("formFetchWorkerSaga goes", payload);
  yield put(removeErrorsAction());

  yield put(startLoadingAction());

  yield sleep(500);

  const { errors } = yield call(mockFormValuesRequest, payload);

  console.log("RESPONCE ERROR", errors);

  yield put(setErrorsAction(errors));
  yield put(stopLoadingAction());
}
