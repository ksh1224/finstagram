import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";

const REVIEW_MAIN_REQUEST = "REVIEW_MAIN_REQUEST";
const REVIEW_MAIN_SUCCESS = "REVIEW_MAIN_SUCCESS";
const REVIEW_MAIN_FAIL = "REVIEW_MAIN_FAIL";

export const reviewMainActionAsync = createAsyncAction(
  REVIEW_MAIN_REQUEST,
  REVIEW_MAIN_SUCCESS,
  REVIEW_MAIN_FAIL
)<any, any, AxiosError>();

export const reviewMainActionTypes = {
  REVIEW_MAIN_REQUEST,
  REVIEW_MAIN_SUCCESS,
  REVIEW_MAIN_FAIL,
};
