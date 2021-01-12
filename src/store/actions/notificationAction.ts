import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";

const NOTIFICATION_REQUEST = "NOTIFICATION_REQUEST";
const NOTIFICATION_SUCCESS = "NOTIFICATION_SUCCESS";
const NOTIFICATION_FAIL = "NOTIFICATION_FAIL";

export const notificationActionAsync = createAsyncAction(
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAIL
)<any, any, AxiosError>();

export const notificationActionTypes = {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAIL,
};
