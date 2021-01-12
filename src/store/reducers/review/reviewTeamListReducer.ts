import { createReducer } from "typesafe-actions";

const initialState = {
  data: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<DefaultState, Actions>(initialState, {
  REVIEW_TEAM_LIST_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  REVIEW_TEAM_LIST_SUCCESS: (state, action) => ({
    data: action.payload,
    error: undefined,
    isFetching: false,
  }),
  REVIEW_TEAM_LIST_FAIL: (state, action) => ({
    data: undefined,
    error: action.payload,
    isFetching: false,
  }),
});
