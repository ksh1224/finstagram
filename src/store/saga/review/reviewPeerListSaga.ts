import { call, put, select } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { reviewPeerListActionAsync } from "store/actions";

export default function* reviewPeerListSaga(
  metaId?: number
): Generator<any, void, ObjectType> {
  try {
    const { data } = yield call(
      axios,
      `/review/peer/listGiven?metaId=${metaId}`,
      "GET"
    );
    yield put(reviewPeerListActionAsync.success(data));
  } catch (error) {
    yield put(reviewPeerListActionAsync.failure(error));
  }
}
