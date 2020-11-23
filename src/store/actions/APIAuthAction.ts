/* eslint-disable import/prefer-default-export */
import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";

const API_LOGIN_REQUEST = "API_LOGIN_REQUEST";
const API_LOGIN_SUCCESS = "API_LOGIN_SUCCESS";
const API_LOGIN_FAIL = "API_LOGIN_FAIL";
// const LOGOUT_REQUEST = "LOGOUT_REQUEST";
// const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
// const LOGOUT_FAIL = "LOGOUT_FAIL";

export const APILogInActionAsync = createAsyncAction(
  API_LOGIN_REQUEST,
  API_LOGIN_SUCCESS,
  API_LOGIN_FAIL
)<void, any, AxiosError>();

// export const APILogOutActionAsync = createAsyncAction(
//   LOGOUT_REQUEST,
//   LOGOUT_SUCCESS,
//   LOGOUT_FAIL
// )<void, any, AxiosError>();

export const APILogInActionTypes = {
  API_LOGIN_REQUEST,
  API_LOGIN_SUCCESS,
  API_LOGIN_FAIL,
};
// export const APILogOutActionTypes = {
//   LOGOUT_REQUEST,
//   LOGOUT_SUCCESS,
//   LOGOUT_FAIL,
// };
