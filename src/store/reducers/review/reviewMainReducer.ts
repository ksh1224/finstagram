import { AxiosError } from "axios";
import { createReducer } from "typesafe-actions";

type State = {
  data?: any;
  isFetching: boolean;
  availableMetas?: undefined;
  error: AxiosError | undefined;
};

const initialState = {
  data: undefined,
  availableMetas: undefined,
  isFetching: false,
  error: undefined,
};

export default createReducer<State, Actions>(initialState, {
  REVIEW_MAIN_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  REVIEW_MAIN_SUCCESS: (state, action) => ({
    data: action.payload.data,
    availableMetas: action.payload.availableMetas,
    error: undefined,
    isFetching: false,
  }),
  REVIEW_MAIN_FAIL: (state, action) => ({
    data: undefined,
    error: action.payload,
    isFetching: false,
  }),
});
