/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Modal } from "react-bootstrap";
import { useAuth, useModal } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import SVG from "utils/SVG";
import axios from "utils/axiosUtil";
import OKRGraph from "components/okr/OKRGraph";
import OKRAccordion from "components/okr/OKRAccordion";
import FeedListItem from "components/item/FeedListItem";
import Scroll from "components/Scroll";
import { useReviewMain } from "hooks/useReview";
import Profile from "components/Profile";
import { useMyFeedback } from "hooks/useFeedBackRedux";
import DataValidationContainer from "layouts/DataValidationContainer";

const selectArray = [
  "매우 동의하지 않음",
  "동의하지 않음",
  "약간 동의하지 않음",
  "약간 동의함",
  "동의함",
  "매우 동의함",
];

const Consider = "Consider";
const Continue = "Continue";

const collaboration = "collaboration";
const contribution = "contribution";

export default function PeerReviewModal() {
  const { modals, closeModal, showModal } = useModal();
  const { feedbackStatisticsData, feedbackStatisticsRequest } = useMyFeedback();
  const { request } = useReviewMain();
  const [show, setShow] = useState<any>();
  const [okrData, setOKRData] = useState<any>();
  const [feedbackBadge, setFeedbackBadge] = useState<any>([]);
  const [selectBadgeId, setSelectBadgeId] = useState(-1);
  const [feedbackListData, setFeedbackListData] = useState<any[]>([]);

  const [isTemporary, setIsTemporary] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [peerData, setPeerData] = useState<any>(null);
  const [prevData, setPrevData] = useState<any>(null);
  const [isExtraComment, setIsExtraComment] = useState(false);
  const [yearQuarter, setYearQuarter] = useState({ year: 0, quarter: 0 });

  const peerReviewModal = modals.find((modal) => modal.name === "peerReview");

  const { meta, user } = peerReviewModal?.param || {};
  const { year: paramYear, quarter: paramQuarter, id } = meta || {};

  function close() {
    closeModal("peerReview");
    setTimeout(() => {
      setIsExtraComment(false);
      setPeerData(null);
      setPrevData(null);
    }, 300);
  }

  const getBadgeList = async (year: number, quarter: number) => {
    if (year && quarter) {
      try {
        const { data } = await axios(
          `/feedbacks/received/list?user_id=${user?.userId}${
            year && quarter ? `&year=${year}&quarter=${quarter}` : ""
          }${selectBadgeId !== -1 ? `&badge_id=${selectBadgeId}` : ""}`,
          "GET"
        );
        setFeedbackListData(data);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const getFeedbackData = async (year: number, quarter: number) => {
    try {
      if (year && quarter) {
        const { data: feedbackBadgeData } = await axios(
          `/feedbacks/badge/count?user_id=${user.userId}${
            year && quarter ? `&year=${year}&quarter=${quarter}` : ""
          }`,
          "GET"
        );
        setFeedbackBadge(feedbackBadgeData?.CONTRIBUTION);
        getBadgeList(year, quarter);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getOKRData = async (year: number, quarter: number) => {
    try {
      if (year && quarter) {
        await setShow(false);
        const { data: OKRData } = await axios(
          `/okr/chart/${user.userId}${
            year && quarter ? `?year=${year}&quarter=${quarter}` : ""
          }`,
          "GET"
        );
        setOKRData(OKRData);
        setShow(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getData = async () => {
    try {
      const { data } = await axios(
        `/review/peer/reviewData?metaId=${id}`,
        "GET"
      );
      const findIndex = data.findIndex(
        (findData: any) => user.userId === findData.user.id
      );
      setPeerData(JSON.parse(JSON.stringify(data[findIndex])));
      setPrevData({ data, index: findIndex });
      if (
        data[findIndex] &&
        typeof data[findIndex].collaboration?.considerData?.answer ===
          "string" &&
        data[findIndex].collaboration.considerData.answer.trim() !== ""
      )
        setIsExtraComment(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  // const getSubmitted = async () => {
  //   try {
  //     const { data: isSubmitted } = await axios(
  //       `/review/self/isSubmitted?metaId=${id}`,
  //       "GET"
  //     );
  //     if (isSubmitted) close();
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const update = async (submit: boolean) => {
    try {
      const res = await axios(
        `/review/peer/${submit ? "submit" : "saveTemp"}?metaId=${id}`,
        "POST",
        submit
          ? JSON.stringify(peerData)
          : JSON.stringify(
              prevData.data.map((peer: any, i: number) =>
                i === prevData.index ? peerData : peer
              )
            )
      );
      if (res.responseCode === "SUCCESS") {
        request(id);
        close();
        setTimeout(() => {
          showModal("confirm", {
            text: submit ? "제출되었습니다." : "임시저장되었습니다.",
          });
        }, 300);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (peerReviewModal && user) {
      getFeedbackData(paramYear, paramQuarter);
      getOKRData(paramYear, paramQuarter);
      feedbackStatisticsRequest(paramYear, paramQuarter);
      getData();
      setYearQuarter({ year: paramYear, quarter: paramQuarter });
    }
  }, [peerReviewModal]);

  useEffect(() => {
    const { year, quarter } = yearQuarter;
    if (user && year && quarter) {
      getBadgeList(year, quarter);
    }
  }, [selectBadgeId]);

  useEffect(() => {
    const { year, quarter } = yearQuarter;
    getFeedbackData(year, quarter);
    getOKRData(year, quarter);
  }, [yearQuarter]);

  useEffect(() => {
    if (peerData && prevData) {
      let submit = true;
      let temporary = 0;
      const {
        contribution: Contribution,
        collaboration: Collaboration,
        considerPoints,
      } = peerData || {};
      if (Contribution && Collaboration && considerPoints) {
        if (!Contribution.answer || !Collaboration.answer) {
          submit = false;
          temporary += 1;
        }
        if (
          Contribution.answer === Consider &&
          (!Contribution.considerData.answer ||
            Contribution.considerData.answer.trim() === "")
        ) {
          submit = false;
          temporary += 1;
        }
        if (
          Contribution.answer === Continue &&
          (!Contribution.continueData.answer ||
            Contribution.continueData.answer.trim() === "")
        ) {
          submit = false;
          temporary += 1;
        }
        if (Collaboration.answer === Continue) {
          if (
            !Collaboration.continueData.answer ||
            Collaboration.continueData.answer.trim() === ""
          ) {
            submit = false;
            temporary += 1;
          }
        }
        if (Collaboration.answer === Consider) {
          if (isExtraComment) {
            if (considerPoints.answer.length === 0) {
              if (
                !Collaboration.considerData.answer ||
                Collaboration.considerData.answer.trim() === ""
              ) {
                submit = false;
              }
            }
            temporary += 1;
          } else if (considerPoints.answer.length === 0) {
            submit = false;
            temporary += 1;
          }
        }
        if (
          JSON.stringify(prevData?.data[prevData?.index]) ===
          JSON.stringify(peerData)
        ) {
          temporary = 2;
        }
        setIsSubmit(submit);
        setIsTemporary(temporary !== 2);
      }
    }
  }, [peerData, prevData]);

  const changeData = (
    type: string,
    values: { text?: string; index?: number; optionId?: number; extra?: string }
  ) => {
    if (!peerData?.submitted) {
      const newData = { ...peerData };
      if (typeof values?.index === "number") {
        newData[type].indexData.answer = values?.index;
        if (values?.index > 3) newData[type].answer = Continue;
        else newData[type].answer = Consider;
      }
      if (typeof values?.text === "string") {
        newData[type][
          newData[type].answer === Consider ? "considerData" : "continueData"
        ].answer = values.text;
      }
      if (typeof values?.optionId === "number") {
        if (newData.considerPoints.answer.includes(values.optionId))
          newData.considerPoints.answer = [
            ...newData.considerPoints.answer.filter(
              (selectId: number) => selectId !== values.optionId
            ),
          ];
        else
          newData.considerPoints.answer = [
            ...newData.considerPoints.answer,
            values.optionId,
          ];
      }
      if (typeof values?.extra === "string") {
        newData[type][
          newData[type].answer === Consider ? "considerData" : "continueData"
        ].answer = values.text;
      }
      setPeerData(newData);
    }
  };

  return (
    <Modal
      size="xl"
      show={!!peerReviewModal && !!prevData}
      animation
      centered
      onHide={() => close()}
      id="modal_coworkerReview"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="d-flex modal-title align-items-center">
            <Profile width={50} user={prevData?.data[prevData?.index]?.user} />
            <div className="ml-3">
              {prevData?.data[prevData?.index]?.user?.name}님 동료 Review
            </div>
          </h2>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="닫기"
            onClick={() => close()}
          >
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </div>
        <Scroll className="modal-body" style={{ maxHeight: "90vh" }}>
          <div className="d-flex flex-row flex-wrap align-items-stretch">
            <Scroll
              className="d-flex flex-column col-auto w-100px flex-grow-1 section-1 px-6"
              style={{ maxHeight: "77vh" }}
            >
              <div className="d-flex flex-column">
                <div className="flex-nowrap align-items-center border-0">
                  <h5
                    className="align-items-center d-flex flex-row"
                    style={{ justifyContent: "space-between" }}
                  >
                    <span className="font-weight-bolder text-dark">
                      Feedback
                    </span>
                    <div className="card-toolbar">
                      <select
                        onChange={({
                          target,
                        }: React.ChangeEvent<HTMLSelectElement>) => {
                          const [year, quarter] = target.value.split("_");
                          setYearQuarter({
                            year: Number(year),
                            quarter: Number(quarter),
                          });
                        }}
                        className="custom-select form-control border-0 shadow-none pr-5 bgi-position-x-right"
                      >
                        {feedbackStatisticsData?.availableDates?.map(
                          ({ year, quarter }: any) => (
                            <option
                              key={`${year}_${quarter}`}
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
                  </h5>
                </div>
                <div className="pt-2">
                  <div className="overflow-x-auto pb-2 px-0 badge-scroll fs-scroll">
                    <div className="text-nowrap d-flex justify-content-between">
                      <div className="text-center px-2">
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
                  <Scroll
                    className="card card-custom gutter-t"
                    style={{ maxHeight: "25vh" }}
                  >
                    <DataValidationContainer
                      noDataView={
                        <div className="d-flex align-items-center justify-content-center min-h-150px font-size-lg">
                          피드백이 없습니다.
                        </div>
                      }
                    >
                      {feedbackListData?.map((feedback) => {
                        return (
                          <FeedListItem
                            key={feedback.id}
                            {...feedback}
                            feedType="modal"
                            onUpdate={() =>
                              getFeedbackData(
                                yearQuarter.year,
                                yearQuarter.quarter
                              )
                            }
                          />
                        );
                      })}
                    </DataValidationContainer>
                  </Scroll>
                </div>
                <div className="flex-nowrap align-items-center border-0 mt-12">
                  <h5 className="align-items-start flex-column">
                    <span className="font-weight-bolder text-dark">OKR</span>
                  </h5>
                </div>
                <div className="pt-2">
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
                        {`${yearQuarter.year}년 ${yearQuarter.quarter}분기 OKR Data가 없습니다.`}
                      </p>
                    </div>
                  ) : (
                    <OKRAccordion objectives={okrData?.objective} user={user} />
                  )}
                </div>
              </div>
            </Scroll>
            <div className="col-auto w-100px flex-grow-1 section-2 px-6">
              <Scroll style={{ maxHeight: "67vh" }}>
                <>
                  {!!peerData &&
                    [contribution, collaboration].map((type: any) => (
                      <div
                        key={type}
                        className={type === contribution ? undefined : "mt-5"}
                      >
                        <h5 className="card-title align-items-start flex-column font-weight-bolder">
                          {type === contribution ? "성과" : "협업"}
                        </h5>
                        <span className="d-block font-size-sm mt-3 word-keep">
                          {peerData[type]?.indexData?.question}
                        </span>
                        <div className="d-flex row-cols-6 mt-3">
                          {selectArray.map((select, i) => (
                            <div
                              // eslint-disable-next-line react/no-array-index-key
                              key={i}
                              className="d-flex flex-column align-items-center justify-content-end p-3"
                              onClick={() => changeData(type, { index: i + 1 })}
                            >
                              <span className="d-block font-size-sm text-dark-50 font-weight-bold text-uppercase text-center mb-3 word-keep">
                                {select}
                              </span>
                              <label className="radio radio-num">
                                <input
                                  type="radio"
                                  name={`${type}${i}`}
                                  disabled
                                  checked={
                                    i + 1 === peerData[type]?.indexData?.answer
                                  }
                                />
                                <span>{i + 1}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                        {!!peerData[type]?.answer && (
                          <>
                            <div className="d-flex flex-column mt-5 align-items-center justify-content-center">
                              <div className="d-flex flex-column border w-100px h-100px p-3 align-items-center">
                                <div className="d-flex border min-w-50px min-h-50px rounded-circle align-items-center justify-content-center">
                                  <span className="svg-icon svg-icon-primary svg-icon-2x mr-0">
                                    <SVG
                                      name={
                                        peerData[type]?.answer === Consider
                                          ? "consider"
                                          : "continue"
                                      }
                                    />
                                  </span>
                                </div>
                                <span className="d-block font-weight-bold mt-3">
                                  {peerData[type]?.answer}
                                </span>
                              </div>
                            </div>
                            {type === collaboration &&
                            peerData[type]?.answer === Consider ? (
                              <div className="mt-5">
                                <span className="d-block font-size-sm mt-3 word-keep">
                                  {peerData?.considerPoints?.question}
                                </span>
                                <div className="checkbox-list mt-5">
                                  {!!peerData?.considerPoints?.optionList &&
                                    peerData.considerPoints.optionList.map(
                                      ({ description, id: optionId }: any) => (
                                        <label
                                          key={optionId}
                                          className="checkbox"
                                        >
                                          <input
                                            type="checkbox"
                                            name="Checkboxes1"
                                            checked={
                                              peerData?.considerPoints
                                                ?.answer &&
                                              peerData.considerPoints.answer.includes(
                                                optionId
                                              )
                                            }
                                            onClick={() => {
                                              changeData(type, { optionId });
                                            }}
                                          />
                                          <span />
                                          {description}
                                        </label>
                                      )
                                    )}
                                  <label className="checkbox">
                                    <input
                                      type="checkbox"
                                      checked={isExtraComment}
                                      name="Checkboxes1"
                                      onClick={() => {
                                        if (!peerData?.submitted)
                                          setIsExtraComment(!isExtraComment);
                                      }}
                                    />
                                    <span />
                                    기타 의견
                                  </label>
                                </div>
                                {isExtraComment &&
                                  (peerData?.submitted ? (
                                    <div className="resize-none mt-3 mb-5">
                                      {peerData?.collaboration?.considerData
                                        ?.answer || "리뷰 데이터가 없습니다."}
                                    </div>
                                  ) : (
                                    <textarea
                                      className="form-control resize-none mt-3"
                                      placeholder="기타 의견을 작성해주세요."
                                      rows={6}
                                      value={
                                        peerData?.collaboration?.considerData
                                          ?.answer || ""
                                      }
                                      onChange={({ target }) =>
                                        changeData(type, { text: target.value })
                                      }
                                    />
                                  ))}
                              </div>
                            ) : (
                              <div className="mt-5">
                                <span className="d-block font-size-sm word-keep">
                                  {
                                    peerData[type][
                                      peerData[type]?.answer === Consider
                                        ? "considerData"
                                        : "continueData"
                                    ]?.question
                                  }
                                </span>
                                {peerData?.submitted ? (
                                  <div className="pl-2 mt-3">
                                    {peerData[type][
                                      peerData[type]?.answer === Consider
                                        ? "considerData"
                                        : "continueData"
                                    ].answer || ""}
                                  </div>
                                ) : (
                                  <textarea
                                    className="form-control resize-none mt-3"
                                    placeholder="Review를 작성해주세요."
                                    rows={6}
                                    value={
                                      peerData[type][
                                        peerData[type]?.answer === Consider
                                          ? "considerData"
                                          : "continueData"
                                      ].answer || ""
                                    }
                                    onChange={({ target }) =>
                                      changeData(type, { text: target.value })
                                    }
                                  />
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                </>
              </Scroll>
              {!peerData?.submitted && (
                <div className="d-flex align-items-center justify-content-center mt-12">
                  <button
                    type="button"
                    className={`btn btn-lg w-150px font-weight-bold mx-2 ${
                      isTemporary ? "btn-primary" : "btn-secondary"
                    }`}
                    onClick={() => isTemporary && update(false)}
                  >
                    임시저장
                  </button>
                  <button
                    type="button"
                    className={`btn btn-lg w-150px font-weight-bold mx-2 ${
                      isSubmit ? "btn-primary" : "btn-secondary"
                    }`}
                    data-toggle="modal"
                    data-target="#modal_workPreview"
                    onClick={() =>
                      isSubmit &&
                      showModal("confirm", {
                        onConfirm: () => update(true),
                        isCancel: true,
                        text: (
                          <>
                            제출 후 수정할 수 없습니다. <br /> 제출하시겠습니까?
                          </>
                        ),
                      })
                    }
                  >
                    제출하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </Scroll>
      </div>
    </Modal>
  );
}
