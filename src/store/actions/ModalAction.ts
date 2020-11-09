import { createAction } from "typesafe-actions";

export type ModalNameType = "requestFeedback" | "sendFeedback";

export const showModalAction = createAction(
  "SHOW_MODAL",
  (name: ModalNameType, param?: any) => ({ name, param })
)();

export const closeModalAction = createAction(
  "CLOSED_MODAL",
  (name: ModalNameType) => name
)();
