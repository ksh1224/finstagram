import { combineReducers } from "redux";

import Auth from "./AuthReducer";
import APIAuth from "./APIAuthReducer";
import feedbackMain from "./feedbackMainReducer";
import feedback from "./feedbackReducer";
import feedRecent from "./feedRecentReducer";
import feedReceived from "./feedReceivedReducer";
import feedSent from "./feedSentReducer";
import searchUser from "./searchUserReducer";
import badgeList from "./badgeListReducer";
import modal from "./ModalReducer";
import comment from "./commentReducer";

const rootReducer = combineReducers({
  Auth,
  APIAuth,
  feedbackMain,
  feedback,
  searchUser,
  feedRecent,
  feedReceived,
  feedSent,
  comment,
  badgeList,
  modal,
});

export default rootReducer;
