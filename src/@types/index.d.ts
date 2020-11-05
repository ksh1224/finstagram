import * as actions from "store/actions";
import { ActionType } from "typesafe-actions";

declare global {
  declare interface ObjectType {
    [key: string]: any;
  }

  type Actions = ActionType<typeof actions>;

  interface DefaultState {
    data: any;
    isFetching: boolean;
    error: any;
  }
}
