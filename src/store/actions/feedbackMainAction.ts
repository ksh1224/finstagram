import { createAsyncAction } from "typesafe-actions";

const FEEDBACK_MAIN_REQUEST = "FEEDBACK_MAIN_REQUEST";
const FEEDBACK_MAIN_SUCCESS = "FEEDBACK_MAIN_SUCCESS";
const FEEDBACK_MAIN_FAIL = "FEEDBACK_MAIN_FAIL";

export const feedbackMainActionAsync = createAsyncAction(
  FEEDBACK_MAIN_REQUEST,
  FEEDBACK_MAIN_SUCCESS,
  FEEDBACK_MAIN_FAIL
)<void, any, Error>();

export const feedbackMainActionTypes = {
  FEEDBACK_MAIN_REQUEST,
  FEEDBACK_MAIN_SUCCESS,
  FEEDBACK_MAIN_FAIL,
};
