import { AxiosError } from "axios";
import { createReducer } from "typesafe-actions";

type State = {
  comments: any;
  isFetching: boolean;
  error: AxiosError | undefined;
};

const initialState = {
  comments: [],
  isFetching: false,
  error: undefined,
};

export default createReducer<State, Actions>(initialState, {
  COMMENT_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  COMMENT_SUCCESS: (state, action) => ({
    comments: action.payload,
    isFetching: false,
    error: undefined,
  }),
  COMMENT_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
  // FEED_SENT_REQUEST: (state) => ({
  //   ...state,
  //   isFetching: true,
  //   error: undefined,
  // }),
  // FEED_SENT_SUCCESS: (state, action) => ({
  //   ...state,
  //   data: action.payload,
  //   isFetching: false,
  //   error: undefined,
  // }),
  // FEED_SENT_FAIL: (state, action) => ({
  //   ...state,
  //   error: action.payload,
  //   isFetching: false,
  // }),
});
