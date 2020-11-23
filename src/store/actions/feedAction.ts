import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";

const FEED_RECENT_REQUEST = "FEED_RECENT_REQUEST";
const FEED_RECENT_SUCCESS = "FEED_RECENT_SUCCESS";
const FEED_RECENT_FAIL = "FEED_RECENT_FAIL";

const FEED_RECEIVED_REQUEST = "FEED_RECEIVED_REQUEST";
const FEED_RECEIVED_SUCCESS = "FEED_RECEIVED_SUCCESS";
const FEED_RECEIVED_FAIL = "FEED_RECEIVED_FAIL";

const FEED_SENT_REQUEST = "FEED_SENT_REQUEST";
const FEED_SENT_SUCCESS = "FEED_SENT_SUCCESS";
const FEED_SENT_FAIL = "FEED_SENT_FAIL";

const FEED_BADGE_REQUEST = "FEED_BADGE_REQUEST";
const FEED_BADGE_SUCCESS = "FEED_BADGE_SUCCESS";
const FEED_BADGE_FAIL = "FEED_BADGE_FAIL";

export const feedRecentActionAsync = createAsyncAction(
  FEED_RECENT_REQUEST,
  FEED_RECENT_SUCCESS,
  FEED_RECENT_FAIL
)<any, any, AxiosError>();
export const feedRecentActionTypes = {
  FEED_RECENT_REQUEST,
  FEED_RECENT_SUCCESS,
  FEED_RECENT_FAIL,
};

export const feedRecivedActionAsync = createAsyncAction(
  FEED_RECEIVED_REQUEST,
  FEED_RECEIVED_SUCCESS,
  FEED_RECEIVED_FAIL
)<any, any, AxiosError>();
export const feedRecivedActionTypes = {
  FEED_RECEIVED_REQUEST,
  FEED_RECEIVED_SUCCESS,
  FEED_RECEIVED_FAIL,
};

export const feedSentActionAsync = createAsyncAction(
  FEED_SENT_REQUEST,
  FEED_SENT_SUCCESS,
  FEED_SENT_FAIL
)<any, any, AxiosError>();
export const feedSentActionTypes = {
  FEED_SENT_REQUEST,
  FEED_SENT_SUCCESS,
  FEED_SENT_FAIL,
};

export const feedBadgeActionAsync = createAsyncAction(
  FEED_BADGE_REQUEST,
  FEED_BADGE_SUCCESS,
  FEED_BADGE_FAIL
)<any, any, AxiosError>();
export const feedBadgeActionTypes = {
  FEED_BADGE_REQUEST,
  FEED_BADGE_SUCCESS,
  FEED_BADGE_FAIL,
};
