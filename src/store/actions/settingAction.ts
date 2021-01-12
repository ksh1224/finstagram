import { createAction } from "typesafe-actions";

export const setActiveHelp = createAction(
  "ACTIVE_HELP",
  (show: boolean) => show
)();

export const setActivePush = createAction(
  "ACTIVE_PUSH",
  (show: boolean) => show
)();
