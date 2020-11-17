import { createReducer } from "typesafe-actions";

const initialState = {
  data: null,
  isFetching: false,
  error: null,
};

export default createReducer<DefaultState, Actions>(initialState, {
  FEED_SENT_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  FEED_SENT_SUCCESS: (state, action) => ({
    ...state,
    data: action.payload,
    isFetching: false,
    error: null,
  }),
  FEED_SENT_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
