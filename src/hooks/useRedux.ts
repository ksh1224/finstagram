import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  feedbackMainActionAsync,
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
  showModalAction,
  closeModalAction,
  feedbackRequestActionAsync,
  feedbackSendActionAsync,
  ModalNameType,
} from "../store/actions";
import { RootState } from "../store";

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

export function useFeedbackMain() {
  const { isFetching, data } = useSelector(
    (state: RootState) => state.feedbackMain
  );
  const dispatch = useDispatch();

  const request = useCallback(
    () => dispatch(feedbackMainActionAsync.request()),
    [dispatch]
  );
  return {
    request,
    data,
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
    (year?, querter?) =>
      dispatch(feedRecivedActionAsync.request({ year, querter })),
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
    (year?, querter?) =>
      dispatch(feedSentActionAsync.request({ year, querter })),
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
