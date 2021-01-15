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
    const { data: prevData = [] } = yield select(
      (state: RootState) => state.feedRecent
    );
    if (page) {
      const data = yield call(
        axios,
        `/feedbacks/main/recent?user_id=${user?.id}${`&page=${page}`}`,
        "GET"
      );
      yield put(
        feedRecentActionAsync.success({
          ...data,
          data: [...prevData, ...data?.data],
        })
      );
    } else {
      const data = yield call(
        axios,
        `/feedbacks/main/recent?user_id=${user?.id}`,
        "GET"
      );
      yield put(feedRecentActionAsync.success(data));
    }
  } catch (error) {
    yield put(feedRecentActionAsync.failure(error));
  }
}

export function* feedReceivedSaga(
  page?: number
): Generator<any, void, ObjectType> {
  try {
    const { user } = yield select((state: RootState) => state.APIAuth);
    const { data: prevData = [] } = yield select(
      (state: RootState) => state.feedReceived
    );
    if (page) {
      const data = yield call(
        axios,
        `/feedbacks/received/list?user_id=${user?.id}${`&page=${page}`}`,
        "GET"
      );
      yield put(
        feedRecivedActionAsync.success({
          ...data,
          data: [...prevData, ...data?.data],
        })
      );
    } else {
      const data = yield call(
        axios,
        `/feedbacks/received/list?user_id=${user?.id}`,
        "GET"
      );
      yield put(feedRecivedActionAsync.success(data));
    }
  } catch (error) {
    yield put(feedRecivedActionAsync.failure(error));
  }
}

export function* feedSentSaga(page?: number): Generator<any, void, ObjectType> {
  try {
    const { user } = yield select((state: RootState) => state.APIAuth);
    const { data: prevData = [] } = yield select(
      (state: RootState) => state.feedSent
    );
    if (page) {
      const data = yield call(
        axios,
        `/feedbacks/sent/list?user_id=${user?.id}${`&page=${page}`}`,
        "GET"
      );
      yield put(
        feedSentActionAsync.success({
          ...data,
          data: [...prevData, ...data?.data],
        })
      );
    } else {
      const data = yield call(
        axios,
        `/feedbacks/sent/list?user_id=${user?.id}`,
        "GET"
      );
      yield put(feedSentActionAsync.success(data));
    }
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
      `/feedbacks/recent/${user.id}?year=${year}&quarter=${quarter}${
        badgeId ? `&badge_id=${badgeId}` : ""
      }`,
      "GET"
    );
    yield put(feedBadgeActionAsync.success(data));
  } catch (error) {
    yield put(feedBadgeActionAsync.failure(error));
  }
}
