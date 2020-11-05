import { call, put, select, take } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { commentActionAsync, feedRecentActionAsync } from "store/actions";

export default function* commentSaga(
  feedId: number
): Generator<any, void, ObjectType> {
  try {
    const { comments } = yield select((state) => state.comment);
    const { user } = yield select((state) => state.APIAuth);
    const { data } = yield call(
      axios,
      `/feedbacks/comment/${feedId}?user_id=${user?.id}`,
      "GET"
    );
    if (!!data && data.length === 0) {
      yield put(commentActionAsync.success(comments));
    } else {
      let newComments = null;
      const findIndex = comments.findIndex(
        (comment: { feedId: number; data: any }) => comment?.feedId === feedId
      );
      if (findIndex === -1) newComments = [{ feedId, data }, ...comments];
      else
        newComments = [
          ...comments.slice(0, findIndex),
          { feedId, data },
          ...comments.slice(findIndex + 1),
        ];
      yield put(commentActionAsync.success(newComments));
    }
  } catch (error) {
    yield put(commentActionAsync.failure(error));
  }
}
