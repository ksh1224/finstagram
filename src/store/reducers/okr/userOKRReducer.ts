import { createReducer } from "typesafe-actions";

const initialState = {
  data: false,
  isFetching: false,
  error: null,
};

export default createReducer<DefaultState, Actions>(initialState, {
  USER_OKR_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  USER_OKR_SUCCESS: (state, action) => ({
    data: action.payload,
    error: null,
    isFetching: false,
  }),
  USER_OKR_FAIL: (state, action) => ({
    data: null,
    error: action.payload,
    isFetching: false,
  }),
  USER_OKR_CANCEL: (state, action) => ({
    ...state,
    data: null,
  }),
});
