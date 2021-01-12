import { call, put, select, take } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import {
  feedRecentActionAsync,
  feedSentActionAsync,
  feedRecivedActionAsync,
} from "store/actions";

export function* feedOneUpdateSaga(
  feedId: number
): Generator<any, void, ObjectType> {
  try {
    const { data: feedOneData } = yield call(
      axios,
      `/feedbacks/${feedId}`,
      "GET"
    );
    const feedRecentData = yield select((state: RootState) => state.feedRecent);
    const feedReceivedData = yield select(
      (state: RootState) => state.feedReceived
    );
    const feedSentData = yield select((state: RootState) => state.feedSent);

    const newFeedRecentData = {
      ...feedRecentData,
      data: [
        ...feedRecentData.data.map((feed: any) => {
          if (feed?.id === feedOneData.id) return feedOneData;
          return feed;
        }),
      ],
    };

    const newfeedReceivedData = {
      ...feedReceivedData,
      data: [
        ...feedReceivedData.data.map((feed: any) => {
          if (feed?.id === feed.id) return feedOneData;
          return feed;
        }),
      ],
    };

    const newfeedSentData = {
      ...feedSentData,
      data: [
        ...feedSentData.data.map((feed: any) => {
          if (feed?.id === feedOneData.id) return feedOneData;
          return feed;
        }),
      ],
    };
    yield put(feedRecentActionAsync.success(newFeedRecentData));
    yield put(feedRecivedActionAsync.success(newfeedReceivedData));
    yield put(feedSentActionAsync.success(newfeedSentData));
  } catch (error) {
    console.log("feedOneUpdateSaga", error);
  }
}

export function* feedOneDeleteSaga(
  feedId: number
): Generator<any, void, ObjectType> {
  try {
    const { data } = yield call(
      axios,
      `/feedbacks/delete?id=${feedId}`,
      "POST"
    );
    const feedRecentData = yield select((state: RootState) => state.feedRecent);
    const feedReceivedData = yield select(
      (state: RootState) => state.feedReceived
    );
    const feedSentData = yield select((state: RootState) => state.feedSent);
    const feedbackBadgeData = yield select(
      (state: RootState) => state.feedbackBadge
    );

    const newFeedRecentData = {
      ...feedRecentData,
      data: [...feedRecentData.data.filter((feed: any) => feed?.id !== feedId)],
    };
    const newfeedReceivedData = {
      ...feedReceivedData,
      data: [
        ...feedReceivedData.data.filter((feed: any) => feed?.id !== feedId),
      ],
    };
    const newfeedSentData = {
      ...feedSentData,
      data: [...feedSentData.data.filter((feed: any) => feed?.id !== feedId)],
    };
    yield put(feedRecentActionAsync.success(newFeedRecentData));
    yield put(feedRecivedActionAsync.success(newfeedReceivedData));
    yield put(feedSentActionAsync.success(newfeedSentData));
  } catch (error) {
    console.log("feedOneDeleteSaga", error);
  }
}
