import { createReducer, ActionType } from "typesafe-actions";

import * as actions from "store/actions";

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

export type Action = ActionType<typeof actions>;

export default createReducer<State, Action>(initialState, {
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
