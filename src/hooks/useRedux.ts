import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchUserActionAsync,
  badgeListActionAsync,
  showModalAction,
  closeModalAction,
  ModalNameType,
  cancelSelectBadgeAction,
  selectBadgeAction,
} from "../store/actions";

export function useAuth() {
  const Auth = useSelector((state: RootState) => state.Auth);

  const { user, error } = useSelector((state: RootState) => state.APIAuth);

  return {
    Auth,
    user,
    error,
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
