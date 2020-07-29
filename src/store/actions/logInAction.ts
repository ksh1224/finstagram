import { createAsyncAction } from "typesafe-actions";

const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";

export const logInActionAsync = createAsyncAction(
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL
)<void, any, Error>();

export const logInActionTypes = {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
};
