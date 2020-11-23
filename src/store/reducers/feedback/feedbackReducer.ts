import { AxiosError } from "axios";
import { createReducer } from "typesafe-actions";

const initialState = {
  success: false,
  isFetching: false,
  error: null,
};

type State = {
  success: boolean;
  isFetching: boolean;
  error: AxiosError | null;
};

export default createReducer<State, Actions>(initialState, {
  FEEDBACK_SEND_REQUEST: (state) => ({
    success: false,
    isFetching: true,
    error: null,
  }),
  FEEDBACK_SEND_SUCCESS: (state) => ({
    success: true,
    isFetching: false,
    error: null,
  }),
  FEEDBACK_SEND_FAIL: (state, action) => ({
    ...state,
    success: false,
    error: action.payload,
    isFetching: false,
  }),
  FEEDBACK_REQUEST_REQUEST: (state) => ({
    success: false,
    isFetching: true,
    error: null,
  }),
  FEEDBACK_REQUEST_SUCCESS: (state) => ({
    success: true,
    isFetching: false,
    error: null,
  }),
  FEEDBACK_REQUEST_FAIL: (state, action) => ({
    success: false,
    error: action.payload,
    isFetching: false,
  }),
});
