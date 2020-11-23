import { AxiosError } from "axios";
import { createReducer } from "typesafe-actions";

type State = {
  data: any;
  currentPage: number | null;
  totalPages: number | null;
  isFetching: boolean;
  error: AxiosError | null;
};

const initialState = {
  data: null,
  currentPage: null,
  totalPages: null,
  isFetching: false,
  error: null,
};

export default createReducer<State, Actions>(initialState, {
  FEED_RECENT_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  FEED_RECENT_SUCCESS: (state, action) => ({
    ...state,
    data: action.payload.data,
    currentPage: action.payload.currentPage,
    totalPages: action.payload.totalPages,
    isFetching: false,
    error: null,
  }),
  FEED_RECENT_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
