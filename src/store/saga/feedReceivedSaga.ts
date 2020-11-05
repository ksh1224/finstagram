import { call, put, select, take } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { feedRecivedActionAsync } from "store/actions";

export default function* feedReceivedSaga(
  year?: number,
  querter?: number
): Generator<any, void, ObjectType> {
  try {
    const data = yield call(
      axios,
      `/feedbacks/received${year ? `?year=${year}` : ""}${
        querter ? `${year ? "&" : "?"}querter=${querter}` : ""
      }`,
      "GET"
    );
    yield put(feedRecivedActionAsync.success(data));
  } catch (error) {
    yield put(feedRecivedActionAsync.failure(error));
  }
}
