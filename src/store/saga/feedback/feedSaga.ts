import { call, put, select, take } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import {
  feedBadgeActionAsync,
  feedRecentActionAsync,
  feedRecivedActionAsync,
  feedSentActionAsync,
} from "store/actions";

export function* feedRecentSaga(
  page?: number
): Generator<any, void, ObjectType> {
  try {
    const { user } = yield select((state: RootState) => state.APIAuth);
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

export function* feedReceivedSaga(
  year?: number,
  quarter?: number
): Generator<any, void, ObjectType> {
  try {
    const data = yield call(
      axios,
      `/feedbacks/received${
        year && quarter ? `?year=${year}&quarter=${quarter}` : ""
      }`,
      "GET"
    );
    yield put(feedRecivedActionAsync.success(data));
  } catch (error) {
    yield put(feedRecivedActionAsync.failure(error));
  }
}

export function* feedSentSaga(
  year?: number,
  quarter?: number
): Generator<any, void, ObjectType> {
  try {
    const data = yield call(
      axios,
      `/feedbacks/sent${year ? `?year=${year}` : ""}${
        quarter ? `${year ? "&" : "?"}quarter=${quarter}` : ""
      }`,
      "GET"
    );
    yield put(feedSentActionAsync.success(data));
  } catch (error) {
    yield put(feedSentActionAsync.failure(error));
  }
}

export function* feedBadgeSaga(
  year: number,
  quarter: number,
  badgeId?: number
): Generator<any, void, ObjectType> {
  try {
    const { user } = yield select((state: RootState) => state.APIAuth);
    const data = yield call(
      axios,
      `/feedbacks/received/list?user_id=${
        user.id
      }&year=${year}&quarter=${quarter}${
        badgeId ? `&badge_id=${badgeId}` : ""
      }`,
      "GET"
    );
    yield put(feedBadgeActionAsync.success(data));
  } catch (error) {
    yield put(feedBadgeActionAsync.failure(error));
  }
}
