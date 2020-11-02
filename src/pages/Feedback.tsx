import React, { useEffect } from "react";
import { useFeedbackMain, useFeedRecent, useMyFeedback } from "hooks/useRedux";
import Container from "layouts/feedback/Container";
import TopRanker from "components/feedback/TopRanker";
import Feed from "components/feedback/Feed";
import MyFeedback from "components/feedback/MyFeedback";
// import FeedbackList from "./Feedback/FeedbackList";

export default function Feedback() {
  const { request: feedbackMainRequest } = useFeedbackMain();
  const { request: feedRecentRequest } = useFeedRecent();
  const { request: myFeedbackRequest } = useMyFeedback();
  useEffect(() => {
    feedbackMainRequest();
    feedRecentRequest(1);
    myFeedbackRequest();
  }, []);
  return (
    <Container>
      <>
        <TopRanker />
        <Feed />
        <MyFeedback />
      </>
    </Container>
  );
}
