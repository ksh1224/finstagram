import { AuthenticationActions } from "react-aad-msal";
import { Action } from "redux";
import {
  call,
  spawn,
  put,
  takeEvery,
  take,
  select,
  all,
  cancel,
  takeLatest,
} from "redux-saga/effects";

import {
  feedbackMainActionTypes,
  APILogInActionTypes,
  searchUserActionTypes,
  feedRecentActionTypes,
  feedRecivedActionTypes,
  feedSentActionTypes,
  commentActionTypes,
  commentNewActionTypes,
  commentDeleteActionTypes,
  commentUpdateActionTypes,
  commentLikeActionTypes,
  badgeListActionTypes,
  feedbackSendActionTypes,
  feedbackRequestActionTypes,
} from "store/actions";
import APIAuthSaga from "./APIAuthSaga";
import AuthSaga from "./AuthSaga";
import feedbackMainSaga from "./feedbackMainSaga";
import feedRecentSaga from "./feedRecentSaga";
import feedReceivedSaga from "./feedReceivedSaga";
import feedSentSaga from "./feedSentSaga";
import commentSaga from "./commentSaga";
import searchUserSaga from "./searchUserSaga";
import badgeListSaga from "./badgeListSaga";
import { feedbackSendSaga, feedbackRequestSaga } from "./feedbackSaga";

function* watchClasses() {
  // type의 action이 실행되면 fetchBoardsSaga도 항상(Every) 실행한다
  yield takeEvery(AuthenticationActions.LoginSuccess, AuthSaga);
  yield takeEvery(APILogInActionTypes.API_LOGIN_REQUEST, APIAuthSaga);
  yield takeEvery(
    feedbackMainActionTypes.FEEDBACK_MAIN_REQUEST,
    feedbackMainSaga
  );
  yield takeEvery(searchUserActionTypes.SEARCH_USER_REQUEST, searchUserSaga);
  yield takeEvery(badgeListActionTypes.BADGE_LIST_REQUEST, badgeListSaga);
  yield takeEvery(
    feedRecentActionTypes.FEED_RECENT_REQUEST,
    ({ payload }: { type: typeof feedRecentActionTypes; payload?: number }) =>
      feedRecentSaga(payload)
  );
  yield takeEvery(
    feedRecivedActionTypes.FEED_RECEIVED_REQUEST,
    ({
      payload,
    }: {
      type: typeof feedRecivedActionTypes;
      payload: ObjectType;
    }) => feedReceivedSaga(payload?.year, payload?.querter)
  );
  yield takeEvery(
    feedSentActionTypes.FEED_SENT_REQUEST,
    ({ payload }: { type: typeof feedSentActionTypes; payload?: ObjectType }) =>
      feedSentSaga(payload?.year, payload?.querter)
  );
  yield takeEvery(
    feedbackSendActionTypes.FEEDBACK_SEND_REQUEST,
    ({
      payload,
    }: {
      type: typeof feedSentActionTypes;
      payload: FeedbackSendType;
    }) =>
      feedbackSendSaga(
        payload.type,
        payload.targetUser,
        payload.selectBadge,
        payload.contents,
        payload.file
      )
  );
  yield takeEvery(
    feedbackRequestActionTypes.FEEDBACK_REQUEST_REQUEST,
    ({
      payload,
    }: {
      type: typeof feedSentActionTypes;
      payload: FeedbackRequestType;
    }) =>
      feedbackRequestSaga(payload.targetUsers, payload.contents, payload.file)
  );
  yield takeEvery(
    commentActionTypes.COMMENT_REQUEST,
    ({ payload }: { type: typeof feedSentActionTypes; payload: number }) =>
      commentSaga(payload)
  );
}

export default function* root(): Generator {
  yield spawn(watchClasses);
}
