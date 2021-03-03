import { call, put } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { badgeListActionAsync } from "store/actions";

type Props = { year: number | string; quarter: number | string };

export default function* badgeListSaga(
  props?: Props
): Generator<any, void, ObjectType> {
  try {
    const { year, quarter } = props || {};
    const { data } = yield call(
      axios,
      `/badge${year && quarter ? `?year=${year}&quarter=${quarter}` : ""}`,
      "GET"
    );
    yield put(badgeListActionAsync.success(data));
  } catch (error) {
    yield put(badgeListActionAsync.failure(error));
  }
}
