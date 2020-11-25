import { createReducer } from "typesafe-actions";

const initialState = {
  data: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<DefaultState, Actions>(initialState, {
  FEED_RECEIVED_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  FEED_RECEIVED_SUCCESS: (state, action) => ({
    ...state,
    data: action.payload,
    isFetching: false,
    error: undefined,
  }),
  FEED_RECEIVED_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
