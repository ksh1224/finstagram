import React, { useEffect } from "react";
import {
  useFeedbackMain,
  useFeedRecent,
  useFeedReceived,
  useFeedSent,
} from "hooks/useRedux";
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
    <div className="container-fluid d-flex flex-column flex-column-fluid py-0 flex-grow-1 h-100px">
      <div className="main tab-content d-flex flex-column-fluid h-100 bg-white">
        <div
          className="content container-fluid tab-pane pb-0 active"
          id="content_tab_feedback"
        >
          <div className="row h-100">
            <div className="col-auto h-sm-100 d-flex flex-column overflow-hidden overflow-y-auto section-group-1">
              <TopRanker />
              <Feed />
            </div>
            <div className="col-auto h-sm-100 flex-grow-1 w-100px section-group-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
