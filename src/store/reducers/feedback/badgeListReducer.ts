import { createReducer } from "typesafe-actions";

const initialState = {
  data: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<DefaultState, Actions>(initialState, {
  BADGE_LIST_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  BADGE_LIST_SUCCESS: (state, action) => ({
    data: action.payload,
    isFetching: false,
    error: undefined,
  }),
  BADGE_LIST_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
