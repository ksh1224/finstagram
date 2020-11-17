import { createReducer } from "typesafe-actions";

type State = {
  comments: any;
  isFetching: boolean;
  error: any;
};

const initialState = {
  comments: [],
  isFetching: false,
  error: null,
};

export default createReducer<State, Actions>(initialState, {
  COMMENT_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  COMMENT_SUCCESS: (state, action) => ({
    comments: action.payload,
    isFetching: false,
    error: null,
  }),
  COMMENT_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
  // FEED_SENT_REQUEST: (state) => ({
  //   ...state,
  //   isFetching: true,
  //   error: null,
  // }),
  // FEED_SENT_SUCCESS: (state, action) => ({
  //   ...state,
  //   data: action.payload,
  //   isFetching: false,
  //   error: null,
  // }),
  // FEED_SENT_FAIL: (state, action) => ({
  //   ...state,
  //   error: action.payload,
  //   isFetching: false,
  // }),
});
