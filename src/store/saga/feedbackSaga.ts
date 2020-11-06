import { call, put, select, take } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import {
  commentActionAsync,
  commentDeleteActionAsync,
  commentLikeActionAsync,
  commentNewActionAsync,
  feedRecentActionAsync,
  feedRecivedActionAsync,
  feedSentActionAsync,
  feedbackSendActionAsync,
} from "store/actions";

export function* feedbackSendSaga(
  type: "PRAISE" | "ADVICE",
  targetUser: any,
  badge?: any,
  contents?: string,
  file?: any
): Generator<any, void, ObjectType> {
  try {
    const { comments } = yield select((state) => state.comment);
    const { user } = yield select((state) => state.APIAuth);

    const formData = new FormData();
    if (type === "PRAISE") formData.append("feedbackBadge_id", badge.id);
    formData.append("type", type);
    formData.append("sendUser_id", user.id);
    formData.append("receiveUser_id", targetUser.id);
    if (contents) formData.append("contents", contents);
    formData.append("category", "CONTRIBUTION");
    formData.append("peerBonus_amount", "0");
    formData.append("peerBonus_description", "");
    if (type === "ADVICE" && file) {
      formData.append("file", file);
      formData.append("fileName", file.name);
    }
    const { data } = yield call(
      axios,
      `/feedbacks/new/basic`,
      "POST",
      formData
    );
    yield put(feedRecentActionAsync.request(null));
    yield put(feedRecivedActionAsync.request(null));
    yield put(feedSentActionAsync.request(null));
    yield put(feedbackSendActionAsync.success(null));
  } catch (error) {
    yield put(feedbackSendActionAsync.failure(error));
  }
}

export function* feedbackRequestSaga(
  targetUsers: any[],
  contents: string,
  file: any
): Generator<any, void, ObjectType> {
  try {
    const { comments } = yield select((state) => state.comment);
    const { user } = yield select((state) => state.APIAuth);

    const formData = new FormData();
    formData.append("sendUser_id", user.id);
    targetUsers.forEach((userObj, i) => {
      formData.append(`receiveUser_id[${i + 1}]`, userObj.id);
    });
    formData.append("contents", contents);
    formData.append("category", "CONTRIBUTION");
    if (file) {
      formData.append("file", file);
      formData.append("fileName", file.name);
    }
    const { data } = yield call(
      axios,
      `/feedbacks/new/request`,
      "POST",
      formData
    );
    feedSentActionAsync.request(null);
  } catch (error) {
    yield put(commentActionAsync.failure(error));
  }
}

export function* feedbackNewSaga(
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

export function* feedbackLikeSaga(
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

export function* feedbackDeleteSaga(
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
