import { AxiosError } from "axios";
import { createAction, createAsyncAction } from "typesafe-actions";

const SEARCH_USER_REQUEST = "SEARCH_USER_REQUEST";
const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS";
const SEARCH_USER_FAIL = "SEARCH_USER_FAIL";

const BADGE_LIST_REQUEST = "BADGE_LIST_REQUEST";
const BADGE_LIST_SUCCESS = "BADGE_LIST_SUCCESS";
const BADGE_LIST_FAIL = "BADGE_LIST_FAIL";

const SELECT_BADGE = "SELECT_BADGE";
const CANCEL_SELECT_BADGE = "CANCEL_SELECT_BADGE";

export const searchUserActionAsync = createAsyncAction(
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL
)<void, any, AxiosError>();
export const searchUserActionTypes = {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL,
};

export const badgeListActionAsync = createAsyncAction(
  BADGE_LIST_REQUEST,
  BADGE_LIST_SUCCESS,
  BADGE_LIST_FAIL
)<void, any, AxiosError>();
export const badgeListActionTypes = {
  BADGE_LIST_REQUEST,
  BADGE_LIST_SUCCESS,
  BADGE_LIST_FAIL,
};

export const selectBadgeAction = createAction(
  SELECT_BADGE,
  (badgeData: any) => badgeData
)();
export const cancelSelectBadgeAction = createAction(CANCEL_SELECT_BADGE)();
