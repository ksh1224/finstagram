import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/actions";
import { RootState } from "../store";

export default function useAccessToken() {
  const isFetching = useSelector(
    (state: RootState) => state.accessToken.isFetching
  );
  const url = useSelector((state: RootState) => state.accessToken.data);
  const dispatch = useDispatch();

  const requestAccessToken = useCallback(
    () => dispatch(actions.accessTokenActionAsync.request()),
    [dispatch]
  );
  return {
    requestAccessToken,
    url,
    isFetching,
  };
}
