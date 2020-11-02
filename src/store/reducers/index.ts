import { combineReducers } from "redux";

import Auth from "./AuthReducer";
import APIAuth from "./APIAuthReducer";
import feedbackMain from "./feedbackMainReducer";
import feedRecent from "./feedRecentReducer";
import searchUser from "./searchUserReducer";
import myFeedback from "./myFeedbackReducer";

const rootReducer = combineReducers({
  Auth,
  APIAuth,
  feedbackMain,
  searchUser,
  feedRecent,
  myFeedback,
});

export default rootReducer;
