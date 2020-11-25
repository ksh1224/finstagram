import { createReducer } from "typesafe-actions";

const initialState = {
  data: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<DefaultState, Actions>(initialState, {
  FEEDBACK_BADGE_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  FEEDBACK_BADGE_SUCCESS: (state, action) => ({
    data: action.payload,
    isFetching: false,
    error: undefined,
  }),
  FEEDBACK_BADGE_FAIL: (state, action) => ({
    data: undefined,
    isFetching: false,
    error: action.payload,
  }),
});
