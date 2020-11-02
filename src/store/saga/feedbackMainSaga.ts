import { call, put } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import * as methods from "constant/HTTPMethods";
import { feedbackMainActionAsync } from "store/actions";

export default function* feedbackMainSaga(): Generator<any, void, ObjectType> {
  try {
    const { data } = yield call(axios, "/feedbacks/main/", methods.GET);

    yield put(feedbackMainActionAsync.success(data));
  } catch (error) {
    yield put(feedbackMainActionAsync.failure(error));
  }
}
