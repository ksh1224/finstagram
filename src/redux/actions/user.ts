import { createAsyncAction } from "typesafe-actions";

const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";

const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
const USER_LOGOUT_FAIL = "USER_LOGOUT_FAIL";

export const logInActionAsync = createAsyncAction(
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL
)<boolean, ObjectType, Error>();

export const logOutActionAsync = createAsyncAction(
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL
)<boolean, ObjectType, Error>();

export const userActionTypes = {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
};

export const userActions = {
  logInActionAsync,
  logOutActionAsync,
};
