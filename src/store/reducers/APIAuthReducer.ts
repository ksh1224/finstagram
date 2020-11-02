import { createReducer, ActionType } from "typesafe-actions";

import * as actions from "store/actions";

type State = {
  user: any;
  isFetching: boolean;
  error: any;
};

const initialState = {
  user: false,
  isFetching: false,
  error: null,
};

export type Action = ActionType<typeof actions>;

export default createReducer<State, Action>(initialState, {
  API_LOGIN_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  API_LOGIN_SUCCESS: (state, action) => ({
    user: action.payload,
    error: null,
    isFetching: false,
  }),
  API_LOGIN_ERROR: (state, action) => ({
    user: null,
    error: action.payload,
    isFetching: false,
  }),
});
