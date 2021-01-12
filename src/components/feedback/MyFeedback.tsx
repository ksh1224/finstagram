import "scrollbar.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "hooks/useRedux";

import {
  useSelectBadge,
  useMyFeedback,
  useFeedBadge,
  useFeedRecent,
  useFeedOne,
} from "hooks/useFeedBackRedux";

import Profile from "components/Profile";
import KTAppSettings from "constant/KTAppSettings";
import SVG from "utils/SVG";
import DataValidationContainer from "layouts/DataValidationContainer";

const receivedColor = KTAppSettings.colors.theme.base.success;
const sentColor = "#6993ff";
const txtColor = KTAppSettings.colors.gray["gray-800"];

export default function MyFeedback() {
  const { user } = useAuth();
  const {
    feedbackBadgeRequest,
    feedbackStatisticsRequest,
    feedbackBadgeData,
    feedbackStatisticsData,
    feedbackBadgeFetching,
    feedbackStatisticsFetching,
  } = useMyFeedback();

  const { data: feedRecentData } = useFeedRecent();
  const [show, setShow] = useState(false);
  const { cancelBadge, selectBadge, selectBadgeData } = useSelectBadge();
  const { request: feedBadgeRequest } = useFeedBadge();

  useEffect(() => {
    feedbackBadgeRequest();
    feedbackStatisticsRequest();
  }, []);

  useEffect(() => {
    if (feedbackStatisticsData?.userList && !show)
      setTimeout(() => setShow(true), 400);
  }, [feedbackStatisticsData]);

  useEffect(() => {
    if (feedRecentData) {
      const { year, quarter } = feedbackStatisticsData;
      cancelBadge();
      feedbackBadgeRequest(year, quarter);
      feedbackStatisticsRequest(year, quarter);
      feedBadgeRequest(year, quarter, selectBadgeData?.badge?.id);
      selectBadge(selectBadgeData);
    }
  }, [feedRecentData]);

  function changeDate({ target }: React.ChangeEvent<HTMLSelectElement>) {
    const [year, quarter] = target.value.split("_");
    cancelBadge();
    feedbackBadgeRequest(year, quarter);
    feedbackStatisticsRequest(year, quarter);
    setShow(false);
  }

  function clickBadge(badgeData: any) {
    if (selectBadgeData?.badge?.id === badgeData?.badge?.id) cancelBadge();
    else if (feedbackStatisticsData) {
      const { year, quarter } = feedbackStatisticsData;
      feedBadgeRequest(year, quarter, badgeData?.badge?.id);
      selectBadge(badgeData);
    }
  }

  return (
    <div className="col-auto h-sm-100 flex-grow-1 w-100px section-group-3">
      <div className="card card-custom card-stretch rounded-bottom-0">
        <div className="card-header border-0">
          <h3 className="card-title font-weight-bolder">My Feedback</h3>
          <div className="card-toolbar">
            <select
              onChange={changeDate}
              className="custom-select form-control border-0 shadow-none pr-5 bgi-position-x-right"
            >
              {feedbackStatisticsData?.availableDates?.map(
                ({ year, quarter }: any) => (
                  <option
                    selected={
                      feedbackStatisticsData?.year === year &&
                      feedbackStatisticsData?.quarter === quarter
                    }
                    value={`${year}_${quarter}`}
                  >{`${year}년 ${quarter}분기`}</option>
                )
              )}
            </select>
          </div>
        </div>
        <div className="card-body pt-2 overflow-y-auto">
          <div className="d-flex flex-column flex-center">
            <Profile user={user} width={120} />
            <a
              href="#"
              className="card-title font-weight-bolder text-dark-75 text-hover-primary font-size-h4 m-0 pt-4 pb-7"
            >
              {user?.organization?.name} {user?.name}
            </a>
          </div>
          <DataValidationContainer
            isFetching={
              !feedbackBadgeData &&
              (feedbackBadgeFetching || feedbackStatisticsFetching)
            }
          >
            <div className="card card-custom bg-light-light shadow-none gutter-b">
              <div className="card-header border-0">
                <h4 className="card-title text-dark font-weight-bolder">
                  칭찬 배지
                </h4>
              </div>
              <div className="card-body px-0 pt-0">
                <div className="feedback-icon-group card-spacer-x my-n5 py-5">
                  <div className="text-nowrap mx-n2">
                    <div
                      className="d-inline-block text-center"
                      style={{ minWidth: "16.2%" }}
                      onClick={() =>
                        feedbackBadgeData?.receivedTotal &&
                        clickBadge({
                          received: feedbackBadgeData?.receivedTotal,
                          badge: {
                            id: null,
                            total: true,
                          },
                        })
                      }
                    >
                      <span
                        className={`feedback-icon hover-on text-center cursor-pointer ${
                          selectBadgeData?.badge?.total ? "on" : ""
                        }`}
                        data-toggle="layer"
                        data-target="#layer_myBadgeFeedback"
                      >
                        <SVG
                          className="w-65px h-65px"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 90 90"
                          name="total"
                        />
                        {feedbackBadgeData?.receivedTotal ? (
                          <span
                            className={`badge label label-lg ${
                              selectBadgeData?.badge?.total
                                ? "bg-light-primary label-outline-primary"
                                : "bg-light-light border border-light-dark"
                            }`}
                          >
                            {feedbackBadgeData?.receivedTotal}
                          </span>
                        ) : (
                          <></>
                        )}
                      </span>
                    </div>
                    {feedbackBadgeData?.badgeList.map((data: any) => (
                      <div
                        className="d-inline-block text-center"
                        style={{ minWidth: "16.2%" }}
                        onClick={() => data?.received && clickBadge(data)}
                      >
                        <span
                          className="feedback-icon hover-on text-center cursor-pointer"
                          data-toggle="layer"
                          data-target="#layer_myBadgeFeedback"
                        >
                          <img
                            className="w-65px h-65px"
                            style={{
                              width: "65px",
                              height: "65px",
                              borderRadius: "33px",
                              border: `1.5px solid ${
                                selectBadgeData?.badge?.id === data?.badge?.id
                                  ? "#000"
                                  : "#5555"
                              }`,
                            }}
                            src={
                              selectBadgeData?.badge?.id === data?.badge?.id
                                ? data?.badge?.selectedFileUrl
                                : data?.badge?.fileUrl
                            }
                            alt=""
                          />
                          {data?.received ? (
                            <span
                              className={`badge label label-lg ${
                                selectBadgeData?.badge?.id === data?.badge?.id
                                  ? "bg-light-primary label-outline-primary"
                                  : "bg-light-light border border-light-dark"
                              }`}
                            >
                              {data?.received}
                            </span>
                          ) : (
                            <></>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-custom bg-light-light shadow-none">
              <div className="card-header border-0">
                <h4 className="card-title text-dark">Feedback</h4>
              </div>
              <div className="card-body pt-0">
                <div className="row row-paddingless mb-10 text-center">
                  <div className="col">
                    <div className="mr-2">
                      <div className="font-size-h4 text-dark-75 font-weight-bolder">
                        {feedbackStatisticsData?.feedbackReceived}
                      </div>
                      <div className="font-size-sm text-dark-50 font-weight-bold mt-1">
                        내가 받은 피드백
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mr-2">
                      <div className="font-size-h4 text-dark-75 font-weight-bolder">
                        {feedbackStatisticsData?.feedbackSent}
                      </div>
                      <div className="font-size-sm text-dark-50 font-weight-bold mt-1">
                        내가 보낸 피드백
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-top border-light-dark my-5" />
                <p className="text-dark-75 m-0 pt-5 font-weight-normal">
                  내가 Feedback을 주고받은 동료들입니다.
                </p>

                {feedbackStatisticsData?.userList?.map((data: any) => (
                  <div className="d-flex gutter-t min-h-60px">
                    <div className="d-flex w-150px">
                      <Profile user={data.user} width={50} className="mr-3" />
                      <div className="w-100px flex-grow-1 font-size-lg">
                        <div className="font-weight-bold">
                          {data?.user?.name}
                        </div>
                        <small className="d-block text-truncate">
                          {data?.user?.organization?.name}
                        </small>
                      </div>
                    </div>
                    <div className="w-100px flex-grow-1 ml-5">
                      <div
                        className={`chart-bar ${show ? "show" : ""}`}
                        data-sent="3"
                        data-received="1"
                      >
                        <svg className="w-100" height="60px">
                          <g className="bars">
                            <rect
                              fill={receivedColor}
                              width="100%"
                              height="30"
                            />
                            <rect
                              fill={sentColor}
                              width={`${
                                (100 /
                                  (data?.feedbackReceived +
                                    data?.feedbackSent)) *
                                data?.feedbackSent
                              }%`}
                              height="30"
                            />
                          </g>
                          <g className="txt">
                            <text
                              fill={txtColor}
                              x="0"
                              y="50"
                            >{`Sent ${data?.feedbackSent}`}</text>
                            <text
                              textAnchor="end"
                              fill={txtColor}
                              x="100%"
                              y="50"
                            >{`Receive ${data?.feedbackReceived}`}</text>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DataValidationContainer>
        </div>
      </div>
    </div>
  );
}
