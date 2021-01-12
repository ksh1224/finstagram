import { ModalNameType } from "store/actions";
import { createReducer } from "typesafe-actions";

type SelcetBadge = { badgeData?: any | undefined };

const initialState: SelcetBadge = {
  badgeData: undefined,
};

export default createReducer<SelcetBadge, Actions>(initialState, {
  SELECT_BADGE: (state, { payload: badgeData }) => ({
    badgeData,
  }),
  CANCEL_SELECT_BADGE: () => ({ badgeData: undefined }),
});
