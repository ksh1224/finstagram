import { call, put, select } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { reviewTeamListActionAsync } from "store/actions";

export default function* reviewTeamListSaga(
  metaId?: number
): Generator<any, void, ObjectType> {
  try {
    const { data } = yield call(
      axios,
      `/review/self/team/list?metaId=${metaId}`,
      "GET"
    );
    
    yield put(reviewTeamListActionAsync.success(data));
  } catch (error) {
    yield put(reviewTeamListActionAsync.failure(error));
  }
}
