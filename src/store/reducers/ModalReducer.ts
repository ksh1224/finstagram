import { ModalNameType } from "store/actions";
import { createReducer } from "typesafe-actions";

type Modals = { name: ModalNameType; param: any }[];

const initialState: Modals = [];

export default createReducer<Modals, Actions>(initialState, {
  SHOW_MODAL: (modals, { payload: modal }) => [
    ...modals,
    { name: modal.name, param: modal.param },
  ],
  CLOSED_MODAL: (modals, { payload: name }) => [
    ...modals.filter((modal) => modal.name !== name),
  ],
});
