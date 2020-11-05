import { call, put, select, take } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { commentUpdateActionAsync } from "store/actions";

export default function* commentUpdateSaga(
  year?: number,
  querter?: number
): Generator<any, void, ObjectType> {
  try {
    const data = yield call(
      axios,
      `/feedbacks/sent${year ? `?year=${year}` : ""}${
        querter ? `${year ? "&" : "?"}querter=${querter}` : ""
      }`,
      "GET"
    );
    yield put(commentUpdateActionAsync.success(data));
  } catch (error) {
    yield put(commentUpdateActionAsync.failure(error));
  }
}
