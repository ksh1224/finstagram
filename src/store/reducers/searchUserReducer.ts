import { createReducer } from "typesafe-actions";

const initialState = {
  data: null,
  isFetching: false,
  error: null,
};

export default createReducer<DefaultState, Actions>(initialState, {
  SEARCH_USER_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  SEARCH_USER_SUCCESS: (state, action) => ({
    data: action.payload,
    isFetching: false,
    error: null,
  }),
  SEARCH_USER_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
