import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  feedbackMainActionAsync,
  feedRecentActionAsync,
  myFeedbackActionAsync,
  searchUserActionAsync,
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
  const { isFetching, data } = useSelector(
    (state: RootState) => state.feedRecent
  );
  const dispatch = useDispatch();

  const request = useCallback(
    (page) => dispatch(feedRecentActionAsync.request(page)),
    [dispatch]
  );
  return {
    request,
    data,
    isFetching,
  };
}

export function useMyFeedback() {
  const { isFetching, data } = useSelector(
    (state: RootState) => state.myFeedback
  );
  const dispatch = useDispatch();

  const request = useCallback(() => dispatch(myFeedbackActionAsync.request()), [
    dispatch,
  ]);

  return {
    request,
    data,
    isFetching,
  };
}
