import { ModalNameType } from "store/actions";
import { createReducer } from "typesafe-actions";

type SettingState = { activePush: boolean; activeHelp: boolean };

const initialState: SettingState = {
  activeHelp: false,
  activePush: false,
};

export default createReducer<SettingState, Actions>(initialState, {
  ACTIVE_HELP: (state, { payload }) => ({ ...state, activeHelp: payload }),
  ACTIVE_PUSH: (state, { payload }) => ({ ...state, activePush: payload }),
});
