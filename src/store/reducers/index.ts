import { combineReducers } from "redux";

import Auth from "./AuthReducer";
import APIAuth from "./APIAuthReducer";

import topRanker from "./feedback/topRankerReducer";
import topRankerDetail from "./feedback/topRankerDetailReducer";
import feedback from "./feedback/feedbackReducer";
import feedRecent from "./feedback/feedRecentReducer";
import feedReceived from "./feedback/feedReceivedReducer";
import feedSent from "./feedback/feedSentReducer";
import feedBadge from "./feedback/feedBadgeReducer";
import badgeList from "./feedback/badgeListReducer";
import comment from "./feedback/commentReducer";
import feedbackBadge from "./feedback/feedbackBadgeReducer";
import feedbackStatistics from "./feedback/feedbackStatisticsReducer";

import userOKR from "./okr/userOKRReducer";
import myOKR from "./okr/myOKRReducer";
import teamOKR from "./okr/teamOKRReducer";

import searchUser from "./searchUserReducer";
import modal from "./ModalReducer";
import selectBadge from "./feedback/selectBadgeReducer";

const rootReducer = combineReducers({
  Auth,
  APIAuth,
  topRanker,
  topRankerDetail,
  feedback,
  searchUser,
  feedRecent,
  feedReceived,
  feedSent,
  feedBadge,
  comment,
  badgeList,
  modal,
  feedbackBadge,
  feedbackStatistics,
  selectBadge,
  userOKR,
  myOKR,
  teamOKR,
});

export default rootReducer;
