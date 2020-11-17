import { createReducer } from "typesafe-actions";

const initialState = {
  data: null,
  isFetching: false,
  error: null,
};

export default createReducer<DefaultState, Actions>(initialState, {
  FEEDBACK_STATISTICS_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  FEEDBACK_STATISTICS_SUCCESS: (state, action) => ({
    data: action.payload,
    isFetching: false,
    error: null,
  }),
  FEEDBACK_STATISTICS_FAIL: (state, action) => ({
    data: null,
    isFetching: false,
    error: action.payload,
  }),
});
