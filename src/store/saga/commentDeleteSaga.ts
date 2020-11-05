import { call, put, select, take } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { commentDeleteActionAsync } from "store/actions";

export default function* commentDeleteSaga(
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
    yield put(commentDeleteActionAsync.success(data));
  } catch (error) {
    yield put(commentDeleteActionAsync.failure(error));
  }
}
