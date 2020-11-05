import { createAction } from "typesafe-actions";

export const showFeedbackModalAction = createAction(
  "SHOW_FEEDBACK_MODAL",
  (user?: any) => user
)();

export const closeFeedbackModalAction = createAction("CLOSED_FEEDBACK_MODAL")();
