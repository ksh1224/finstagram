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
    const { data: notiCount } = yield call(axios, `/noti/count`, "GET");
    yield put(notificationActionAsync.success({ ...data, notiCount }));
  } catch (error) {
    yield put(notificationActionAsync.failure(error));
  }
}
