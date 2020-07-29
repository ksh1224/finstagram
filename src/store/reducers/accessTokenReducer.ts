import { createReducer, ActionType } from "typesafe-actions";

import { actions } from "../actions";

type State = {
  data: any;
  isFetching: boolean;
  error: any;
};

const initialState = {
  data: null,
  isFetching: false,
  error: null,
};

export type Action = ActionType<typeof actions>;

export default createReducer<State, Action>(initialState, {
  ACCESS_TOKEN_REQUEST: (state, action) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  ACCESS_TOKEN_SUCCESS: (state, action) => ({
    data: action.payload,
    isFetching: false,
    error: null,
  }),
  ACCESS_TOKEN_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
