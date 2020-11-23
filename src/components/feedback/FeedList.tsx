import React, { useEffect, useState } from "react";
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

const tabName = ["최신 피드백", "내가 받은 피드백", "내가 보낸 피드백"];

export default function FeedList() {
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
  const {
    request: feedBadgeRequest,
    data: feedBadgeList,
    isFetching: feedBadgeFetching,
  } = useFeedBadge();
  const { cancelBadge, selectBadgeData } = useSelectBadge();
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
              href="javascript:;"
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
        <DataValidationContainer
          isFetching={
            feedRecentFetching || feedReceivedFetching || feedSentFetching
          }
        >
          {tabName?.map((name, i) => (
            <div className={`tab-pane fade ${i === tab && "show active"}`}>
              {feedList(name)}
            </div>
          ))}
        </DataValidationContainer>
      </div>
      <div className={`layer right-to-left ${selectBadgeData ? "show" : ""}`}>
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
                    !!selectBadgeData?.badge?.selectedFileUrl && (
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "25px",
                          border: `1.5px solid #5555`,
                        }}
                        src={selectBadgeData?.badge?.selectedFileUrl}
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
