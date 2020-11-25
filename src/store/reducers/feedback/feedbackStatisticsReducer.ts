import { createReducer } from "typesafe-actions";

const initialState = {
  data: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<DefaultState, Actions>(initialState, {
  FEEDBACK_STATISTICS_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  FEEDBACK_STATISTICS_SUCCESS: (state, action) => ({
    data: action.payload,
    isFetching: false,
    error: undefined,
  }),
  FEEDBACK_STATISTICS_FAIL: (state, action) => ({
    data: undefined,
    isFetching: false,
    error: action.payload,
  }),
});
