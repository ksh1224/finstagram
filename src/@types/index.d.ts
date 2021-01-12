import { AxiosError } from "axios";
import * as actions from "store/actions";
import rootReducer from "store/reducers";
import { ActionType } from "typesafe-actions";

declare global {
  declare interface ObjectType {
    [key: string]: any;
  }

  type RootState = ReturnType<typeof rootReducer>;

  type Actions = ActionType<typeof actions>;

  interface DefaultState {
    data: any;
    isFetching: boolean;
    error: AxiosError | undefined;
  }

  type ObjectiveType = {
    id?: number;
    description?: string;
    progress?: number;
    keyResult?: KeyResult[];
    updateValues?: {
      historyDescription?: string;
      status?: string;
      progress?: number;
    };
    index?: number;
  };

  type KeyResultType = {
    id?: number;
    description?: string;
    progress?: number;
    updateValues?: {
      historyDescription?: string;
      progress?: number;
      status?: string;
    };
    objectiveIndex?: number;
    index?: number;
  };

  type OKRChangeHandler = (
    index: number,
    value: {
      description?: string;
      progress?: number;
      status?: string;
      historyDescription?: string;
    },
    objectiveIndex?: number
  ) => void;

  type FeedbackSendType = {
    targetUser: any;
    type: "PRAISE" | "ADVICE";
    contents: string;
    file: any;
    selectBadge: any;
    id?: number;
  };

  type FeedbackRequestType = {
    targetUsers: any[];
    contents: string;
    file: any;
    id?: number;
  };

  type SearchItemType = {
    id: number;
    name: string;
    nickname: string;
    organizationId: number;
    organizationName: string;
    position: string;
    profileImageUrl: string;
  };

  declare module "*.css" {
    interface IClassNames {
      [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
  }

  declare module "*.scss" {
    interface IClassNames {
      [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
  }
}
