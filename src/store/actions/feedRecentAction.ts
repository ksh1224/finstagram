import { createAsyncAction } from "typesafe-actions";

const FEED_RECENT_REQUEST = "FEED_RECENT_REQUEST";
const FEED_RECENT_SUCCESS = "FEED_RECENT_SUCCESS";
const FEED_RECENT_FAIL = "FEED_RECENT_FAIL";

export const feedRecentActionAsync = createAsyncAction(
  FEED_RECENT_REQUEST,
  FEED_RECENT_SUCCESS,
  FEED_RECENT_FAIL
)<void, any, Error>();

export const feedRecentActionTypes = {
  FEED_RECENT_REQUEST,
  FEED_RECENT_SUCCESS,
  FEED_RECENT_FAIL,
};
