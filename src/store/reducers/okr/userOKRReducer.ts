import { createReducer } from "typesafe-actions";

const initialState = {
  data: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<DefaultState, Actions>(initialState, {
  USER_OKR_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  USER_OKR_SUCCESS: (state, action) => ({
    data: action.payload,
    error: undefined,
    isFetching: false,
  }),
  USER_OKR_FAIL: (state, action) => ({
    data: undefined,
    error: action.payload,
    isFetching: false,
  }),
  USER_OKR_CANCEL: (state, action) => ({
    ...state,
    data: undefined,
  }),
});
