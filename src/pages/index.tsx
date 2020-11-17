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

export default function App(): JSX.Element {
  const { user, error, Auth } = useAuth();
  const { initialized, initializing } = Auth;
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
      </>
    );
  if (error) return <div>에러</div>;
  return (
    <div className="d-flex flex-row flex-column-fluid page">
      <div className="d-flex w-100 align-items-center justify-content-center">
        <div className="spinner spinner-primary spinner-lg spinner-center w-100 h-50px" />
      </div>
    </div>
  );
}
