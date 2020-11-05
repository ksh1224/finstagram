import { createReducer } from "typesafe-actions";

type State = {
  isShowFeedback: boolean;
  feedbackUser?: any;
};

const initialState: State = {
  isShowFeedback: false,
  feedbackUser: null,
};

export default createReducer<State, Actions>(initialState, {
  SHOW_FEEDBACK_MODAL: (state, action) => ({
    ...state,
    isShowFeedback: true,
    feedbackUser: action.payload,
  }),
  CLOSED_FEEDBACK_MODAL: (state) => ({
    ...state,
    isShowFeedback: false,
    feedbackUser: null,
  }),
});

// const AuthReducer = (state = initialState, action: Action) => {
//   switch (action.type) {
//     case "SHOW_FEEDBACK_MODAL":
//       return {
//         ...state,
//         showFeedback: true,
//         feedbackData: action.payload,
//       };
//     case "CLOSED_FEEDBACK_MODAL":
//       return {
//         ...state,
//         showFeedback: false,
//         feedbackData: null,
//       };
//     default:
//       return state;
//   }
// };

// export default AuthReducer;
