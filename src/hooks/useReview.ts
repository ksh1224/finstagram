import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reviewMainActionAsync,
  reviewOKRListActionAsync,
  reviewPeerEvalListActionAsync,
  reviewPeerListActionAsync,
  reviewTeamListActionAsync,
} from "../store/actions";

export function useReviewMain() {
  const { isFetching, data, availableMetas } = useSelector(
    (state: RootState) => state.reviewMain
  );
  const dispatch = useDispatch();

  const request = useCallback(
    (metaId?: number) => dispatch(reviewMainActionAsync.request(metaId)),
    [dispatch]
  );

  return {
    request,
    data,
    availableMetas,
    isFetching,
  };
}

export function useReviewTeamList() {
  const { isFetching, data } = useSelector(
    (state: RootState) => state.reviewTeamList
  );
  const dispatch = useDispatch();

  const request = useCallback(
    (metaId?: number) => dispatch(reviewTeamListActionAsync.request(metaId)),
    [dispatch]
  );

  return {
    request,
    data,
    isFetching,
  };
}

export function useReviewPeerList() {
  const { isFetching, data } = useSelector(
    (state: RootState) => state.reviewPeerList
  );
  const dispatch = useDispatch();

  const request = useCallback(
    (metaId?: number) => dispatch(reviewPeerListActionAsync.request(metaId)),
    [dispatch]
  );

  return {
    request,
    data,
    isFetching,
  };
}

export function useReviewPeerEvalList() {
  const { isFetching, data } = useSelector(
    (state: RootState) => state.reviewPeerEvalList
  );
  const dispatch = useDispatch();

  const request = useCallback(
    (metaId?: number) =>
      dispatch(reviewPeerEvalListActionAsync.request(metaId)),
    [dispatch]
  );

  return {
    request,
    data,
    isFetching,
  };
}

export function useReviewOKRList() {
  const { isFetching, data } = useSelector(
    (state: RootState) => state.reviewOKRList
  );
  const dispatch = useDispatch();

  const request = useCallback(
    (metaId?: number) => dispatch(reviewOKRListActionAsync.request(metaId)),
    [dispatch]
  );

  return {
    request,
    data,
    isFetching,
  };
}
