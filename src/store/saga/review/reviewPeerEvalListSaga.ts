import { call, put, select } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { reviewPeerEvalListActionAsync } from "store/actions";

export default function* reviewPeerEvalListSaga(
  metaId?: number
): Generator<any, void, ObjectType> {
  try {
    const { data } = yield call(
      axios,
      `/review/peer/reviewee/team/list?metaId=${metaId}`,
      "GET"
    );

    yield put(reviewPeerEvalListActionAsync.success(data));
  } catch (error) {
    yield put(reviewPeerEvalListActionAsync.failure(error));
  }
}
