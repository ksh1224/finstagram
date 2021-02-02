import { AxiosError } from "axios";
import { createReducer } from "typesafe-actions";

type State = {
  user: any;
  isFetching: boolean;
  error: AxiosError | undefined;
};

const initialState = {
  user: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<State, Actions>(initialState, {
  API_LOGIN_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  API_LOGIN_SUCCESS: (state, action) => ({
    user: action.payload,
    error: undefined,
    isFetching: false,
  }),
  API_LOGIN_FAIL: (state, action) => ({
    user: null,
    error: action.payload,
    isFetching: false,
  }),
  API_LOGOUT: () => ({
    user: undefined,
    isFetching: false,
    error: undefined,
  }),
});
