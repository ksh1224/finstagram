import { logInActionTypes, logInActionAsync } from "./logInAction";
import { logOutActionTypes, logOutActionAsync } from "./logOutAction";
import {
  accessTokenActionTypes,
  accessTokenActionAsync,
} from "./accessTokenAction";

export const actions = {
  logInActionAsync,
  accessTokenActionAsync,
  logOutActionAsync,
};

export const actionTypes = {
  ...accessTokenActionTypes,
  ...logInActionTypes,
  ...logOutActionTypes,
};
