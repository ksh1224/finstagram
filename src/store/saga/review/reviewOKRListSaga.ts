import { call, put, select } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { reviewOKRListActionAsync } from "store/actions";

export default function* reviewOKRListSaga(
  metaId?: number
): Generator<any, void, ObjectType> {
  try {
    const { data } = yield call(
      axios,
      `/review/okr/team/list?metaId=${metaId}`,
      "GET"
    );
    yield put(reviewOKRListActionAsync.success(data));
  } catch (error) {
    yield put(reviewOKRListActionAsync.failure(error));
  }
}
