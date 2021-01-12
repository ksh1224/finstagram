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
  FEED_RECEIVED_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  FEED_RECEIVED_SUCCESS: (state, action) => ({
    ...state,
    data: action.payload.data,
    currentPage: action.payload.currentPage,
    totalPages: action.payload.totalPages,
    isFetching: false,
    error: undefined,
  }),
  FEED_RECEIVED_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
