import { createReducer } from "typesafe-actions";

const initialState = {
  data: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<DefaultState, Actions>(initialState, {
  TOP_RANKER_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  TOP_RANKER_SUCCESS: (state, action) => ({
    data: action.payload,
    isFetching: false,
    error: undefined,
  }),
  TOP_RANKER_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
