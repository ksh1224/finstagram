import { createReducer } from "typesafe-actions";

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

export default createReducer<State, Actions>(initialState, {
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
