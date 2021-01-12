import React, { useEffect } from "react";
import { Switch, Route, Link, useLocation, useParams } from "react-router-dom";

import Header from "layouts/main/Header";
import Feedback from "pages/Feedback";
import OKR from "pages/OKR";
import Review from "pages/Review";
import { useAuth } from "hooks/useRedux";
import Body from "layouts/main/Body";
import FeedbackSendModal from "components/modal/FeedbackSendModal";
import FeedbackRequestModal from "components/modal/FeedbackRequestModal";
import TopRankerDetailModal from "components/modal/TopRankerDetailModal";
import SwitchContainer from "layouts/main/SwitchContainer";
import OKRHistoryModal from "components/modal/OKRHistoryModal";
import OKRUpateModal from "components/modal/OKRUpateModal";
import OKRCommentModal from "components/modal/OKRCommentModal";
import UserProfileModal from "components/modal/UserProfileModal";
import SelfReviewModal from "components/modal/SelfReviewModal";
import TeamReviewModal from "components/modal/TeamReviewModal";
import LeaderReviewModal from "components/modal/LeaderReviewModal";
import AddReviewerModal from "components/modal/AddReviewerModal";
import AddReviewerCommentModal from "components/modal/AddReviewerCommentModal";
import PeerReviewModal from "components/modal/PeerReviewModal";
import AddTeamReviewerModal from "components/modal/AddTeamReviewerModal";
import OKRSelfReviewModal from "components/modal/OKRSelfReviewModal";
import OKRTeamReviewModal from "components/modal/OKRTeamReviewModal";
import HelpModal from "components/modal/HelpModal";
import CommentUpdateModal from "components/modal/CommentUpdateModal";
import FeedbackModal from "components/modal/FeedbackModal";

export default function App(): JSX.Element {
  const { user, error, Auth } = useAuth();
  const { initialized, initializing, logInResponse } = Auth;

  // console.log("initialized, initializing, logInResponse");
  // console.log(initialized, initializing, logInResponse);

  if (initialized && user)
    return (
      <>
        <Body>
          <Header />
          <SwitchContainer>
            <Switch>
              <Route exact path="/" component={Feedback} />
              <Route path="/OKR" component={OKR} />
              <Route exact path="/Review" component={Review} />
            </Switch>
          </SwitchContainer>
        </Body>
        <FeedbackSendModal />
        <FeedbackRequestModal />
        <TopRankerDetailModal />
        <OKRHistoryModal />
        <OKRUpateModal />
        <OKRCommentModal />
        <UserProfileModal />
        <SelfReviewModal />
        <TeamReviewModal />
        <AddReviewerModal />
        <AddTeamReviewerModal />
        <AddReviewerCommentModal />
        <PeerReviewModal />
        <LeaderReviewModal />
        <OKRSelfReviewModal />
        <OKRTeamReviewModal />
        <HelpModal />
        <CommentUpdateModal />
        <FeedbackModal />
      </>
    );
  return (
    <div className="d-flex flex-row flex-column-fluid page">
      <div className="d-flex w-100 align-items-center justify-content-center">
        <div className="spinner spinner-primary spinner-lg spinner-center w-100 h-50px" />
      </div>
    </div>
  );
}
