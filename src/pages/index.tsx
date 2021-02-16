import React, { useContext, useEffect } from "react";
import { Switch, Route, Link, useLocation, useParams } from "react-router-dom";

import { msalConfig } from "utils/msalConfig";

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
import ConfirmModal from "components/modal/ConfirmModal";
import { useDispatch } from "react-redux";
import {
  useMsal,
  useIsAuthenticated,
  useAccount,
  useMsalAuthentication,
} from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import KeyResultModal from "components/modal/KeyResultModal";

export default function App(): JSX.Element {
  const { request, user, error, isFetching } = useAuth();
  const { instance, accounts } = useMsal();
  const { error: authError } = useMsalAuthentication(InteractionType.Redirect);
  const account = useAccount(accounts[0] || {});
  const isAuthenticated = useIsAuthenticated(accounts[0]);

  // useEffect(() => {
  //   if (accounts.length === 0) {
  //     instance.loginRedirect(msalConfig.redirectRequestConfig);
  //   }
  // }, [accounts]);

  useEffect(() => {
    if (account && isAuthenticated)
      instance
        .acquireTokenSilent({
          ...msalConfig.silentRequestConfig,
          account,
        })
        .then(async (result) => {
          request(result.accessToken);
        });
  }, [account, isAuthenticated]);

  if (user && account && isAuthenticated && !isFetching)
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
        <KeyResultModal />
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
        <ConfirmModal />
      </>
    );
  if (error)
    return (
      <div className="d-flex flex-row flex-column-fluid page">
        <div
          className="d-flex w-100 align-items-center justify-content-center"
          style={{ flexDirection: "column" }}
        >
          <div
            className="font-size-h4 text-dark-75 font-weight-bolder mb-5"
            style={{ textAlign: "center" }}
          >
            {`에러가 발생했습니다: ${error?.message}${
              error?.code ? `(${error?.code})` : ""
            }`}
            <br />
            개발팀에게 문의해주세요.
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn w-30 btn-primary"
              onClick={() => window.history.go(0)}
            >
              재시도
            </button>
          </div>
        </div>
      </div>
    );
  if (authError)
    return (
      <div className="d-flex flex-row flex-column-fluid page">
        <div
          className="d-flex w-100 align-items-center justify-content-center"
          style={{ flexDirection: "column" }}
        >
          <div
            className="font-size-h4 text-dark-75 font-weight-bolder mb-5"
            style={{ textAlign: "center", width: "70vh" }}
          >
            {authError?.message.includes("AADSTS50105") ? (
              `해당 서비스 계정이 아닙니다. 다른 계정으로 로그인 해주세요.`
            ) : (
              <>
                {`sso 에러가 발생했습니다: `}
                <br />
                {authError?.message}
              </>
            )}
          </div>
          <div className="text-center">
            {authError?.message.includes("AADSTS50105") ? (
              <button
                type="button"
                className="btn w-30 btn-primary"
                onClick={() => {
                  instance.loginRedirect(msalConfig.redirectRequestConfig);
                }}
              >
                다른 계정으로 로그인
              </button>
            ) : (
              <button
                type="button"
                className="btn w-30 btn-primary"
                onClick={() => window.history.go(0)}
              >
                재시도
              </button>
            )}
          </div>
        </div>
      </div>
    );
  return (
    <div className="splash-screen">
      <svg className="splash-spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        />
      </svg>
    </div>
  );
}
