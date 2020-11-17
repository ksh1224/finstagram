import { createReducer } from "typesafe-actions";

type State = {
  data: any;
  currentPage: number | null;
  totalPages: number | null;
  isFetching: boolean;
  error: any;
};

const initialState = {
  data: null,
  currentPage: null,
  totalPages: null,
  isFetching: false,
  error: null,
};

export default createReducer<DefaultState, Actions>(initialState, {
  FEED_BADGE_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  FEED_BADGE_SUCCESS: (state, action) => ({
    data: action.payload.data,
    currentPage: action.payload.currentPage,
    totalPages: action.payload.totalPages,
    isFetching: false,
    error: null,
  }),
  FEED_BADGE_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
