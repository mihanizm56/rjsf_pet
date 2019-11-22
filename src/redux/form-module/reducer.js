import { handleActions } from "redux-actions";
import {
  START_SEND_LOADING,
  STOP_SEND_LOADING,
  SET_SCHEMA,
  REMOVE_SCHEMA,
  SET_ERRORS,
  REMOVE_ERRORS
} from "./actions";

const initialState = {
  isLoading: false,
  schema: {},
  errors: {}
};

const reducer = handleActions(
  {
    [START_SEND_LOADING]: state => ({
      ...state,
      isLoading: true
    }),
    [STOP_SEND_LOADING]: state => ({
      ...state,
      isLoading: false
    }),
    [SET_SCHEMA]: (state, { payload }) => ({
      ...state,
      schema: payload
    }),
    [SET_ERRORS]: (state, { payload }) => ({
      ...state,
      errors: payload
    }),
    [REMOVE_ERRORS]: state => ({
      ...state,
      errors: []
    })
  },
  initialState
);

export default reducer;
