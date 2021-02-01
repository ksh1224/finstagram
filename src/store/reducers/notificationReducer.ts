import { AxiosError } from "axios";
import { createReducer } from "typesafe-actions";

type State = {
  data: any;
  currentPage: number | null;
  totalPages: number | null;
  totalCount: number | null;
  notiCount: number | null;
  isFetching: boolean;
  error: AxiosError | undefined;
};

const initialState = {
  data: undefined,
  currentPage: null,
  totalPages: null,
  totalCount: null,
  notiCount: null,
  isFetching: false,
  error: undefined,
};

export default createReducer<State, Actions>(initialState, {
  NOTIFICATION_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  NOTIFICATION_SUCCESS: (state, action) => ({
    ...state,
    data: action.payload.data,
    currentPage: action.payload.currentPage,
    totalPages: action.payload.totalPages,
    totalCount: action.payload.totalCount,
    notiCount: action.payload.notiCount,
    isFetching: false,
    error: undefined,
  }),
  NOTIFICATION_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
