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

export default function SelfReviewModal() {
  const { modals, closeModal } = useModal();
  const { user: my } = useAuth();
  const { request } = useReviewMain();
  const [isTemporary, setIsTemporary] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [show, setShow] = useState<any>();
  const [okrData, setOKRData] = useState<any>();
  const [feedbackBadge, setFeedbackBadge] = useState<any>([]);
  const [selectBadgeId, setSelectBadgeId] = useState(-1);
  const [feedbackListData, setFeedbackListData] = useState<any[]>([]);
  const [selfData, setSelfData] = useState<any>({});
  const [text, setText] = useState(["", "", ""]);

  const selfReviewModal = modals.find((modal) => modal.name === "selfReview");

  const { year, quarter, id } = selfReviewModal?.param || {};

  function close() {
    closeModal("selfReview");
    setText(["", "", ""]);
  }

  const getBadgeList = async () => {
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

  const getFeedbackData = async () => {
    try {
      if (year && quarter) {
        const { data: feedbackBadgeData } = await axios(
          `/feedbacks/badge/count?user_id=${my.id}${
            year && quarter ? `&year=${year}&quarter=${quarter}` : ""
          }`,
          "GET"
        );
        setFeedbackBadge(feedbackBadgeData?.CONTRIBUTION);
        getBadgeList();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getOKRData = async () => {
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
        const replace = data.reviewData[0].answer
          .replace(/\n/gm, "&enter&")
          .replace(/\./gm, "&dot&")
          .replace(/(&enter&){0,2}([1-3]&dot&)/g, "\n");
        const split = replace.split(/\n/gm).map((string: string) => {
          const aa = string.replace(/&enter&/gm, "\n").replace(/&dot&/gm, ".");
          return aa;
        });
        setText([split[1], split[2], split[3]]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getSubmitted = async () => {
    try {
      const { data: isSubmitted } = await axios(
        `/review/self/isSubmitted?metaId=${id}`,
        "GET"
      );
      if (isSubmitted) close();
    } catch (error) {
      console.log("error", error);
    }
  };

  const update = async (submit: boolean) => {
    try {
      const data = selfData;
      data.reviewData[0].answer = `1. ${text[0]}\n\n2. ${text[1]}\n\n3. ${text[2]}`;
      const res = await axios(
        `/review/self/submit?submit=${submit}&metaId=${id}`,
        "POST",
        JSON.stringify(data)
      );
      if (res.responseCode === "SUCCESS") {
        request(id);
        close();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (selfReviewModal) {
      getSubmitted();
      getFeedbackData();
      getOKRData();
      getData();
    }
  }, [selfReviewModal]);

  useEffect(() => {
    if (my) {
      getBadgeList();
    }
  }, [selectBadgeId]);

  useEffect(() => {
    if (selfData?.reviewData) {
      if (
        !text[0] ||
        text[0].trim() === "" ||
        !text[1] ||
        text[1].trim() === "" ||
        !text[2] ||
        text[2].trim() === ""
      )
        setIsSubmit(false);
      else setIsSubmit(true);
      if (!selfData.reviewData[0].answer) {
        if (
          text[0].trim() !== "" ||
          text[1].trim() !== "" ||
          text[2].trim() !== ""
        )
          setIsTemporary(true);
        else setIsTemporary(false);
      } else {
        const split = selfData.reviewData[0].answer.match(
          /[^(1. )(\n\n2. )(\n\n3. )]+/gm
        );
        if (
          !(
            text[0] === split[0] &&
            text[1] === split[1] &&
            text[2] === split[2]
          ) &&
          (text[0].trim() !== "" ||
            text[1].trim() !== "" ||
            text[2].trim() !== "")
        )
          setIsTemporary(true);
        else setIsTemporary(false);
      }
    }
  }, [text]);

  return (
    <Modal
      size="xl"
      show={!!selfReviewModal}
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
              style={{ maxHeight: "80vh" }}
            >
              <div className="d-flex flex-column  px-6">
                <div className="flex-nowrap align-items-center border-0">
                  <h5 className="align-items-start flex-column">
                    <span className="font-weight-bolder text-dark">
                      Feedback
                    </span>
                  </h5>
                </div>
                <div className="pt-2">
                  <div className="text-nowrap d-flex justify-content-between mx-n2">
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
                    {feedbackBadge &&
                      feedbackBadge?.badgeList?.map((data: any) => (
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
                      ))}
                  </div>
                  <Scroll
                    className="card card-custom gutter-t"
                    style={{ maxHeight: "25vh" }}
                  >
                    {feedbackListData &&
                      feedbackListData.map((feedback) => {
                        return (
                          <FeedListItem
                            key={feedback.id}
                            {...feedback}
                            feedType="modal"
                            onUpdate={() => getFeedbackData()}
                          />
                        );
                      })}
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
                        {`${year}년 ${quarter}분기 OKR Data가 없습니다.`}
                      </p>
                    </div>
                  ) : (
                    <OKRAccordion objectives={okrData?.objective} user={my} />
                  )}
                </div>
              </div>
            </Scroll>
            <Scroll
              className="col-auto w-100px flex-grow-1 section-2 px-6"
              style={{ maxHeight: "80vh" }}
            >
              <h5 className="align-items-start flex-column font-weight-bolder word-keep">
                {selfData?.reviewData && selfData.reviewData[0].question}
              </h5>
              <ol className="pl-4 mt-4 mb-0 font-size-sm text-black-50">
                <li className="mt-1">
                  팀에 대한 기여도가 높은 성과, 달성하기 어려운 도전적 성과 등을
                  우선 기재해 주시기 바랍니다.
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
              <textarea
                className="form-control resize-none mt-6"
                placeholder="1. 본인의 핵심 성과 내용"
                rows={6}
                value={text[0]}
                onChange={({ target }) =>
                  setText([target.value, text[1], text[2]])
                }
              />
              <textarea
                className="form-control resize-none mt-6"
                placeholder="2. 본인의 핵심 성과 내용"
                rows={6}
                value={text[1]}
                onChange={({ target }) =>
                  setText([text[0], target.value, text[2]])
                }
              />
              <textarea
                className="form-control resize-none mt-6"
                placeholder="3. 본인의 핵심 성과 내용"
                rows={6}
                value={text[2]}
                onChange={({ target }) =>
                  setText([text[0], text[1], target.value])
                }
              />
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
                  onClick={() => isSubmit && update(true)}
                >
                  제출하기
                </button>
              </div>
            </Scroll>
          </div>
        </Scroll>
      </div>
    </Modal>
  );
}
