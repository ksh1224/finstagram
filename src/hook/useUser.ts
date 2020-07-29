import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/actions";
import { RootState } from "../store";

export default function useUser() {
  const isFetching = useSelector((state: RootState) => state.user.isFetching);
  const userInfo = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();

  const requestLogIn = useCallback(
    () => dispatch(actions.logInActionAsync.request()),
    [dispatch]
  );
  return {
    requestLogIn,
    userInfo,
    isFetching,
  };
}
