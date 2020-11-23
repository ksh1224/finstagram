import { AxiosError } from "axios";
import { createReducer } from "typesafe-actions";

type State = {
  data: any;
  extraData: any;
  availableDates: any;
  availableOptions: any;
  isFetching: boolean;
  error: AxiosError | null;
};
const initialState = {
  data: null,
  extraData: null,
  availableDates: null,
  availableOptions: null,
  isFetching: false,
  error: null,
};

export default createReducer<State, Actions>(initialState, {
  TOP_RANKER_DETAIL_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  TOP_RANKER_DETAIL_SUCCESS: (state, action) => ({
    data: action.payload.data,
    extraData: action.payload.extraData,
    availableDates: action.payload.availableDates,
    availableOptions: action.payload.availableOptions,
    isFetching: false,
    error: null,
  }),
  TOP_RANKER_DETAIL_FAIL: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
});
