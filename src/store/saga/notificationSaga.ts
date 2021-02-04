import { call, put, select } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { notificationActionAsync } from "store/actions";

export default function* notificationSaga(
  page?: number
): Generator<any, void, ObjectType> {
  try {
    if (page) {
      const { data: prevData = [] } = yield select(
        (state: RootState) => state.notification
      );
      const data = yield call(
        axios,
        `/noti${page ? `?page=${page}` : ""}`,
        "GET"
      );
      const { data: notiCount } = yield call(axios, `/noti/count`, "GET");
      yield put(
        notificationActionAsync.success({
          ...data,
          data: [...prevData, ...data.data],
          notiCount,
        })
      );
    } else {
      const data = yield call(axios, `/noti`, "GET");
      const { data: notiCount } = yield call(axios, `/noti/count`, "GET");
      yield put(notificationActionAsync.success({ ...data, notiCount }));
    }
  } catch (error) {
    yield put(notificationActionAsync.failure(error));
  }
}
