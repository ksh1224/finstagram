/* eslint-disable import/prefer-default-export */
import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";

const API_LOGIN_REQUEST = "API_LOGIN_REQUEST";
const API_LOGIN_SUCCESS = "API_LOGIN_SUCCESS";
const API_LOGIN_FAIL = "API_LOGIN_FAIL";

export const APILogInActionAsync = createAsyncAction(
  API_LOGIN_REQUEST,
  API_LOGIN_SUCCESS,
  API_LOGIN_FAIL
)<any, any, AxiosError>();

export const APILogInActionTypes = {
  API_LOGIN_REQUEST,
  API_LOGIN_SUCCESS,
  API_LOGIN_FAIL,
};
