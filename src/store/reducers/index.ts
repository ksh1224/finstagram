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
import feedbackBadge from "./feedback/feedbackBadgeReducer";
import feedbackStatistics from "./feedback/feedbackStatisticsReducer";

import userOKR from "./okr/userOKRReducer";
import myOKR from "./okr/myOKRReducer";
import teamOKR from "./okr/teamOKRReducer";

import reviewMain from "./review/reviewMainReducer";
import reviewTeamList from "./review/reviewTeamListReducer";
import reviewPeerList from "./review/reviewPeerListReducer";
import reviewPeerEvalList from "./review/reviewPeerEvalListReducer";
import reviewOKRList from "./review/reviewOKRListReducer";

import searchUser from "./searchUserReducer";
import modal from "./ModalReducer";
import setting from "./SettingReducer";
import notification from "./notificationReducer";
import selectBadge from "./feedback/selectBadgeReducer";

const rootReducer = combineReducers({
  APIAuth,
  topRanker,
  topRankerDetail,
  feedback,
  searchUser,
  feedRecent,
  feedReceived,
  feedSent,
  feedBadge,
  badgeList,
  feedbackBadge,
  feedbackStatistics,
  selectBadge,
  userOKR,
  myOKR,
  teamOKR,
  reviewMain,
  reviewTeamList,
  reviewPeerList,
  reviewPeerEvalList,
  reviewOKRList,
  modal,
  setting,
  notification,
});

export default rootReducer;
