import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";

const FEEDBACK_REQUEST_REQUEST = "FEEDBACK_REQUEST_REQUEST";
const FEEDBACK_REQUEST_SUCCESS = "FEEDBACK_REQUEST_SUCCESS";
const FEEDBACK_REQUEST_FAIL = "FEEDBACK_REQUEST_FAIL";

const FEEDBACK_SEND_REQUEST = "FEEDBACK_SEND_REQUEST";
const FEEDBACK_SEND_SUCCESS = "FEEDBACK_SEND_SUCCESS";
const FEEDBACK_SEND_FAIL = "FEEDBACK_SEND_FAIL";

export const feedbackSendActionAsync = createAsyncAction(
  FEEDBACK_SEND_REQUEST,
  FEEDBACK_SEND_SUCCESS,
  FEEDBACK_SEND_FAIL
)<FeedbackSendType, any, AxiosError>();

export const feedbackSendActionTypes = {
  FEEDBACK_SEND_REQUEST,
  FEEDBACK_SEND_SUCCESS,
  FEEDBACK_SEND_FAIL,
};

export const feedbackRequestActionAsync = createAsyncAction(
  FEEDBACK_REQUEST_REQUEST,
  FEEDBACK_REQUEST_SUCCESS,
  FEEDBACK_REQUEST_FAIL
)<FeedbackRequestType, any, AxiosError>();

export const feedbackRequestActionTypes = {
  FEEDBACK_REQUEST_REQUEST,
  FEEDBACK_REQUEST_SUCCESS,
  FEEDBACK_REQUEST_FAIL,
};
