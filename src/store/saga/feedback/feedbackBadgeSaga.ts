import { call, put, select } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { feedbackBadgeActionAsync } from "store/actions";

export default function* feedbackBadgeSaga(
  year: number,
  quarter: number
): Generator<any, void, ObjectType> {
  try {
    const { user } = yield select((state: RootState) => state.APIAuth);
    const { data } = yield call(
      axios,
      `/feedbacks/badge/count?user_id=${user.id}${
        year && quarter ? `&year=${year}&quarter=${quarter}` : ""
      }`,
      "GET"
    );
    yield put(feedbackBadgeActionAsync.success(data?.CONTRIBUTION));
  } catch (error) {
    yield put(feedbackBadgeActionAsync.failure(error));
  }
}
