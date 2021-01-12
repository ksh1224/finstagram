import { AxiosError } from "axios";
import { createReducer } from "typesafe-actions";

type State = {
  data: any;
  extraData: any;
  availableDates: any;
  availableOptions: any;
  isFetching: boolean;
  error: AxiosError | undefined;
};
const initialState = {
  data: undefined,
  extraData: undefined,
  availableDates: null,
  availableOptions: null,
  isFetching: false,
  error: undefined,
};

export default createReducer<State, Actions>(initialState, {
  TOP_RANKER_DETAIL_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: undefined,
  }),
  TOP_RANKER_DETAIL_SUCCESS: (state, action) => ({
    data: action.payload.data,
    extraData: action.payload.extraData,
    availableDates: action.payload.availableDates,
    availableOptions: action.payload.availableOptions,
    isFetching: false,
    error: undefined,
  }),
  TOP_RANKER_DETAIL_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
