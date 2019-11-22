import { createAction } from "redux-actions";

export const START_SEND_LOADING = "START_SEND_LOADING";
export const startLoadingAction = createAction(START_SEND_LOADING);

export const STOP_SEND_LOADING = "STOP_SEND_LOADING";
export const stopLoadingAction = createAction(STOP_SEND_LOADING);

export const FETCH_SCHEMA = "FETCH_SCHEMA";
export const fetchSchemaAction = createAction(FETCH_SCHEMA);

export const FETCH_FORM_VALUES = "FETCH_FORM_VALUES";
export const fetchFormValuesAction = createAction(FETCH_FORM_VALUES);

export const SET_SCHEMA = "SET_SCHEMA";
export const setSchemaAction = createAction(SET_SCHEMA);

export const REMOVE_SCHEMA = "REMOVE_SCHEMA";
export const removeSchemaAction = createAction(REMOVE_SCHEMA);

export const SET_ERRORS = "SET_ERRORS";
export const setErrorsAction = createAction(SET_ERRORS);

export const REMOVE_ERRORS = "REMOVE_ERRORS";
export const removeErrorsAction = createAction(REMOVE_ERRORS);
