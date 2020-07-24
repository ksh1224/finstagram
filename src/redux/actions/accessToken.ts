import { createAsyncAction } from "typesafe-actions";

const ACCESS_TOKEN_REQUEST = "ACCESS_TOKEN_REQUEST";
const ACCESS_TOKEN_SUCCESS = "ACCESS_TOKEN_SUCCESS";
const ACCESS_TOKEN_FAIL = "ACCESS_TOKEN_FAIL";

export const accessTokenActionAsync = createAsyncAction(
  ACCESS_TOKEN_REQUEST,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_FAIL
)<boolean, ObjectType, Error>();

export const accessTokenActionTypes = {
  ACCESS_TOKEN_REQUEST,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_FAIL,
};
