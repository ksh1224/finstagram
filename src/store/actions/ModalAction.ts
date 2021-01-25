import { createAction } from "typesafe-actions";

export type ModalNameType =
  | "requestFeedback"
  | "sendFeedback"
  | "updateRequestFeedback"
  | "updateSendFeedback"
  | "topRanker"
  | "keyResult"
  | "okrHistory"
  | "okrComment"
  | "commentUpdate"
  | "userProfile"
  | "okrUpdate"
  | "selfReview"
  | "teamReview"
  | "peerReview"
  | "addReviewer"
  | "addReviewerComment"
  | "addTeamReviewer"
  | "leaderReview"
  | "okrSelfReview"
  | "okrTeamReview"
  | "feedback"
  | "help"
  | "confirm";

export const showModalAction = createAction(
  "SHOW_MODAL",
  (
    name: ModalNameType,
    param?: { onConfirm?: () => void; isCancel?: boolean; text?: string }
  ) => ({ name, param })
)();

export const closeModalAction = createAction(
  "CLOSED_MODAL",
  (name: ModalNameType) => name
)();
