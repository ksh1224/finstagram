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
  const request = useCallback(
    (year?, quarter?) => dispatch(myOKRActionAsync.request({ year, quarter })),
    [dispatch]
  );
  return {
    data,
    isFetching,
    request,
  };
}
export function useUserOKR() {
  const { data, isFetching, error } = useSelector(
    (state: RootState) => state.userOKR
  );

  const dispatch = useDispatch();
  const request = useCallback(
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
    request,
    cancel,
    error,
  };
}
export function useTeamOKR() {
  const { data, isFetching } = useSelector((state: RootState) => state.teamOKR);

  const dispatch = useDispatch();
  const request = useCallback(
    (year?, quarter?, organizationId?, organizationName?) =>
      dispatch(
        teamOKRActionAsync.request({
          year,
          quarter,
          organizationId,
          organizationName,
        })
      ),
    [dispatch]
  );
  return {
    data,
    isFetching,
    request,
  };
}

export function useRefreshOKRData() {
  const { request: teamOKRRequest, data: teamOKRData = {} } = useTeamOKR();
  const { request: myOKRRequest, data: myOKRData = {} } = useMyOKR();
  const { request: userOKRRequest, data: userOKRData = {} } = useUserOKR();
  const refreshOKRData = () => {
    if (teamOKRData)
      teamOKRRequest(
        teamOKRData.year,
        teamOKRData.quarter,
        teamOKRData.organizationId
      );
    if (myOKRData) myOKRRequest(myOKRData.year, myOKRData.quarter);
    if (userOKRData.user?.id)
      userOKRRequest(
        userOKRData.year,
        userOKRData.quarter,
        userOKRData.user?.id
      );
  };

  return {
    refreshOKRData,
  };
}
