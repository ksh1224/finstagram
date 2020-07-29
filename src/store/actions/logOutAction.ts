import { createAsyncAction } from "typesafe-actions";

const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
const USER_LOGOUT_FAIL = "USER_LOGOUT_FAIL";

export const logOutActionAsync = createAsyncAction(
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL
)<void, void, Error>();

export const logOutActionTypes = {
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
};
