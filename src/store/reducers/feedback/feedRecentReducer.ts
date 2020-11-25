import { AxiosError } from "axios";
import { createReducer } from "typesafe-actions";

type State = {
  data: any;
  currentPage: number | null;
  totalPages: number | null;
  isFetching: boolean;
  error: AxiosError | undefined;
};

const initialState = {
  data: undefined,
  currentPage: null,
  totalPages: null,
  isFetching: false,
  error: undefined,
};

export default createReducer<State, Actions>(initialState, {
  FEED_RECENT_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  FEED_RECENT_SUCCESS: (state, action) => ({
    ...state,
    data: action.payload.data,
    currentPage: action.payload.currentPage,
    totalPages: action.payload.totalPages,
    isFetching: false,
    error: undefined,
  }),
  FEED_RECENT_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
