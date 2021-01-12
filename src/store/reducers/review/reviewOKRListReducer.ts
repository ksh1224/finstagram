import { createReducer } from "typesafe-actions";

const initialState = {
  data: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<DefaultState, Actions>(initialState, {
  REVIEW_OKR_LIST_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  REVIEW_OKR_LIST_SUCCESS: (state, action) => ({
    data: action.payload,
    error: undefined,
    isFetching: false,
  }),
  REVIEW_OKR_LIST_FAIL: (state, action) => ({
    data: undefined,
    error: action.payload,
    isFetching: false,
  }),
});
