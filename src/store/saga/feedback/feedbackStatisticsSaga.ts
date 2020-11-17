import { call, put, select } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { feedbackStatisticsActionAsync } from "store/actions";

export default function* feedbackStatisticsSaga(
  year: number,
  quarter: number
): Generator<any, void, ObjectType> {
  try {
    const { user } = yield select((state: RootState) => state.APIAuth);
    const data = yield call(
      axios,
      `/feedbacks/statistics/${user.id}${
        year && quarter ? `?year=${year}&quarter=${quarter}` : ""
      }`,
      "GET"
    );
    yield put(feedbackStatisticsActionAsync.success(data));
  } catch (error) {
    yield put(feedbackStatisticsActionAsync.failure(error));
  }
}
