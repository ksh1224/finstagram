import { Modal } from "react-bootstrap";
import { useModal } from "hooks/useRedux";
import React, { useEffect, useState, createRef } from "react";
import SVG from "utils/SVG";
import Profile from "components/Profile";
import { useMyOKR, useRefreshOKRData } from "hooks/useOKRRedux";
import axios from "utils/axiosUtil";
import OKRGraph from "components/okr/OKRGraph";
import { useMyFeedback } from "hooks/useFeedBackRedux";
import OKRAccordion from "components/okr/OKRAccordion";
import FeedListItem from "components/item/FeedListItem";
import Scroll from "components/Scroll";
import DataValidationContainer from "layouts/DataValidationContainer";

export default function UserProfileModal() {
  const { modals, closeModal, showModal } = useModal();
  const { feedbackStatisticsData, feedbackStatisticsRequest } = useMyFeedback();
  const { data: myOKRData } = useMyOKR();
  const [selectDate, setSelectDate] = useState({ year: "0", quarter: "0" });
  const [show, setShow] = useState<any>();
  const [okrData, setOKRData] = useState<any>();
  const [feedbackBadge, setFeedbackBadge] = useState<any>([]);
  const [selectBadgeId, setSelectBadgeId] = useState(-1);
  const [feedbackListData, setFeedbackListData] = useState<{
    currentPage: number;
    totalCount: number;
    totalPages: number;
    data: any[];
  }>();
  const [showUserModal, setUserShowMoal] = useState(false);

  const userProfileModal = modals.find(
    (modal: any) => modal.name === "userProfile"
  );

  const { user } = userProfileModal?.param || {};

  function close() {
    setUserShowMoal(false);
    setTimeout(() => {
      setSelectBadgeId(-1);
      closeModal("userProfile");
    }, 300);
  }

  const getBadgeList = async (
    year?: string,
    quarter?: string,
    page?: number
  ) => {
    try {
      if (page) {
        const data = await axios(
          `/feedbacks/received/list?user_id=${user.id}${
            year && quarter ? `&year=${year}&quarter=${quarter}` : ""
          }${selectBadgeId !== -1 ? `&badge_id=${selectBadgeId}` : ""}${
            page ? `&page=${page}` : ""
          }`,
          "GET"
        );
        setFeedbackListData({
          ...data,
          data: [
            ...(feedbackListData?.data ? feedbackListData.data : []),
            ...data.data,
          ],
        });
      } else {
        const data = await axios(
          `/feedbacks/received/list?user_id=${user.id}${
            year && quarter ? `&year=${year}&quarter=${quarter}` : ""
          }${selectBadgeId !== -1 ? `&badge_id=${selectBadgeId}` : ""}`,
          "GET"
        );
        console.log(
          `/feedbacks/received/list?user_id=${user.id}${
            year && quarter ? `&year=${year}&quarter=${quarter}` : ""
          }${selectBadgeId !== -1 ? `&badge_id=${selectBadgeId}` : ""}`,
          data
        );
        setFeedbackListData(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getFeedbackData = async (year?: string, quarter?: string) => {
    const { data: feedbackBadgeData } = await axios(
      `/feedbacks/badge/count?user_id=${user.id}${
        year && quarter ? `&year=${year}&quarter=${quarter}` : ""
      }`,
      "GET"
    );
    setFeedbackBadge(feedbackBadgeData?.CONTRIBUTION);
    getBadgeList(year, quarter);
  };

  const getOKRData = async (year?: string, quarter?: string) => {
    try {
      await setShow(false);
      const { data: OKRData } = await axios(
        `/okr/chart/${user.id}${
          year && quarter ? `?year=${year}&quarter=${quarter}` : ""
        }`,
        "GET"
      );
      setOKRData(OKRData);
      setShow(true);
    } catch (error) {
      close();
    }
  };

  function changeDate({ target }: React.ChangeEvent<HTMLSelectElement>) {
    const [year, quarter] = target.value.split("_");
    setSelectDate({ year, quarter });
  }

  useEffect(() => {
    if (!feedbackStatisticsData) feedbackStatisticsRequest();
    if (user) {
      setSelectDate({
        year: feedbackStatisticsData?.availableDates[0].year,
        quarter: feedbackStatisticsData?.availableDates[0].quarter,
      });
      setUserShowMoal(true);
    }
  }, [userProfileModal]);

  useEffect(() => {
    if (user) {
      getFeedbackData(selectDate.year, selectDate.quarter);
      getOKRData(selectDate.year, selectDate.quarter);
    }
  }, [selectDate]);

  useEffect(() => {
    if (user) {
      getBadgeList(selectDate.year, selectDate.quarter);
    }
  }, [selectBadgeId]);

  useEffect(() => {
    if (user && selectDate) {
      getOKRData(selectDate.year, selectDate.quarter);
    }
  }, [myOKRData]);

  return (
    <Modal
      size="xl"
      show={showUserModal}
      animation
      centered
      onHide={() => close()}
      id="modal_userProfile"
    >
      <div className="modal-content">
        <div className="modal-header border-0">
          <select
            onChange={changeDate}
            className="custom-select form-control border-0 shadow-none pr-5 bgi-position-x-right w-auto"
          >
            {feedbackStatisticsData?.availableDates?.map(
              ({ year, quarter }: any) => (
                <option
                  key={`${year}_${quarter}`}
                  selected={
                    selectDate?.year === year && selectDate?.quarter === quarter
                  }
                  value={`${year}_${quarter}`}
                >{`${year}년 ${quarter}분기`}</option>
              )
            )}
          </select>
          <button type="button" className="close" onClick={() => close()}>
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </div>
        <Scroll
          className="modal-body"
          style={{ maxHeight: "90vh" }}
          callback={() => {
            if (
              feedbackListData?.totalPages &&
              feedbackListData?.currentPage &&
              feedbackListData.totalPages > feedbackListData.currentPage
            ) {
              getBadgeList(
                selectDate.year,
                selectDate.quarter,
                feedbackListData.currentPage + 1
              );
            }
          }}
        >
          <div className="d-flex flex-column align-items-center">
            <Profile user={user} width={80} />
            <div className="font-weight-bolder text-dark-75 font-size-h4 m-0 pt-3">
              {user?.name}
            </div>
            <div className="text-dark-75 m-0 flex-grow-1 font-size-lg">
              {user?.organization?.name}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-3">
            <a
              href="javascript:;"
              className="btn btn-text-dark-50 btn-icon-primary btn-hover-icon-dark font-weight-bold btn-hover-bg-light mx-2"
              onClick={() => showModal("sendFeedback", user)}
            >
              <span className="svg-icon svg-icon-2x">
                <SVG name="sendMessage" />
              </span>
              피드백 보내기
            </a>
            <a
              href="javascript:;"
              className="btn btn-text-dark-50 btn-icon-primary btn-hover-icon-dark font-weight-bold btn-hover-bg-light mx-2"
              onClick={() => showModal("requestFeedback", user)}
            >
              <span className="svg-icon svg-icon-2x">
                <SVG name="requestMessage" />
              </span>
              피드백 요청하기
            </a>
          </div>
          <div className="d-flex flex-row flex-wrap align-items-stretch mt-5">
            <div className="col-auto w-100px flex-grow-1 section-1">
              <div className="card card-custom card-stretch">
                <div className="card-header flex-nowrap align-items-center border-0">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="font-weight-bolder text-dark">
                      Feedback
                    </span>
                  </h3>
                </div>
                <div className="card-body pt-2">
                  <div className="overflow-x-auto pb-2 px-0 badge-scroll fs-scroll">
                    <div className="text-nowrap d-flex justify-content-between">
                      <div
                        className="text-center px-2"
                        style={{ minWidth: "86px" }}
                      >
                        <div
                          className={`feedback-icon hover-on ${
                            selectBadgeId === -1 ? "on" : ""
                          }`}
                          onClick={() => setSelectBadgeId(-1)}
                        >
                          <SVG
                            className="w-55px h-55px bg-white border border-light-dark rounded-circle"
                            xmlns="http://www.w3.org/2000/svg"
                            name="total"
                            viewBox="0 0 90 90"
                          />
                          {!!feedbackBadge?.receivedTotal &&
                            feedbackBadge?.receivedTotal !== 0 && (
                              <span className="badge label label-lg">
                                {feedbackBadge?.receivedTotal}
                              </span>
                            )}
                        </div>
                        <div className="mt-4 font-size-sm text-dark-50 text-truncate">
                          합계
                        </div>
                      </div>
                      {feedbackBadge &&
                        feedbackBadge?.badgeList?.map((data: any) => (
                          <div
                            key={data?.badge?.id}
                            className="text-center px-2"
                            style={{ minWidth: "86px" }}
                          >
                            <div
                              className="feedback-icon hover-on on"
                              onClick={() => setSelectBadgeId(data?.badge?.id)}
                            >
                              <img
                                className="w-55px h-55px"
                                style={{
                                  width: "65px",
                                  height: "65px",
                                  borderRadius: "33px",
                                  border: `1.5px solid ${
                                    selectBadgeId === data?.badge?.id
                                      ? "#000"
                                      : "#5555"
                                  }`,
                                }}
                                src={
                                  selectBadgeId === data?.badge?.id
                                    ? data?.badge?.selectedFileUrlHttps
                                    : data?.badge?.fileUrlHttps
                                }
                                alt=""
                              />
                              {!!data?.received && data?.received !== 0 && (
                                <span className="badge label label-lg">
                                  {data?.received}
                                </span>
                              )}
                            </div>
                            <div className="mt-4 font-size-sm text-dark-50 text-truncate">
                              {data?.badge?.name}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <Scroll className="card-body pt-2">
                  <DataValidationContainer
                    noDataView={
                      <div className="d-flex align-items-center justify-content-center min-h-150px font-size-lg">
                        피드백이 없습니다.
                      </div>
                    }
                  >
                    {feedbackListData?.data &&
                      feedbackListData.data?.map((feedback) => {
                        return (
                          <FeedListItem
                            key={feedback.id}
                            {...feedback}
                            feedType="modal"
                            onUpdate={() =>
                              getFeedbackData(
                                selectDate.year,
                                selectDate.quarter
                              )
                            }
                          />
                        );
                      })}
                  </DataValidationContainer>
                </Scroll>
              </div>
            </div>
            <div className="col-auto w-100px flex-grow-1 section-2 order-first order-lg-2">
              <div className="card card-custom position-static position-lg-sticky top-0">
                <div className="card-header flex-nowrap align-items-center border-0">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="font-weight-bolder text-dark">OKR</span>
                  </h3>
                </div>
                <Scroll className="card-body pt-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <OKRGraph
                      show={show}
                      rowScore={okrData?.progressLow}
                      mediumScore={okrData?.progressMid}
                      highScore={okrData?.progressHigh}
                    />
                  </div>
                  {!okrData ? (
                    <div className="text-center my-10">
                      <p className="font-size-h5 mb-6">
                        {`${selectDate.year}년 ${selectDate.quarter}분기 OKR Data가 없습니다.`}
                      </p>
                    </div>
                  ) : (
                    <OKRAccordion objectives={okrData?.objective} user={user} />
                  )}
                </Scroll>
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    </Modal>
  );
}
