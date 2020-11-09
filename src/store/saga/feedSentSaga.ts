import { call, put, select, take } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { feedSentActionAsync } from "store/actions";

export default function* feedSentSaga(
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
    yield put(feedSentActionAsync.success(data));
  } catch (error) {
    yield put(feedSentActionAsync.failure(error));
  }
}
