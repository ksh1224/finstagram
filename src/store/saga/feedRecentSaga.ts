import { call, put, select, take } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { feedRecentActionAsync } from "store/actions";

export default function* feedRecentSaga(
  page?: number
): Generator<any, void, ObjectType> {
  try {
    const { user } = yield select((state) => state.APIAuth);
    const data = yield call(
      axios,
      `/feedbacks/main/recent?user_id=${user?.id}${
        page ? `&page=${page}` : ""
      }`,
      "GET"
    );
    yield put(feedRecentActionAsync.success(data));
  } catch (error) {
    yield put(feedRecentActionAsync.failure(error));
  }
}
