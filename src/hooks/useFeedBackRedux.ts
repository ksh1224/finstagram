import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  topRankerActionAsync,
  feedRecentActionAsync,
  feedRecivedActionAsync,
  feedSentActionAsync,
  commentActionAsync,
  commentDeleteActionAsync,
  commentLikeActionAsync,
  commentNewActionAsync,
  commentUpdateActionAsync,
  searchUserActionAsync,
  badgeListActionAsync,
  feedbackRequestActionAsync,
  feedbackSendActionAsync,
  showModalAction,
  closeModalAction,
  ModalNameType,
  feedbackBadgeActionTypes,
  feedbackBadgeActionAsync,
  feedbackStatisticsActionAsync,
  cancelSelectBadgeAction,
  selectBadgeAction,
  feedBadgeActionTypes,
  feedBadgeActionAsync,
  topRankerDetailActionAsync,
} from "../store/actions";

export function useAuth() {
  const Auth = useSelector((state: RootState) => state.Auth);

  const APIAuth = useSelector((state: RootState) => state.APIAuth);

  return {
    Auth,
    APIAuth,
  };
}

export function useSearchUser() {
  const { isFetching, data } = useSelector(
    (state: RootState) => state.searchUser
  );
  const dispatch = useDispatch();

  const request = useCallback(() => dispatch(searchUserActionAsync.request()), [
    dispatch,
  ]);

  return {
    request,
    data,
    isFetching,
  };
}

export function useBadgeList() {
  const { isFetching, data } = useSelector(
    (state: RootState) => state.badgeList
  );
  const dispatch = useDispatch();

  const request = useCallback(() => dispatch(badgeListActionAsync.request()), [
    dispatch,
  ]);

  return {
    request,
    data,
    isFetching,
  };
}

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
  const { isFetching, data } = useSelector(
    (state: RootState) => state.feedReceived
  );
  const dispatch = useDispatch();

  const request = useCallback(
    (year?, quarter?) =>
      dispatch(feedRecivedActionAsync.request({ year, quarter })),
    [dispatch]
  );
  return {
    request,
    data,
    isFetching,
  };
}

export function useFeedSent() {
  const { isFetching, data } = useSelector(
    (state: RootState) => state.feedSent
  );
  const dispatch = useDispatch();

  const request = useCallback(
    (year?, quarter?) =>
      dispatch(feedSentActionAsync.request({ year, quarter })),
    [dispatch]
  );
  return {
    request,
    data,
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
    (type, targetUser, selectBadge?, contents?, file?) =>
      dispatch(
        feedbackSendActionAsync.request({
          type,
          targetUser,
          selectBadge,
          contents,
          file,
        })
      ),
    [dispatch]
  );

  const feedbackRequest = useCallback(
    (targetUsers, contents?, file?) =>
      dispatch(
        feedbackRequestActionAsync.request({
          targetUsers,
          contents,
          file,
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

export function useComment() {
  const { comments } = useSelector((state: RootState) => state.comment);

  const dispatch = useDispatch();

  // commentActionAsync,
  // commentDeleteActionAsync,
  // commentLikeActionAsync,
  // commentNewActionAsync,
  // commentUpdateActionAsync,

  const commentRequest = useCallback(
    (feedId?) => dispatch(commentActionAsync.request(feedId)),
    [dispatch]
  );
  return {
    comments,
    commentRequest,
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
  const feedbackStatisticsRequset = useCallback(
    (year?, quarter?) =>
      dispatch(feedbackStatisticsActionAsync.request({ year, quarter })),
    [dispatch]
  );
  const feedbackBadgeRequset = useCallback(
    (year?, quarter?) =>
      dispatch(feedbackBadgeActionAsync.request({ year, quarter })),
    [dispatch]
  );
  return {
    feedbackStatisticsData,
    feedbackStatisticsFetching,
    feedbackBadgeData,
    feedbackBadgeFetching,
    feedbackStatisticsRequset,
    feedbackBadgeRequset,
  };
}

export function useModal() {
  const modals = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const showModal = useCallback(
    (name: ModalNameType, param?: any) =>
      dispatch(showModalAction(name, param)),
    [dispatch]
  );
  const closeModal = useCallback(
    (name: ModalNameType) => dispatch(closeModalAction(name)),
    [dispatch]
  );
  return {
    showModal,
    closeModal,
    modals,
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
