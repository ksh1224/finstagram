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

export default function App(): JSX.Element {
  const { APIAuth, Auth } = useAuth();
  const { initialized, initializing } = Auth;
  const { isFetching, user } = APIAuth;
  if (initialized && user)
    return (
      <>
        <Body>
          <Header />
          <Switch>
            <Route exact path="/" component={Feedback} />
            <Route path="/OKR" component={OKR} />
            <Route exact path="/Review" component={Review} />
          </Switch>
        </Body>
        <FeedbackSendModal />
        <FeedbackRequestModal />
      </>
    );

  if (isFetching || initializing) return <div>로딩중...</div>;
  return <div>에러</div>;
}
