import { call, put, select } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { myOKRActionAsync } from "store/actions";

export default function* myOKRSaga(
  year?: number,
  quarter?: number
): Generator<any, void, ObjectType> {
  try {
    const data = yield call(
      axios,
      `/okr/main/myOkr${
        year && quarter ? `?year=${year}&quarter=${quarter}` : ""
      }`,
      "GET"
    );
    yield put(myOKRActionAsync.success(data));
  } catch (error) {
    yield put(myOKRActionAsync.failure(error));
  }
}
