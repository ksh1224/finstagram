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
import { useMyFeedback } from "hooks/useFeedBackRedux";
import DataValidationContainer from "layouts/DataValidationContainer";

export default function SelfReviewModal() {
  const { modals, closeModal, showModal } = useModal();
  const { user: my } = useAuth();
  const { request } = useReviewMain();
  const [isTemporary, setIsTemporary] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [show, setShow] = useState<any>();
  const [okrData, setOKRData] = useState<any>();
  const [feedbackBadge, setFeedbackBadge] = useState<any>(null);
  const [selectBadgeId, setSelectBadgeId] = useState(-1);
  const [feedbackListData, setFeedbackListData] = useState<any[]>([]);
  const [selfData, setSelfData] = useState<any>({});
  const [textArr, setTextArr] = useState(["", "", ""]);
  const [yearQuarter, setYearQuarter] = useState({ year: 0, quarter: 0 });
  const { feedbackStatisticsData, feedbackStatisticsRequest } = useMyFeedback();

  const selfReviewModal = modals.find((modal) => modal.name === "selfReview");

  const { meta, period } = selfReviewModal?.param || {};

  const { year: paramYear, quarter: paramQuarter, id } = meta || {};

  function close() {
    setYearQuarter({ year: 0, quarter: 0 });
    setFeedbackBadge(null);
    closeModal("selfReview");
    setTextArr(["", "", ""]);
  }

  const getBadgeList = async (year: number, quarter: number) => {
    if (year && quarter) {
      try {
        const { data } = await axios(
          `/feedbacks/received/list?user_id=${my.id}${
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
          `/feedbacks/badge/count?user_id=${my.id}${
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
          `/okr/chart/${my.id}${
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
        `/review/self/reviewData?metaId=${id}`,
        "GET"
      );
      setSelfData(data);

      if (data?.reviewData && data.reviewData[0].answer) {
        setTextArr(data.reviewData[0].answer.split("<split/>"));
        // const replace = data.reviewData[0].answer
        //   .replace(/\n/gm, "&enter&")
        //   .replace(/\./gm, "&dot&")
        //   .replace(/(&enter&){0,2}([1-3]&dot&)/g, "\n");
        // const split = replace.split(/\n/gm).map((string: string) => {
        //   const aa = string.replace(/&enter&/gm, "\n").replace(/&dot&/gm, ".");
        //   return aa;
        // });
        // setText([split[1], split[2], split[3]]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getSubmitted = async () => {
    try {
      const { data: submitted } = await axios(
        `/review/self/isSubmitted?metaId=${id}`,
        "GET"
      );
      setIsSubmitted(submitted || period === "END");
    } catch (error) {
      console.log("error", error);
    }
  };

  const update = async (submit: boolean) => {
    try {
      const data = selfData;
      data.reviewData[0].answer = textArr.join("<split/>");
      const res = await axios(
        `/review/self/submit?submit=${submit}&metaId=${id}`,
        "POST",
        JSON.stringify(data)
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
    if (selfReviewModal) {
      getSubmitted();
      feedbackStatisticsRequest(paramYear, paramQuarter);
      setYearQuarter({ year: paramYear, quarter: paramQuarter });
      getData();
    }
  }, [selfReviewModal]);

  useEffect(() => {
    const { year, quarter } = yearQuarter;
    getFeedbackData(year, quarter);
    getOKRData(year, quarter);
  }, [yearQuarter]);

  useEffect(() => {
    const { year, quarter } = yearQuarter;
    if (my && year && quarter) {
      getBadgeList(year, quarter);
    }
  }, [selectBadgeId]);

  useEffect(() => {
    let submit = true;
    let temporary = true;
    let count = 0;
    textArr.forEach((text) => {
      if (text.trim() === "") {
        submit = false;
        count += 1;
      }
    });
    if (count === textArr.length) temporary = false;
    if (selfData?.reviewData && selfData.reviewData[0].answer) {
      if (
        JSON.stringify(selfData.reviewData[0].answer.split("<split/>")) ===
        JSON.stringify(textArr)
      )
        temporary = false;
    }
    setIsSubmit(submit);
    setIsTemporary(temporary);
  }, [textArr]);

  return (
    <Modal
      size="xl"
      show={!!selfReviewModal && !!feedbackBadge}
      animation
      centered
      onHide={() => close()}
      id="modal_workReview"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">자기 성과 Review</h2>
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
              style={{ maxHeight: "74vh" }}
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
                        <div className="mt-4 font-size-sm text-dark-50 font-weight-bold text-truncate">
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
                            <div className="mt-4 font-size-sm text-dark-50 font-weight-bold text-truncate">
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
                    <OKRAccordion objectives={okrData?.objective} user={my} />
                  )}
                </div>
              </div>
            </Scroll>
            <div className="col-auto w-100px flex-grow-1 section-2 px-6">
              <Scroll style={{ maxHeight: "62vh" }}>
                <h5 className="align-items-start flex-column font-weight-bolder word-keep">
                  {selfData?.reviewData && selfData.reviewData[0].question}
                </h5>
                <ol className="pl-4 mt-4 mb-0 font-size-sm text-black-50">
                  <li className="mt-1">
                    팀에 대한 기여도가 높은 성과, 달성하기 어려운 도전적 성과
                    등을 우선 기재해 주시기 바랍니다.
                  </li>
                  <li className="mt-1">
                    가능하시면, 성과 수준을 판단할 수 있는 근거를 함께 기재해
                    주시기 바랍니다. (예: 전년 대비 성장률, 기존 방식 대비 개선
                    내용 등)
                  </li>
                  <li className="mt-1">
                    필요 시 본인 OKR 등을 확인하고 작성해 주십시오.
                  </li>
                  <li className="mt-1">5개 이내로 작성해 주십시오.</li>
                </ol>
                <>
                  {textArr.map((text, index) =>
                    isSubmitted ? (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={index} className="pl-2 mt-3" style={{whiteSpace:"pre-wrap"}}>
                        {index + 1}. {text}
                      </div>
                    ) : (
                      <textarea
                        className="form-control resize-none mt-6"
                        placeholder={`${index + 1}. 본인의 핵심 성과 내용`}
                        rows={6}
                        value={text}
                        onChange={({ target }) =>
                          setTextArr([
                            ...textArr.slice(0, index),
                            target.value,
                            ...textArr.slice(index + 1),
                          ])
                        }
                      />
                    )
                  )}
                </>
                {!isSubmitted ? (
                  <div className="text-center mt-6">
                    {textArr.length > 1 && (
                      <a
                        className="svg-icon svg-icon-danger svg-icon-xxl "
                        onClick={() =>
                          setTextArr([...textArr.slice(0, textArr.length - 1)])
                        }
                      >
                        <SVG name="bigMinus" />
                      </a>
                    )}
                    {textArr.length < 10 && (
                      <a
                        className="svg-icon svg-icon-primary svg-icon-xxl"
                        onClick={() => setTextArr([...textArr, ""])}
                      >
                        <SVG name="bigPlus" />
                      </a>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </Scroll>
              {!isSubmitted ? (
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
              ) : (
                <></>
              )}
            </div>
          </div>
        </Scroll>
      </div>
    </Modal>
  );
}
