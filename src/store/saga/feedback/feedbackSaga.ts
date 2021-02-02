import { call, put, select, take } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import {
  feedRecentActionAsync,
  feedRecivedActionAsync,
  feedSentActionAsync,
  feedbackSendActionAsync,
  feedbackRequestActionAsync,
  topRankerActionAsync,
  showModalAction,
  feedbackStatisticsActionAsync,
} from "store/actions";

export function* feedbackSendSaga(
  type: "PRAISE" | "ADVICE",
  targetUser: any,
  badge?: any,
  contents?: string,
  file?: any,
  id?: number
): Generator<any, void, ObjectType> {
  try {
    const { user } = yield select((state: RootState) => state.APIAuth);
    const feedbackStatistics = yield select(
      (state: RootState) => state.feedbackStatistics
    );
    const { year, quarter } = feedbackStatistics?.data || {};

    const formData = new FormData();
    if (type === "PRAISE") formData.append("feedbackBadge_id", badge.id);
    formData.append("type", type);
    if (id) {
      formData.append("id", `${id}`);
    } else {
      formData.append("sendUser_id", user.id);
      formData.append("receiveUser_id", targetUser.id);
    }
    if (contents) formData.append("contents", contents);
    formData.append("category", "CONTRIBUTION");
    formData.append("peerBonus_amount", "0");
    formData.append("peerBonus_description", "");
    if (type === "ADVICE" && file) {
      formData.append("file", file);
      formData.append("fileName", file.name);
    }
    const data = yield call(
      axios,
      id ? "/feedbacks/update/basic" : "/feedbacks/new/basic",
      "POST",
      formData
    );

    yield put(
      showModalAction("confirm", {
        text: id ? "피드백을 수정했습니다." : "피드백을 보냈습니다.",
      })
    );
    yield put(feedbackStatisticsActionAsync.request({ year, quarter }));
    yield put(feedRecentActionAsync.request(null));
    yield put(feedRecivedActionAsync.request(null));
    yield put(feedSentActionAsync.request(null));
    yield put(topRankerActionAsync.request());
    yield put(feedbackSendActionAsync.success(null));
  } catch (error) {
    yield put(feedbackSendActionAsync.failure(error));
  }
}

export function* feedbackRequestSaga(
  targetUsers: any[],
  contents: string,
  file: any,
  id?: number
): Generator<any, void, ObjectType> {
  try {
    const { user } = yield select((state: RootState) => state.APIAuth);
    const feedbackStatistics = yield select(
      (state: RootState) => state.feedbackStatistics
    );
    const { year, quarter } = feedbackStatistics?.data || {};

    const formData = new FormData();
    if (id) {
      formData.append("id", `${id}`);
    } else {
      formData.append("sendUser_id", user.id);
      targetUsers.forEach((userObj, i) => {
        formData.append(`receiveUser_id[${i}]`, userObj.id);
      });
    }

    formData.append("contents", contents);
    formData.append("category", "CONTRIBUTION");
    if (file) {
      formData.append("file", file);
      formData.append("fileName", file.name);
    }
    const { data } = yield call(
      axios,
      id ? "/feedbacks/update/request" : `/feedbacks/new/request`,
      "POST",
      formData
    );
    yield put(
      showModalAction("confirm", {
        text: id ? "피드백 요청을 수정했습니다." : "피드백을 요청했습니다.",
      })
    );
    yield put(feedbackStatisticsActionAsync.request({ year, quarter }));
    yield put(feedRecentActionAsync.request(null));
    yield put(feedRecivedActionAsync.request(null));
    yield put(feedSentActionAsync.request(null));
    yield put(topRankerActionAsync.request());
    yield put(feedbackRequestActionAsync.success(null));
  } catch (error) {
    console.log("feedbackRequestSaga", error);
  }
}
