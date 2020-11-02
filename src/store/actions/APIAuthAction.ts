/* eslint-disable import/prefer-default-export */
import { createAsyncAction } from "typesafe-actions";

const API_LOGIN_REQUEST = "API_LOGIN_REQUEST";
const API_LOGIN_SUCCESS = "API_LOGIN_SUCCESS";
const API_LOGIN_ERROR = "API_LOGIN_ERROR";
// const LOGOUT_REQUEST = "LOGOUT_REQUEST";
// const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
// const LOGOUT_ERROR = "LOGOUT_ERROR";

export const APILogInActionAsync = createAsyncAction(
  API_LOGIN_REQUEST,
  API_LOGIN_SUCCESS,
  API_LOGIN_ERROR
)<void, any, Error>();

// export const APILogOutActionAsync = createAsyncAction(
//   LOGOUT_REQUEST,
//   LOGOUT_SUCCESS,
//   LOGOUT_ERROR
// )<void, any, Error>();

export const APILogInActionTypes = {
  API_LOGIN_REQUEST,
  API_LOGIN_SUCCESS,
  API_LOGIN_ERROR,
};
// export const APILogOutActionTypes = {
//   LOGOUT_REQUEST,
//   LOGOUT_SUCCESS,
//   LOGOUT_ERROR,
// };
