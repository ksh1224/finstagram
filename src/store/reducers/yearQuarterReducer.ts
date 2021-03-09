import { AxiosError } from "axios";
import { createReducer } from "typesafe-actions";

type State = {
  data: any;
  isFetching: boolean;
  error: AxiosError | undefined;
};

const initialState = {
  data: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<State, Actions>(initialState, {
  YEAR_QUARTER_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  YEAR_QUARTER_SUCCESS: (state, action) => ({
    ...state,
    data: action.payload,
    isFetching: false,
    error: undefined,
  }),
  YEAR_QUARTER_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
