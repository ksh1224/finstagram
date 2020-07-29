import { createReducer, ActionType } from "typesafe-actions";

import { actions } from "../actions";

type State = {
  isFetching: boolean;
  data: any;
  error: any;
};

const initialState = {
  isFetching: false,
  data: null,
  error: null,
};

export type Action = ActionType<typeof actions>;

export default createReducer<State, Action>(initialState, {
  USER_LOGIN_REQUEST: (state) => ({
    ...state,
    error: null,
    isFetching: true,
  }),
  USER_LOGOUT_REQUEST: (state) => ({
    ...state,
    error: null,
    isFetching: true,
  }),
  USER_LOGIN_SUCCESS: (state, action) => ({
    data: action.payload,
    error: null,
    isFetching: false,
  }),
  USER_LOGOUT_SUCCESS: (state, action) => ({
    ...initialState,
  }),
  USER_LOGIN_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
  USER_LOGOUT_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
