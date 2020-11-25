import { createReducer } from "typesafe-actions";

const initialState = {
  data: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<DefaultState, Actions>(initialState, {
  SEARCH_USER_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  SEARCH_USER_SUCCESS: (state, action) => ({
    data: action.payload,
    isFetching: false,
    error: undefined,
  }),
  SEARCH_USER_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
