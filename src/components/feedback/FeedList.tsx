import React, { useState, createRef, useEffect } from "react";
import FeedListItem, { DataType } from "components/item/FeedListItem";
import { useSelectBadge } from "hooks/useRedux";

import {
  useFeedBadge,
  useFeedReceived,
  useFeedRecent,
  useFeedSent,
} from "hooks/useFeedBackRedux";

import SVG from "utils/SVG";
import DataValidationContainer from "layouts/DataValidationContainer";
import Scroll from "components/Scroll";

const tabName = ["최신 피드백", "내가 받은 피드백", "내가 보낸 피드백"];

export default function FeedList() {
  const scrollRef = createRef<HTMLDivElement>();
  const {
    request: feedRecentRequest,
    data: feedRecentList,
    currentPage: feedRecentCurrentPage,
    totalPages: feedRecentTotalPages,
    isFetching: feedRecentFetching,
  } = useFeedRecent();
  const {
    request: feedReceivedRequest,
    data: feedReceivedList,
    currentPage: feedReceivedCurrentPage,
    totalPages: feedReceivedTotalPages,
    isFetching: feedReceivedFetching,
  } = useFeedReceived();
  const {
    request: feedSentRequest,
    data: feedSentList,
    currentPage: feedSentCurrentPage,
    totalPages: feedSentTotalPages,
    isFetching: feedSentFetching,
  } = useFeedSent();
  const {
    request: feedBadgeRequest,
    data: feedBadgeList,
    isFetching: feedBadgeFetching,
  } = useFeedBadge();
  const { cancelBadge, selectBadgeData } = useSelectBadge();
  const [tab, setTab] = useState(0);

  const pagination = () => {
    switch (tab) {
      case 0:
        if (
          typeof feedRecentTotalPages === "number" &&
          typeof feedRecentCurrentPage === "number" &&
          feedRecentTotalPages > feedRecentCurrentPage
        ) {
          feedRecentRequest(feedRecentCurrentPage + 1);
        }
        break;
      case 1:
        if (
          typeof feedSentTotalPages === "number" &&
          typeof feedSentCurrentPage === "number" &&
          feedSentTotalPages > feedSentCurrentPage
        ) {
          feedReceivedRequest(feedSentCurrentPage + 1);
        }
        break;
      case 2:
        if (
          typeof feedSentTotalPages === "number" &&
          typeof feedSentCurrentPage === "number" &&
          feedSentTotalPages > feedSentCurrentPage
        ) {
          feedSentRequest(feedSentCurrentPage + 1);
        }
        break;

      default:
        break;
    }
  };

  const scollFetching =
    (tab === 0 && feedRecentFetching) ||
    (tab === 1 && feedReceivedFetching) ||
    (tab === 2 && feedSentFetching);

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
          feedReceivedList.map((data: DataType) => {
            return <FeedListItem key={data.id} {...data} feedType="received" />;
          })
        );
      case "내가 보낸 피드백":
        return (
          !!feedSentList &&
          feedSentList.length !== 0 &&
          feedSentList.map((data: DataType) => {
            return <FeedListItem key={data.id} {...data} feedType="sent" />;
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
              href="javascript:;"
              className={`nav-link pt-1 pb-5 font-weight-bolder ${
                i === tab && "active"
              }`}
              onClick={() => {
                setTab(i);
                if (scrollRef) scrollRef.current?.scrollTo(0, 0);
              }}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
      <Scroll
        ref={scrollRef}
        callback={() => pagination()}
        isFetching={scollFetching}
        className="tab-content h-100px flex-grow-1 m-n7 p-7"
      >
        <DataValidationContainer
          isFetching={
            (tab === 0 && !feedRecentList && feedRecentFetching) ||
            (tab === 1 && !feedReceivedList && feedReceivedFetching) ||
            (tab === 2 && !feedSentList && feedSentFetching)
          }
        >
          {tabName?.map((name, i) => (
            <div className={`tab-pane fade ${i === tab && "show active"}`}>
              {feedList(name)}
              {scollFetching && (
                <div className="spinner spinner-primary spinner-lg spinner-center w-100 h-50px" />
              )}
            </div>
          ))}
        </DataValidationContainer>
      </Scroll>
      <div
        id="layer_myBadgeFeedback"
        className={`layer right-to-left ${selectBadgeData ? "show" : ""}`}
      >
        <div className="modal-content col-auto">
          <div className="modal-header px-0 pt-0">
            <h5 className="modal-title">
              <span className="font-weight-bolder">배지 Feedback</span>
              <span className="feedback-icon-group">
                <span className="feedback-icon on">
                  {selectBadgeData?.badge.total ? (
                    <SVG
                      className="w-50px h-50px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 90 90"
                      name="total"
                    />
                  ) : (
                    !!selectBadgeData?.badge?.selectedFileUrlHttps && (
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "25px",
                          border: `1.5px solid #5555`,
                        }}
                        src={selectBadgeData?.badge?.selectedFileUrlHttps}
                        alt=""
                      />
                    )
                  )}
                  <span className="badge label label-md">
                    {selectBadgeData?.received}
                  </span>
                </span>
              </span>
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="layer"
              aria-label="닫기"
              onClick={() => cancelBadge()}
            >
              <i aria-hidden="true" className="ki ki-close" />
            </button>
          </div>
          <div className="modal-body px-7 mx-n7 mb-n7">
            {!!feedBadgeList && feedBadgeList.length !== 0 ? (
              feedBadgeList.map((data: any) => (
                <FeedListItem key={data.id} {...data} feedType="sent" />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
