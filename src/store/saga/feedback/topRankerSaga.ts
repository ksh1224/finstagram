import { call, put } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import * as methods from "constant/HTTPMethods";
import {
  topRankerActionAsync,
  topRankerDetailActionAsync,
} from "store/actions";

export function* topRankerSaga(): Generator<any, void, ObjectType> {
  try {
    const { data } = yield call(axios, "/feedbacks/bestcomm/", methods.GET);
    yield put(topRankerActionAsync.success(data));
  } catch (error) {
    yield put(topRankerActionAsync.failure(error));
  }
}

export function* topRankerDetailSaga(
  orgGroupId: number,
  year?: number,
  quarter?: number
): Generator<any, void, ObjectType> {
  try {
    const data = yield call(
      axios,
      `/feedbacks/top?groupId=${orgGroupId}${
        year && quarter ? `&year=${year}&quarter=${quarter}` : ""
      }`,
      methods.GET
    );
    yield put(topRankerDetailActionAsync.success(data));
  } catch (error) {
    yield put(topRankerDetailActionAsync.failure(error));
  }
}
