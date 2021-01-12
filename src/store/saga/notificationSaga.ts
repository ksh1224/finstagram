import { call, put } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { notificationActionAsync } from "store/actions";

export default function* notificationSaga(
  page?: number
): Generator<any, void, ObjectType> {
  try {
    const data = yield call(
      axios,
      `/noti${page ? `?page=${page}` : ""}`,
      "GET"
    );
    yield put(notificationActionAsync.success(data));
  } catch (error) {
    yield put(notificationActionAsync.failure(error));
  }
}
