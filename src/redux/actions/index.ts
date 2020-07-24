import { createAsyncAction } from "typesafe-actions";
import { userActionTypes, userActions } from "./user";
import { accessTokenActionTypes, accessTokenActionAsync } from "./accessToken";

export const actions = {
  ...userActions,
  accessTokenActionAsync,
};

export const actionTypes = {
  ...userActionTypes,
  ...accessTokenActionTypes,
};
