import React, { useState, createRef, useEffect } from "react";
import FeedListItem, { DataType } from "components/item/FeedListItem";
import { useSelectBadge } from "hooks/useRedux";

import {
  useFeedBadge,
  useFeedReceived,
  useFeedRecent,
  useFeedSent,
  useMyFeedback,
} from "hooks/useFeedBackRedux";

import SVG from "utils/SVG";
import DataValidationContainer from "layouts/DataValidationContainer";
import Scroll from "components/Scroll";

const tabName = ["최신 피드백", "내가 받은 피드백", "내가 보낸 피드백"];

export default function FeedList() {
  const scrollRef = createRef<HTMLDivElement>();
  const scrollBadgeRef = createRef<HTMLDivElement>();
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
    currentPage: feedBadgeCurrentPage,
    totalPages: feedBadgeTotalPages,
    isFetching: feedBadgeFetching,
  } = useFeedBadge();
  const { feedbackStatisticsData } = useMyFeedback();
  const { year, quarter } = feedbackStatisticsData || {};
  const { cancelBadge, selectBadgeData } = useSelectBadge();
  const [selectBadge, setSelectBadge] = useState<any>();
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
          typeof feedReceivedTotalPages === "number" &&
          typeof feedReceivedCurrentPage === "number" &&
          feedReceivedTotalPages > feedReceivedCurrentPage
        ) {
          feedReceivedRequest(feedReceivedCurrentPage + 1);
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
          <DataValidationContainer
            noDataView={
              <div className="d-flex align-items-center justify-content-center min-h-150px font-size-lg">
                피드백이 없습니다.
              </div>
            }
          >
            {feedRecentList?.map((data: DataType) => (
              <FeedListItem key={data.id} {...data} feedType="recent" />
            ))}
          </DataValidationContainer>
        );
      case "내가 받은 피드백":
        return (
          <DataValidationContainer
            noDataView={
              <div className="d-flex align-items-center justify-content-center min-h-150px font-size-lg">
                피드백이 없습니다.
              </div>
            }
          >
            {feedReceivedList?.map((data: DataType) => {
              return (
                <FeedListItem key={data.id} {...data} feedType="received" />
              );
            })}
          </DataValidationContainer>
        );
      case "내가 보낸 피드백":
        return (
          <DataValidationContainer
            noDataView={
              <div className="d-flex align-items-center justify-content-center min-h-150px font-size-lg">
                피드백이 없습니다.
              </div>
            }
          >
            {feedSentList?.map((data: DataType) => {
              return <FeedListItem key={data.id} {...data} feedType="sent" />;
            })}
          </DataValidationContainer>
        );
      default:
        break;
    }
    return <></>;
  }

  useEffect(() => {
    if (selectBadgeData) setSelectBadge(selectBadgeData?.badge);
  }, [selectBadgeData]);

  return (
    <div className="col-auto h-sm-100 flex-grow-1 w-100px d-flex flex-column section-2">
      <ul className="nav nav-tabs nav-tabs-line gutter-b border-light-dark position-sticky top-0 bg-white zindex-1">
        {tabName.map((name, i) => (
          <li key={name} className="nav-item">
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
        className="tab-content h-lg-100px flex-grow-1 m-n7 p-7"
      >
        <DataValidationContainer
          isFetching={
            (tab === 0 && !feedRecentList && feedRecentFetching) ||
            (tab === 1 && !feedReceivedList && feedReceivedFetching) ||
            (tab === 2 && !feedSentList && feedSentFetching)
          }
        >
          {tabName?.map((name, i) => (
            <div
              key={name}
              className={`tab-pane fade ${i === tab && "show active"}`}
            >
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
                  {selectBadge?.total ? (
                    <SVG
                      className="w-50px h-50px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 90 90"
                      name="total"
                    />
                  ) : (
                    !!selectBadge?.selectedFileUrlHttps && (
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "25px",
                          border: `1.5px solid #5555`,
                        }}
                        src={selectBadge.selectedFileUrlHttps}
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
              onClick={() => {
                cancelBadge();
                scrollBadgeRef.current?.scrollTo(0, 0);
              }}
            >
              <i aria-hidden="true" className="ki ki-close" />
            </button>
          </div>
          <Scroll
            ref={scrollBadgeRef}
            className="modal-body px-7 mx-n7 mb-n7"
            callback={() =>
              typeof feedBadgeTotalPages === "number" &&
              typeof feedBadgeCurrentPage === "number" &&
              feedBadgeTotalPages > feedBadgeCurrentPage &&
              feedBadgeRequest(
                year,
                quarter,
                selectBadgeData?.badge?.id,
                feedBadgeCurrentPage + 1
              )
            }
          >
            <DataValidationContainer
              noDataView={
                <div className="d-flex align-items-center justify-content-center min-h-150px font-size-lg">
                  피드백이 없습니다.
                </div>
              }
            >
              {feedBadgeList?.map((data: any) => (
                <FeedListItem key={data.id} {...data} feedType="sent" />
              ))}
            </DataValidationContainer>
          </Scroll>
        </div>
      </div>
    </div>
  );
}
