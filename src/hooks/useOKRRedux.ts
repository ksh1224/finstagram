import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  teamOKRActionAsync,
  myOKRActionAsync,
  userOKRActionAsync,
} from "../store/actions";

export function useMyOKR() {
  const { data, isFetching } = useSelector((state: RootState) => state.myOKR);

  const dispatch = useDispatch();
  const requset = useCallback(
    (year?, quarter?) => dispatch(myOKRActionAsync.request({ year, quarter })),
    [dispatch]
  );
  return {
    data,
    isFetching,
    requset,
  };
}
export function useUserOKR() {
  const { data, isFetching, error } = useSelector(
    (state: RootState) => state.userOKR
  );

  const dispatch = useDispatch();
  const requset = useCallback(
    (year?, quarter?, userId?) =>
      dispatch(userOKRActionAsync.request({ year, quarter, userId })),
    [dispatch]
  );
  const cancel = useCallback(() => dispatch(userOKRActionAsync.cancel()), [
    dispatch,
  ]);
  return {
    data,
    isFetching,
    requset,
    cancel,
    error,
  };
}
export function useTeamOKR() {
  const { data, isFetching } = useSelector((state: RootState) => state.teamOKR);

  const dispatch = useDispatch();
  const requset = useCallback(
    (year?, quarter?, organizationId?) =>
      dispatch(teamOKRActionAsync.request({ year, quarter, organizationId })),
    [dispatch]
  );
  return {
    data,
    isFetching,
    requset,
  };
}
