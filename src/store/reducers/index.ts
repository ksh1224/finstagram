import { combineReducers } from "redux";

import Auth from "./AuthReducer";
import APIAuth from "./APIAuthReducer";
import feedbackMain from "./feedbackMainReducer";
import feedRecent from "./feedRecentReducer";
import searchUser from "./searchUserReducer";

const rootReducer = combineReducers({
  Auth,
  APIAuth,
  feedbackMain,
  searchUser,
  feedRecent,
});

export default rootReducer;
