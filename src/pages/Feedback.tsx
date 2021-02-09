import React, { useEffect, useState } from "react";
import {
  useTopRanker,
  useFeedRecent,
  useFeedReceived,
  useFeedSent,
} from "hooks/useFeedBackRedux";
import TopRanker from "components/feedback/TopRanker";
import FeedList from "components/feedback/FeedList";
import MyFeedback from "components/feedback/MyFeedback";
import Scroll from "components/Scroll";
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

  const [isScrollEnd, setIsScrollEnd] = useState(false);

  const scrollEnd = () => {
    setIsScrollEnd(true);
    setTimeout(() => setIsScrollEnd(false), 100);
  };

  return (
    <div
      className="content container-fluid tab-pane pb-0 active"
      id="content_tab_feedback"
    >
      <div className="row h-100">
        <Scroll
          callback={() => {
            scrollEnd();
          }}
          className="col-auto h-sm-100 d-flex flex-column section-group-1"
        >
          <TopRanker />
          <FeedList scrollEnd={isScrollEnd} />
        </Scroll>
        <MyFeedback />
      </div>
    </div>
  );
}
