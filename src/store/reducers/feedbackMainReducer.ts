import { createReducer } from "typesafe-actions";

const initialState = {
  data: null,
  isFetching: false,
  error: null,
};

export default createReducer<DefaultState, Actions>(initialState, {
  FEEDBACK_MAIN_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  FEEDBACK_MAIN_SUCCESS: (state, action) => ({
    data: action.payload,
    isFetching: false,
    error: null,
  }),
  FEEDBACK_MAIN_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
