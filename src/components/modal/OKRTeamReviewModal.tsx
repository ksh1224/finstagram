/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable default-case */
import { Modal } from "react-bootstrap";
import { useModal } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import axios from "utils/axiosUtil";
import Scroll from "components/Scroll";
import { useReviewOKRList } from "hooks/useReview";
import { tagUtil } from "utils/stringUtil";
import Profile from "components/Profile";

export default function OKRTeamReviewModal() {
  const { modals, closeModal, showModal } = useModal();
  const { request } = useReviewOKRList();
  const [isTemporary, setIsTemporary] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [teamOKRData, setTeamOKRData] = useState<any>(null);
  const [reviewData, setReviewData] = useState<any[]>([]);
  const [text, setText] = useState("");

  const okrTeamReviewModal = modals.find(
    (modal) => modal.name === "okrTeamReview"
  );

  const { meta, user, finished } = okrTeamReviewModal?.param || {};
  const { year, quarter, id } = meta || {};

  function close() {
    closeModal("okrTeamReview");
    setTimeout(() => {
      setTeamOKRData(null);
      setReviewData([]);
      setText("");
    }, 300);
  }

  const getData = async () => {
    try {
      const { data } = await axios(
        `/review/okr/reviewData?userId=${user.id}&metaId=${id}`,
        "GET"
      );
      setTeamOKRData(data);
      const newArr: any[] = [];
      data.okr.objective.forEach((okrObj: any) => {
        if (okrObj.status === "CANCEL") return;
        const newInnerArr: any[] = [];
        data.reviewData.forEach((obj: any) => {
          if (okrObj.id === obj.objective.id) newInnerArr.push(obj);
        });
        newArr.push(newInnerArr);
      });
      setReviewData(newArr);
      if (
        data?.evaluationData &&
        data?.evaluationData[0].answer &&
        data?.evaluationData[0].answer.trim() !== ""
      ) {
        setText(data.evaluationData[0].answer);
      } else setText("");
    } catch (error) {
      console.log("error", error);
    }
  };

  const update = async (submit: boolean) => {
    try {
      const newData = {
        ...teamOKRData,
        evaluationData: [{ ...teamOKRData?.evaluationData[0], answer: text }],
      };
      const res = await axios(
        `/review/okr/submit/evaluation?submit=${submit}&metaId=${id}`,
        "POST",
        JSON.stringify(newData)
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
    if (okrTeamReviewModal) {
      getData();
    }
  }, [okrTeamReviewModal]);

  useEffect(() => {
    let submit = true;
    let temporary = true;
    if (text.trim() === "") {
      submit = false;
      temporary = false;
    } else if (
      teamOKRData?.evaluationData &&
      teamOKRData?.evaluationData[0].answer &&
      teamOKRData?.evaluationData[0].answer === text
    ) {
      temporary = false;
    }
    setIsTemporary(temporary);
    setIsSubmit(submit);
  }, [text]);

  return (
    <Modal
      size="xl"
      show={!!okrTeamReviewModal && !!teamOKRData}
      animation
      centered
      onHide={() => close()}
      id="modal_OKRReview"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="d-flex modal-title align-items-center">
            <Profile width={50} user={teamOKRData?.user} />
            <div className="ml-3">{teamOKRData?.user?.name}님 OKR Review</div>
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
              style={{ maxHeight: "80vh" }}
            >
              <Scroll style={{ maxHeight: "70vh" }}>
                <div className="flex-nowrap align-items-center border-0">
                  <h5 className="card-title align-items-start flex-column">
                    <span className="font-weight-bolder text-dark">
                      자기 Review
                    </span>
                  </h5>
                </div>
                <div className="gutter-b font-size-h5 font-weight-bold text-center">
                  <ul
                    className="d-block header-tabs nav flex-row text-nowrap h-100 overflow-auto flex-nowrap text-left mt-7 mx-0"
                    role="tablist"
                  >
                    {reviewData.map((obj: any, objectiveIndex) => (
                      <li
                        key={`objective_${objectiveIndex}`}
                        className="d-inline-block mr-3"
                      >
                        <button
                          type="button"
                          className={`btn btn-sm ${
                            objectiveIndex === 0 ? "active" : ""
                          }`}
                          data-toggle="tab"
                          data-target={`#okr_review_tab1${objectiveIndex}`}
                          role="tab"
                        >
                          Objective {objectiveIndex + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tab-content">
                  {reviewData.map((objectiveData, objectiveIndex) => (
                    <div
                      className={`tab-pane show ${
                        objectiveIndex === 0 ? "active" : ""
                      }`}
                      id={`okr_review_tab1${objectiveIndex}`}
                      key={`tab_${objectiveIndex}`}
                    >
                      {objectiveData.map((qna: any, qnaIndex: number) => {
                        let optionView = <></>;
                        let textView = <></>;

                        if (
                          qna?.type === "MULTIPLE_CHOICE_TEXT" ||
                          qna?.type === "MULTIPLE_CHOICE"
                        ) {
                          optionView = (
                            <div className="checkbox-list mt-5">
                              {qna.optionList.map((option: any) => {
                                const { description, id: optionId } = option;
                                return (
                                  <label key={optionId} className="checkbox">
                                    <input
                                      type="checkbox"
                                      disabled
                                      checked={qna.answer.includes(optionId)}
                                    />
                                    <span />
                                    {tagUtil(description, "sm")}
                                  </label>
                                );
                              })}
                            </div>
                          );
                        }
                        if (
                          qna?.type === "MULTIPLE_CHOICE_TEXT" ||
                          qna?.type === "TEXT"
                        ) {
                          textView = (
                            qna?.type === "MULTIPLE_CHOICE_TEXT"
                              ? qna?.answerByText
                              : qna?.answer
                          ) ? (
                            <div className="mt-3">
                              {qna?.type === "MULTIPLE_CHOICE_TEXT"
                                ? `기타의견: ${qna?.answerByText}`
                                : qna?.answer}
                            </div>
                          ) : (
                            <div className="pl-2 mt-3">
                              {qna?.type === "MULTIPLE_CHOICE_TEXT"
                                ? ""
                                : "리뷰가 없습니다."}
                            </div>
                          );
                        }

                        return (
                          <div className="mb-12">
                            <div className="font-size-lg font-weight-bolder word-keep">
                              {2 + qnaIndex}.{" "}
                              {tagUtil(
                                qna?.question.replace(
                                  "Objective",
                                  `Objective${1 + objectiveIndex}`
                                ),
                                "sm"
                              )}
                            </div>
                            {optionView}
                            {textView}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </Scroll>
            </Scroll>
            <div className="col-auto w-100px flex-grow-1 modal-tabs section-2">
              <div className="flex-nowrap align-items-center border-0">
                <h5 className="card-title align-items-start flex-column">
                  <span className="font-weight-bolder text-dark">
                    조직장 Review
                  </span>
                </h5>
              </div>
              <div className="text-muted mt-4 word-keep">
                아래 기재하시는 내용은 개인에게 Feedback됩니다.
              </div>
              <div className="mt-7">
                <div className="font-size-lg font-weight-bolder word-keep">
                  오선영님의 분기 OKR 추진 결과에 대한 의견을 기재해 주시기
                  바랍니다.
                </div>
                {finished ? (
                  <div className="pl-2 mt-3">{text}</div>
                ) : (
                  <>
                    <textarea
                      className="form-control resize-none mt-4"
                      placeholder="Review를 작서해주세요."
                      rows={12}
                      value={text}
                      onChange={({ target }) => setText(target.value)}
                    />
                    <div className="font-size-sm text-muted mt-4">
                      이번 분기에 특별하게 잘했다고 생각되거나 혹은 다른
                      방법으로 실행해볼 필요가 있었던 점을 기재해주세요.
                    </div>
                  </>
                )}
              </div>
              {finished ? (
                <></>
              ) : (
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
