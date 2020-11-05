import { call, put } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { badgeListActionAsync } from "store/actions";

export default function* badgeListSaga(): Generator<any, void, ObjectType> {
  try {
    const { data } = yield call(axios, "/badge/list/", "GET");
    yield put(badgeListActionAsync.success(data));
  } catch (error) {
    yield put(badgeListActionAsync.failure(error));
  }
}
