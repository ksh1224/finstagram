import { createReducer } from "typesafe-actions";

const initialState = {
  data: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<DefaultState, Actions>(initialState, {
  TEAM_OKR_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  TEAM_OKR_SUCCESS: (state, action) => ({
    data: action.payload,
    error: undefined,
    isFetching: false,
  }),
  TEAM_OKR_FAIL: (state, action) => ({
    data: undefined,
    error: action.payload,
    isFetching: false,
  }),
});
