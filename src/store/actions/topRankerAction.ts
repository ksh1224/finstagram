import { createAsyncAction } from "typesafe-actions";

const TOP_RANKER_REQUEST = "TOP_RANKER_REQUEST";
const TOP_RANKER_SUCCESS = "TOP_RANKER_SUCCESS";
const TOP_RANKER_FAIL = "TOP_RANKER_FAIL";

const TOP_RANKER_DETAIL_REQUEST = "TOP_RANKER_DETAIL_REQUEST";
const TOP_RANKER_DETAIL_SUCCESS = "TOP_RANKER_DETAIL_SUCCESS";
const TOP_RANKER_DETAIL_FAIL = "TOP_RANKER_DETAIL_FAIL";

export const topRankerActionAsync = createAsyncAction(
  TOP_RANKER_REQUEST,
  TOP_RANKER_SUCCESS,
  TOP_RANKER_FAIL
)<void, any, Error>();

export const topRankerActionTypes = {
  TOP_RANKER_REQUEST,
  TOP_RANKER_SUCCESS,
  TOP_RANKER_FAIL,
};

export const topRankerDetailActionAsync = createAsyncAction(
  TOP_RANKER_DETAIL_REQUEST,
  TOP_RANKER_DETAIL_SUCCESS,
  TOP_RANKER_DETAIL_FAIL
)<any, any, Error>();

export const topRankerDetailActionTypes = {
  TOP_RANKER_DETAIL_REQUEST,
  TOP_RANKER_DETAIL_SUCCESS,
  TOP_RANKER_DETAIL_FAIL,
};
