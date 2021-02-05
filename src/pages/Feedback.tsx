import React, { useEffect } from "react";
import {
  useTopRanker,
  useFeedRecent,
  useFeedReceived,
  useFeedSent,
} from "hooks/useFeedBackRedux";
import TopRanker from "components/feedback/TopRanker";
import FeedList from "components/feedback/FeedList";
import MyFeedback from "components/feedback/MyFeedback";
// import FeedbackList from "./Feedback/FeedbackList";

export default function Feedback() {
  const { request: topRankerRequest } = useTopRanker();
  const { request: feedRecentRequest } = useFeedRecent();
  const { request: feedReceivedRequest } = useFeedReceived();
  const { request: feedSentRequest } = useFeedSent();
  useEffect(() => {
    topRankerRequest();
    feedReceivedRequest();
    feedRecentRequest();
    feedSentRequest();
  }, []);
  return (
    <div
      className="content container-fluid tab-pane pb-0 active"
      id="content_tab_feedback"
    >
      <div className="row h-md-100">
        <div className="col-auto h-md-100 d-flex flex-column overflow-hidden overflow-y-auto section-group-1">
          <TopRanker />
          <FeedList />
        </div>
        <MyFeedback />
      </div>
    </div>
  );
}
