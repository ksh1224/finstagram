import React, { useEffect } from "react";
import {
  useFeedbackMain,
  useFeedRecent,
  useFeedReceived,
  useFeedSent,
} from "hooks/useRedux";
import Container from "layouts/feedback/Container";
import TopRanker from "components/feedback/TopRanker";
import Feed from "components/feedback/Feed";
// import FeedbackList from "./Feedback/FeedbackList";

export default function Feedback() {
  const { request: feedbackMainRequest } = useFeedbackMain();
  const { request: feedRecentRequest } = useFeedRecent();
  const { request: feedReceivedRequest } = useFeedReceived();
  const { request: feedSentRequest } = useFeedSent();
  useEffect(() => {
    feedbackMainRequest();
    feedReceivedRequest();
    feedRecentRequest();
    feedSentRequest();
  }, []);
  return (
    <Container>
      <>
        <TopRanker />
        <Feed />
      </>
    </Container>
  );
}
