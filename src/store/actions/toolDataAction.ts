import { createAsyncAction } from "typesafe-actions";

const SEARCH_USER_REQUEST = "SEARCH_USER_REQUEST";
const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS";
const SEARCH_USER_FAIL = "SEARCH_USER_FAIL";

const BADGE_LIST_REQUEST = "BADGE_LIST_REQUEST";
const BADGE_LIST_SUCCESS = "BADGE_LIST_SUCCESS";
const BADGE_LIST_FAIL = "BADGE_LIST_FAIL";

export const searchUserActionAsync = createAsyncAction(
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL
)<void, any, Error>();
export const searchUserActionTypes = {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL,
};

export const badgeListActionAsync = createAsyncAction(
  BADGE_LIST_REQUEST,
  BADGE_LIST_SUCCESS,
  BADGE_LIST_FAIL
)<void, any, Error>();
export const badgeListActionTypes = {
  BADGE_LIST_REQUEST,
  BADGE_LIST_SUCCESS,
  BADGE_LIST_FAIL,
};
