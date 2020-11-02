import React, { useEffect } from "react";
import { useFeedbackMain, useFeedRecent } from "hooks/useRedux";
import Container from "layouts/feedback/Container";
import TopRanker from "components/feedback/TopRanker";
import Feed from "components/feedback/Feed";
import MyFeedback from "components/feedback/MyFeedback";
// import FeedbackList from "./Feedback/FeedbackList";

export default function Feedback() {
  const { request: feedbackMainRequest } = useFeedbackMain();
  const { request: feedRecentRequest } = useFeedRecent();
  useEffect(() => {
    feedbackMainRequest();
    feedRecentRequest(1);
  }, []);
  return (
    <Container>
      <>
        <TopRanker />
        <MyFeedback />
        <Feed />
      </>
    </Container>
  );
}
