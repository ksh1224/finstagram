import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";

const OKR_MAIN_REQUEST = "OKR_MAIN_REQUEST";
const OKR_MAIN_SUCCESS = "OKR_MAIN_SUCCESS";
const OKR_MAIN_FAIL = "OKR_MAIN_FAIL";

const TEAM_OKR_REQUEST = "TEAM_OKR_REQUEST";
const TEAM_OKR_SUCCESS = "TEAM_OKR_SUCCESS";
const TEAM_OKR_FAIL = "TEAM_OKR_FAIL";

const MY_OKR_REQUEST = "MY_OKR_REQUEST";
const MY_OKR_SUCCESS = "MY_OKR_SUCCESS";
const MY_OKR_FAIL = "MY_OKR_FAIL";

const USER_OKR_REQUEST = "USER_OKR_REQUEST";
const USER_OKR_SUCCESS = "USER_OKR_SUCCESS";
const USER_OKR_FAIL = "USER_OKR_FAIL";
const USER_OKR_CANCEL = "USER_OKR_CANCEL";

export const okrMainActionAsync = createAsyncAction(
  OKR_MAIN_REQUEST,
  OKR_MAIN_SUCCESS,
  OKR_MAIN_FAIL
)<FeedbackRequestType, any, AxiosError>();

export const okrMainActionTypes = {
  OKR_MAIN_REQUEST,
  OKR_MAIN_SUCCESS,
  OKR_MAIN_FAIL,
};

export const teamOKRActionAsync = createAsyncAction(
  TEAM_OKR_REQUEST,
  TEAM_OKR_SUCCESS,
  TEAM_OKR_FAIL
)<any, any, AxiosError>();

export const teamOKRActionTypes = {
  TEAM_OKR_REQUEST,
  TEAM_OKR_SUCCESS,
  TEAM_OKR_FAIL,
};

export const myOKRActionAsync = createAsyncAction(
  MY_OKR_REQUEST,
  MY_OKR_SUCCESS,
  MY_OKR_FAIL
)<any, any, AxiosError>();

export const myOKRActionTypes = {
  MY_OKR_REQUEST,
  MY_OKR_SUCCESS,
  MY_OKR_FAIL,
};

export const userOKRActionAsync = createAsyncAction(
  USER_OKR_REQUEST,
  USER_OKR_SUCCESS,
  USER_OKR_FAIL,
  USER_OKR_CANCEL
)<any, any, AxiosError, void>();

export const userOKRActionTypes = {
  USER_OKR_REQUEST,
  USER_OKR_SUCCESS,
  USER_OKR_FAIL,
  USER_OKR_CANCEL,
};
