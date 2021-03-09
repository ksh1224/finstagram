import { call, put } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { searchUserActionAsync, yearQuarterActionAsync } from "store/actions";

export function* yearQuarterSaga(): Generator<any, void, ObjectType> {
  try {
    const { data } = yield call(axios, "/yearQuarter", "GET");
    yield put(yearQuarterActionAsync.success(data));
  } catch (error) {
    yield put(yearQuarterActionAsync.failure(error));
  }
}

export function* searchUserSaga(): Generator<any, void, ObjectType> {
  try {
    const { data } = yield call(axios, "/user/searchData/", "GET");
    yield put(searchUserActionAsync.success(data));
  } catch (error) {
    yield put(searchUserActionAsync.failure(error));
  }
}
