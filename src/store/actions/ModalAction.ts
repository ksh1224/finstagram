import { createAction } from "typesafe-actions";

export type ModalNameType =
  | "requestFeedback"
  | "sendFeedback"
  | "updateRequestFeedback"
  | "updateSendFeedback"
  | "topRanker"
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
  | "help";

export const showModalAction = createAction(
  "SHOW_MODAL",
  (name: ModalNameType, param?: any) => ({ name, param })
)();

export const closeModalAction = createAction(
  "CLOSED_MODAL",
  (name: ModalNameType) => name
)();
