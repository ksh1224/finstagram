import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";

const COMMENT_REQUEST = "COMMENT_REQUEST";
const COMMENT_SUCCESS = "COMMENT_SUCCESS";
const COMMENT_FAIL = "COMMENT_FAIL";

const COMMENT_NEW_REQUEST = "COMMENT_NEW_REQUEST";
const COMMENT_NEW_SUCCESS = "COMMENT_NEW_SUCCESS";
const COMMENT_NEW_FAIL = "COMMENT_NEW_FAIL";

const COMMENT_LIKE_REQUEST = "COMMENT_LIKE_REQUEST";
const COMMENT_LIKE_SUCCESS = "COMMENT_LIKE_SUCCESS";
const COMMENT_LIKE_FAIL = "COMMENT_LIKE_FAIL";

const COMMENT_DELETE_REQUEST = "COMMENT_DELETE_REQUEST";
const COMMENT_DELETE_SUCCESS = "COMMENT_DELETE_SUCCESS";
const COMMENT_DELETE_FAIL = "COMMENT_DELETE_FAIL";

const COMMENT_UPDATE_REQUEST = "COMMENT_UPDATE_REQUEST";
const COMMENT_UPDATE_SUCCESS = "COMMENT_UPDATE_SUCCESS";
const COMMENT_UPDATE_FAIL = "COMMENT_UPDATE_FAIL";

export const commentActionAsync = createAsyncAction(
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAIL
)<any, any, AxiosError>();

export const commentActionTypes = {
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAIL,
};

export const commentNewActionAsync = createAsyncAction(
  COMMENT_NEW_REQUEST,
  COMMENT_NEW_SUCCESS,
  COMMENT_NEW_FAIL
)<any, any, AxiosError>();

export const commentNewActionTypes = {
  COMMENT_NEW_REQUEST,
  COMMENT_NEW_SUCCESS,
  COMMENT_NEW_FAIL,
};

export const commentLikeActionAsync = createAsyncAction(
  COMMENT_LIKE_REQUEST,
  COMMENT_LIKE_SUCCESS,
  COMMENT_LIKE_FAIL
)<any, any, AxiosError>();

export const commentLikeActionTypes = {
  COMMENT_LIKE_REQUEST,
  COMMENT_LIKE_SUCCESS,
  COMMENT_LIKE_FAIL,
};

export const commentDeleteActionAsync = createAsyncAction(
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAIL
)<any, any, AxiosError>();

export const commentDeleteActionTypes = {
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAIL,
};

export const commentUpdateActionAsync = createAsyncAction(
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAIL
)<any, any, AxiosError>();

export const commentUpdateActionTypes = {
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAIL,
};
