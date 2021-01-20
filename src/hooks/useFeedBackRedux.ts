import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  topRankerActionAsync,
  feedRecentActionAsync,
  feedRecivedActionAsync,
  feedSentActionAsync,
  feedOneUpdateActionAsync,
  feedbackRequestActionAsync,
  feedbackSendActionAsync,
  feedbackBadgeActionAsync,
  feedbackStatisticsActionAsync,
  cancelSelectBadgeAction,
  selectBadgeAction,
  feedBadgeActionAsync,
  topRankerDetailActionAsync,
  feedOneDeleteActionAsync,
} from "../store/actions";

export function useTopRanker() {
  const { isFetching, data } = useSelector(
    (state: RootState) => state.topRanker
  );
  const dispatch = useDispatch();

  const request = useCallback(() => dispatch(topRankerActionAsync.request()), [
    dispatch,
  ]);
  return {
    request,
    data,
    isFetching,
  };
}

export function useTopRankerDetail() {
  const {
    isFetching,
    data,
    extraData,
    availableDates,
    availableOptions,
  } = useSelector((state: RootState) => state.topRankerDetail);
  const dispatch = useDispatch();

  const request = useCallback(
    (orgGroupId, year?, quarter?) =>
      dispatch(
        topRankerDetailActionAsync.request({ orgGroupId, year, quarter })
      ),
    [dispatch]
  );
  return {
    request,
    data,
    extraData,
    availableDates,
    availableOptions,
    isFetching,
  };
}

export function useFeedRecent() {
  const { isFetching, data, currentPage, totalPages } = useSelector(
    (state: RootState) => state.feedRecent
  );
  const dispatch = useDispatch();

  const request = useCallback(
    (page?) => dispatch(feedRecentActionAsync.request(page)),
    [dispatch]
  );
  return {
    request,
    data,
    currentPage,
    totalPages,
    isFetching,
  };
}

export function useFeedReceived() {
  const { isFetching, data, currentPage, totalPages } = useSelector(
    (state: RootState) => state.feedReceived
  );
  const dispatch = useDispatch();

  const request = useCallback(
    (page?) => dispatch(feedRecivedActionAsync.request(page)),
    [dispatch]
  );
  return {
    request,
    data,
    currentPage,
    totalPages,
    isFetching,
  };
}

export function useFeedSent() {
  const { isFetching, data, currentPage, totalPages } = useSelector(
    (state: RootState) => state.feedSent
  );
  const dispatch = useDispatch();

  const request = useCallback(
    (page?) => dispatch(feedSentActionAsync.request(page)),
    [dispatch]
  );
  return {
    request,
    data,
    currentPage,
    totalPages,
    isFetching,
  };
}

export function useFeedBadge() {
  const { isFetching, data } = useSelector(
    (state: RootState) => state.feedBadge
  );
  const dispatch = useDispatch();

  const request = useCallback(
    (year, quarter, badgeId?) =>
      dispatch(feedBadgeActionAsync.request({ year, quarter, badgeId })),
    [dispatch]
  );
  return {
    request,
    data,
    isFetching,
  };
}

export function useFeedback() {
  const { isFetching } = useSelector((state: RootState) => state.feedback);
  const dispatch = useDispatch();

  const feedbackSend = useCallback(
    (type, targetUser, selectBadge?, contents?, file?, id?) =>
      dispatch(
        feedbackSendActionAsync.request({
          type,
          targetUser,
          selectBadge,
          contents,
          file,
          id,
        })
      ),
    [dispatch]
  );

  const feedbackRequest = useCallback(
    (targetUsers, contents?, file?, id?) =>
      dispatch(
        feedbackRequestActionAsync.request({
          targetUsers,
          contents,
          file,
          id,
        })
      ),
    [dispatch]
  );

  return {
    isFetching,
    feedbackSend,
    feedbackRequest,
  };
}

export function useFeedOne() {
  const dispatch = useDispatch();

  const update = useCallback(
    (feedId?) => dispatch(feedOneUpdateActionAsync.request(feedId)),
    [dispatch]
  );

  const deleteFeed = useCallback(
    (feedId?) => dispatch(feedOneDeleteActionAsync.request(feedId)),
    [dispatch]
  );

  return {
    update,
    deleteFeed,
  };
}

export function useMyFeedback() {
  const {
    data: feedbackStatisticsData,
    isFetching: feedbackStatisticsFetching,
  } = useSelector((state: RootState) => state.feedbackStatistics);
  const {
    data: feedbackBadgeData,
    isFetching: feedbackBadgeFetching,
  } = useSelector((state: RootState) => state.feedbackBadge);
  const dispatch = useDispatch();
  const feedbackStatisticsRequest = useCallback(
    (year?, quarter?) =>
      dispatch(feedbackStatisticsActionAsync.request({ year, quarter })),
    [dispatch]
  );
  const feedbackBadgeRequest = useCallback(
    (year?, quarter?) =>
      dispatch(feedbackBadgeActionAsync.request({ year, quarter })),
    [dispatch]
  );
  return {
    feedbackStatisticsData,
    feedbackStatisticsFetching,
    feedbackBadgeData,
    feedbackBadgeFetching,
    feedbackStatisticsRequest,
    feedbackBadgeRequest,
  };
}

export function useSelectBadge() {
  const { badgeData: selectBadgeData } = useSelector(
    (state: RootState) => state.selectBadge
  );
  const dispatch = useDispatch();
  const selectBadge = useCallback(
    (badgeData: any) => dispatch(selectBadgeAction(badgeData)),
    [dispatch]
  );
  const cancelBadge = useCallback(() => dispatch(cancelSelectBadgeAction()), [
    dispatch,
  ]);
  return {
    selectBadge,
    cancelBadge,
    selectBadgeData,
  };
}
