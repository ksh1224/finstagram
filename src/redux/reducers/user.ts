import { createReducer, ActionType } from "typesafe-actions";

import { actions } from "../actions";

type State = {
  isFetching: boolean;
  info: ObjectType;
  error: ObjectType | null;
};

const initialState = {
  isFetching: false,
  info: {},
  error: null,
};

export type Action = ActionType<typeof actions>;

export default createReducer<State, Action>(initialState, {
  USER_REQUEST: (state) => ({
    ...state,
    error: null,
    isFetching: true,
  }),
  USER_LOGIN_SUCCESS: (state, action) => ({
    info: action.payload.data,
    error: null,
    isFetching: false,
  }),
  USER_LOGOUT_SUCCESS: () => ({
    ...initialState,
  }),
  USER_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
