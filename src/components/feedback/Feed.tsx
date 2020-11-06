import React, { useEffect, useState } from "react";
import FeedListItem, { DataType } from "components/item/FeedListItem";
import { useFeedReceived, useFeedRecent, useFeedSent } from "hooks/useRedux";

const tabName = ["최신 피드백", "내가 받은 피드백", "내가 보낸 피드백"];

export default function Feed() {
  const {
    request: feedRecentRequest,
    data: feedRecentList,
    currentPage,
    totalPages,
    isFetching: feedRecentFetching,
  } = useFeedRecent();
  const {
    request: feedReceivedRequest,
    data: feedReceivedList,
    isFetching: feedReceivedFetching,
  } = useFeedReceived();
  const {
    request: feedSentRequest,
    data: feedSentList,
    isFetching: feedSentFetching,
  } = useFeedSent();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    // if (tab === 0) feedRecentRequest();
    // if (tab === 1) feedReceivedRequest();
  }, [tab]);

  function feedList(name: string) {
    switch (name) {
      case "최신 피드백":
        return (
          !!feedRecentList &&
          feedRecentList.length !== 0 &&
          feedRecentList.map((data: DataType) => (
            <FeedListItem key={data.id} {...data} feedType="recent" />
          ))
        );
      case "내가 받은 피드백":
        return (
          !!feedReceivedList &&
          feedReceivedList.length !== 0 &&
          feedReceivedList.map(({ data: listData, quarter, year }: any) => {
            return (
              <>
                <div className="label label-inline mb-3">{`${year}년 ${quarter}분기`}</div>
                {!!listData &&
                  listData.length !== 0 &&
                  listData.map((data: DataType) => (
                    <FeedListItem key={data.id} {...data} feedType="received" />
                  ))}
              </>
            );
          })
        );
      case "내가 보낸 피드백":
        return (
          !!feedSentList &&
          feedSentList.length !== 0 &&
          feedSentList.map(({ data: listData, quarter, year }: any) => {
            return (
              <>
                <div className="label label-inline mb-3">{`${year}년 ${quarter}분기`}</div>
                {!!listData &&
                  listData.length !== 0 &&
                  listData.map((data: DataType) => (
                    <FeedListItem key={data.id} {...data} feedType="sent" />
                  ))}
              </>
            );
          })
        );
      default:
        break;
    }
    return <></>;
  }

  return (
    <div className="col-auto h-sm-100 flex-grow-1 w-100px d-flex flex-column overflow-hidden section-2">
      <ul className="nav nav-tabs nav-tabs-line gutter-b border-light-dark">
        {tabName.map((name, i) => (
          <li className="nav-item">
            <a
              className={`nav-link pt-1 pb-5 font-weight-bolder ${
                i === tab && "active"
              }`}
              onClick={() => setTab(i)}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content h-100px flex-grow-1 overflow-y-auto m-n7 p-7">
        {tabName?.map((name, i) => (
          <div className={`tab-pane fade ${i === tab && "show active"}`}>
            {feedList(name)}
          </div>
        ))}
      </div>
      {/* <div id="layer_myBadgeFeedback" className="layer right-to-left" /> */}
    </div>
  );
}
