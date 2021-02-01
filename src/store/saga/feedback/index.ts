import {
  topRankerActionTypes,
  topRankerDetailActionTypes,
  feedRecentActionTypes,
  feedRecivedActionTypes,
  feedSentActionTypes,
  feedOneUpdateActionTypes,
  feedOneDeleteActionTypes,
  badgeListActionTypes,
  feedbackSendActionTypes,
  feedbackRequestActionTypes,
  feedbackStatisticsActionTypes,
  feedbackBadgeActionTypes,
  feedBadgeActionTypes,
} from "store/actions";
import { takeEvery } from "redux-saga/effects";
import {
  feedRecentSaga,
  feedReceivedSaga,
  feedSentSaga,
  feedBadgeSaga,
} from "./feedSaga";
import { feedOneDeleteSaga, feedOneUpdateSaga } from "./feedOneSaga";
import badgeListSaga from "./badgeListSaga";
import { feedbackSendSaga, feedbackRequestSaga } from "./feedbackSaga";
import feedbackStatisticsSaga from "./feedbackStatisticsSaga";
import feedbackBadgeSaga from "./feedbackBadgeSaga";
import { topRankerSaga, topRankerDetailSaga } from "./topRankerSaga";

export default function* watchFeedback() {
  yield takeEvery(topRankerActionTypes.TOP_RANKER_REQUEST, topRankerSaga);
  yield takeEvery(
    topRankerDetailActionTypes.TOP_RANKER_DETAIL_REQUEST,
    ({ payload }: { type: string; payload: ObjectType }) =>
      topRankerDetailSaga(payload?.orgGroupId, payload?.year, payload?.quarter)
  );
  yield takeEvery(badgeListActionTypes.BADGE_LIST_REQUEST, badgeListSaga);
  yield takeEvery(
    feedRecentActionTypes.FEED_RECENT_REQUEST,
    ({ payload }: { type: string; payload?: number }) => feedRecentSaga(payload)
  );
  yield takeEvery(
    feedRecivedActionTypes.FEED_RECEIVED_REQUEST,
    ({ payload }: { type: string; payload?: number }) =>
      feedReceivedSaga(payload)
  );
  yield takeEvery(
    feedSentActionTypes.FEED_SENT_REQUEST,
    ({ payload }: { type: string; payload?: number }) => feedSentSaga(payload)
  );
  yield takeEvery(
    feedBadgeActionTypes.FEED_BADGE_REQUEST,
    ({ payload }: { type: string; payload: ObjectType }) =>
      feedBadgeSaga(
        payload?.year,
        payload?.quarter,
        payload?.badgeId,
        payload?.page
      )
  );
  yield takeEvery(
    feedbackSendActionTypes.FEEDBACK_SEND_REQUEST,
    ({ payload }: { type: string; payload: FeedbackSendType }) =>
      feedbackSendSaga(
        payload.type,
        payload.targetUser,
        payload.selectBadge,
        payload.contents,
        payload.file,
        payload.id
      )
  );
  yield takeEvery(
    feedbackRequestActionTypes.FEEDBACK_REQUEST_REQUEST,
    ({ payload }: { type: string; payload: FeedbackRequestType }) =>
      feedbackRequestSaga(
        payload.targetUsers,
        payload.contents,
        payload.file,
        payload.id
      )
  );
  yield takeEvery(
    feedOneUpdateActionTypes.FEED_ONE_UPATE_REQUEST,
    ({ payload }: { type: string; payload: number }) =>
      feedOneUpdateSaga(payload)
  );
  yield takeEvery(
    feedOneDeleteActionTypes.FEED_ONE_DELETE_REQUEST,
    ({ payload }: { type: string; payload: number }) =>
      feedOneDeleteSaga(payload)
  );
  yield takeEvery(
    feedbackStatisticsActionTypes.FEEDBACK_STATISTICS_REQUEST,
    ({ payload }: { type: string; payload?: ObjectType }) =>
      feedbackStatisticsSaga(payload?.year, payload?.quarter)
  );
  yield takeEvery(
    feedbackBadgeActionTypes.FEEDBACK_BADGE_REQUEST,
    ({ payload }: { type: string; payload?: ObjectType }) =>
      feedbackBadgeSaga(payload?.year, payload?.quarter)
  );
}
