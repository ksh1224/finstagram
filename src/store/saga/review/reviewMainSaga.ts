import { call, put, select } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { reviewMainActionAsync } from "store/actions";

export default function* reviewMainSaga(
  metaId?: number
): Generator<any, void, ObjectType> {
  try {
    const { user } = yield select((state: RootState) => state.APIAuth);
    const data = yield call(
      axios,
      `/review/main/info?user_id=${user.id}${
        metaId ? `&metaId=${metaId}` : ""
      }`,
      "GET"
    );
    yield put(reviewMainActionAsync.success(data));
  } catch (error) {
    yield put(reviewMainActionAsync.failure(error));
  }
}
