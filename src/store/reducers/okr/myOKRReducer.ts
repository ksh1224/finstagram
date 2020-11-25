import { createReducer } from "typesafe-actions";

const initialState = {
  data: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<DefaultState, Actions>(initialState, {
  MY_OKR_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  MY_OKR_SUCCESS: (state, action) => ({
    data: action.payload,
    error: undefined,
    isFetching: false,
  }),
  MY_OKR_FAIL: (state, action) => ({
    data: undefined,
    error: action.payload,
    isFetching: false,
  }),
});
