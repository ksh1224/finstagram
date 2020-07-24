import { createReducer, ActionType } from "typesafe-actions";

import { actions } from "../actions";

type State = {
  isFetching: boolean;
  error: ObjectType | null;
};

const initialState = {
  isFetching: false,
  error: null,
};

export type Action = ActionType<typeof actions>;

export default createReducer<State, Action>(initialState, {
  ACCESS_TOKEN_REQUEST: () => ({
    error: null,
    isFetching: true,
  }),
  ACCESS_TOKEN_SUCCESS: () => ({
    error: null,
    isFetching: false,
  }),
  ACCESS_TOKEN_FAIL: (state, action) => ({
    error: action.payload,
    isFetching: false,
  }),
});
