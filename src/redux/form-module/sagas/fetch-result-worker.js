import { call, put } from "redux-saga/effects";
import {
  startLoadingAction,
  stopLoadingAction,
  setErrorsAction,
  removeErrorsAction
} from "../actions";
import { mockFormValuesRequest } from "../../../services/requests";

const sleep = () =>
  new Promise(res => {
    setTimeout(() => res(), 2000);
  });

export function* formFetchValuesWorkerSaga(payload) {
  console.log("formFetchWorkerSaga goes", payload);

  yield put(startLoadingAction());

  yield sleep(1000);

  const { error } = yield call(mockFormValuesRequest, payload);

  console.log("RESPONCE ERROR", error);

  yield put(setErrorsAction(error));
  yield put(stopLoadingAction());
}
