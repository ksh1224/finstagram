import { createReducer, ActionType } from "typesafe-actions";

import * as actions from "store/actions";

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
  FEEDBACK_MAIN_REQUEST: (state, action) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  FEEDBACK_MAIN_SUCCESS: (state, action) => ({
    data: action.payload,
    isFetching: false,
    error: null,
  }),
  FEEDBACK_MAIN_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
