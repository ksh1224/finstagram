import { call, put, select, take } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import {
  commentActionAsync,
  commentDeleteActionAsync,
  commentLikeActionAsync,
  commentNewActionAsync,
  commentUpdateActionAsync,
} from "store/actions";

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

export function* commentNewSaga(
  year?: number,
  querter?: number
): Generator<any, void, ObjectType> {
  try {
    const data = yield call(
      axios,
      `/feedbacks/sent${year ? `?year=${year}` : ""}${
        querter ? `${year ? "&" : "?"}querter=${querter}` : ""
      }`,
      "GET"
    );
    yield put(commentNewActionAsync.success(data));
  } catch (error) {
    yield put(commentNewActionAsync.failure(error));
  }
}

export function* commentLikeSaga(
  year?: number,
  querter?: number
): Generator<any, void, ObjectType> {
  try {
    const data = yield call(
      axios,
      `/feedbacks/sent${year ? `?year=${year}` : ""}${
        querter ? `${year ? "&" : "?"}querter=${querter}` : ""
      }`,
      "GET"
    );
    yield put(commentLikeActionAsync.success(data));
  } catch (error) {
    yield put(commentLikeActionAsync.failure(error));
  }
}

export function* commentUpdateSaga(
  year?: number,
  querter?: number
): Generator<any, void, ObjectType> {
  try {
    const data = yield call(
      axios,
      `/feedbacks/sent${year ? `?year=${year}` : ""}${
        querter ? `${year ? "&" : "?"}querter=${querter}` : ""
      }`,
      "GET"
    );
    yield put(commentUpdateActionAsync.success(data));
  } catch (error) {
    yield put(commentUpdateActionAsync.failure(error));
  }
}

export function* commentDeleteSaga(
  year?: number,
  querter?: number
): Generator<any, void, ObjectType> {
  try {
    const data = yield call(
      axios,
      `/feedbacks/sent${year ? `?year=${year}` : ""}${
        querter ? `${year ? "&" : "?"}querter=${querter}` : ""
      }`,
      "GET"
    );
    yield put(commentDeleteActionAsync.success(data));
  } catch (error) {
    yield put(commentDeleteActionAsync.failure(error));
  }
}
