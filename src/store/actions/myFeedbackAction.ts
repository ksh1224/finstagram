import { createAsyncAction } from "typesafe-actions";

const MY_FEEDBACK_REQUEST = "MY_FEEDBACK_REQUEST";
const MY_FEEDBACK_SUCCESS = "MY_FEEDBACK_SUCCESS";
const MY_FEEDBACK_FAIL = "MY_FEEDBACK_FAIL";

export const myFeedbackActionAsync = createAsyncAction(
  MY_FEEDBACK_REQUEST,
  MY_FEEDBACK_SUCCESS,
  MY_FEEDBACK_FAIL
)<void, any, Error>();

export const myFeedbackActionTypes = {
  MY_FEEDBACK_REQUEST,
  MY_FEEDBACK_SUCCESS,
  MY_FEEDBACK_FAIL,
};
