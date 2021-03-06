/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable default-case */
import { Modal } from "react-bootstrap";
import { useAuth, useModal } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import axios from "utils/axiosUtil";
import OKRGraph from "components/okr/OKRGraph";
import OKRAccordion from "components/okr/OKRAccordion";
import Scroll from "components/Scroll";
import { useReviewMain } from "hooks/useReview";
import { tagUtil } from "utils/stringUtil";
import OKRWrite from "components/okr/OKRWrite";

const Options = ({
  qna,
  qnaIndex,
  finished,
  changeData,
  objectiveIndex,
}: {
  qna: any;
  qnaIndex: number;
  finished: any;
  changeData: any;
  objectiveIndex: any;
}) => {
  let optionView = <></>;
  let textView = <></>;
  const [etc, setEtc] = useState(false);

  useEffect(() => {
    if (qna?.answerByText) setEtc(true);
  }, []);
  useEffect(() => {
    if (!etc && qna?.type === "MULTIPLE_CHOICE_TEXT")
      changeData(objectiveIndex, qna.questionId, qna.type, "");
  }, [etc]);

  if (qna?.type === "MULTIPLE_CHOICE_TEXT" || qna?.type === "MULTIPLE_CHOICE") {
    optionView = (
      <div className="checkbox-list mt-5">
        {qna.optionList.map((option: any) => {
          const { description, id: optionId } = option;
          return (
            <label
              key={optionId}
              className="checkbox"
              onClick={() =>
                !finished &&
                changeData(objectiveIndex, qna.questionId, qna.type, optionId)
              }
            >
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
        {!finished && qna?.type === "MULTIPLE_CHOICE_TEXT" ? (
          <label
            key={qnaIndex}
            className="checkbox"
            onClick={() => setEtc(!etc)}
          >
            <input type="checkbox" disabled checked={etc} />
            <span />
            기타의견
          </label>
        ) : (
          <></>
        )}
      </div>
    );
  }
  if (qna?.type === "MULTIPLE_CHOICE_TEXT" || qna?.type === "TEXT") {
    textView = finished ? (
      (
        qna?.type === "MULTIPLE_CHOICE_TEXT" ? qna?.answerByText : qna?.answer
      ) ? (
        <div className="mt-3">
          {qna?.type === "MULTIPLE_CHOICE_TEXT"
            ? `기타의견: ${qna?.answerByText}`
            : qna?.answer}
        </div>
      ) : (
        <div className="pl-2 mt-3">
          {qna?.type === "MULTIPLE_CHOICE_TEXT" ? "" : "리뷰가 없습니다."}
        </div>
      )
    ) : qna?.type !== "MULTIPLE_CHOICE_TEXT" || etc ? (
      <textarea
        className="form-control resize-none mt-3"
        placeholder={
          qna?.type === "MULTIPLE_CHOICE_TEXT"
            ? "기타의견을 작성해주세요."
            : "Review를 작성해주세요"
        }
        rows={6}
        value={
          qna?.type === "MULTIPLE_CHOICE_TEXT" ? qna?.answerByText : qna?.answer
        }
        onChange={({ target }) =>
          changeData(objectiveIndex, qna.questionId, qna.type, target.value)
        }
      />
    ) : (
      <></>
    );
  }

  return (
    <div className="mb-12">
      <div className="font-size-lg font-weight-bolder word-keep">
        {(finished ? 1 : 2) + qnaIndex}.{" "}
        {tagUtil(
          qna?.question.replace("Objective", `Objective${1 + objectiveIndex}`),
          "sm"
        )}
      </div>
      {optionView}
      {textView}
    </div>
  );
};

export default function OKRSelfReviewModal() {
  const { modals, closeModal, showModal } = useModal();
  const { request } = useReviewMain();
  const { user: my } = useAuth();
  const [isTemporary, setIsTemporary] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [show, setShow] = useState<any>();
  const [selfOKRData, setSelfData] = useState<any>({});
  const [reviewData, setReviewData] = useState<any[]>([]);
  const [prevReviewData, setPrevReviewData] = useState<any[]>([]);
  const [updateId, setUpdateId] = useState<number | null>(null);

  const okrSelfReviewModal = modals.find(
    (modal) => modal.name === "okrSelfReview"
  );

  const { meta, finished } = okrSelfReviewModal?.param || {};
  const { year, quarter, id } = meta || {};

  function close() {
    closeModal("okrSelfReview");
    setTimeout(() => {
      setSelfData({});
      setReviewData([]);
      setPrevReviewData([]);
    }, 500);
  }

  const getData = async () => {
    await setShow(false);
    try {
      const { data } = await axios(
        `/review/okr/reviewData/?metaId=${id}`,
        "GET"
      );
      setSelfData(data);
      const newArr: any[] = [];
      data.okr.objective.forEach((okrObj: any) => {
        if (okrObj.status === "CANCEL") return;
        const newInnerArr: any[] = [];
        data.reviewData.forEach((obj: any) => {
          if (okrObj.id === obj.objective.id) newInnerArr.push(obj);
        });
        newArr.push(newInnerArr);
      });
      setPrevReviewData(newArr);
      setReviewData(newArr);
      setShow(true);
    } catch (error) {
      close();
      console.log("error", error);
    }
  };

  const update = async (submit: boolean) => {
    try {
      let newArr: any[] = [];
      reviewData.forEach((arr: any) => {
        newArr = [...newArr, ...arr];
      });
      const newData = { ...selfOKRData, reviewData: newArr };
      const res = await axios(
        `/review/okr/submit/okr?submit=${submit}&metaId=${id}`,
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

  const changeData = (
    objectiveIndex: number,
    questionId: number,
    type: string,
    contents: string | number
  ) => {
    const newData: any[] = JSON.parse(JSON.stringify(reviewData));
    setReviewData(
      newData.map((objArr: any[], i) => {
        if (objectiveIndex === i) {
          return objArr.map((qna: any) => {
            if (qna.questionId === questionId) {
              switch (type) {
                case "MULTIPLE_CHOICE_TEXT":
                  if (typeof contents === "string")
                    return { ...qna, answerByText: contents };
                  return {
                    ...qna,
                    answer: qna.answer.includes(contents) ? [] : [contents],
                  };
                case "MULTIPLE_CHOICE":
                  return {
                    ...qna,
                    answer: qna.answer.includes(contents) ? [] : [contents],
                  };
                case "TEXT":
                  return { ...qna, answer: contents };
                default:
                  return qna;
              }
            }
            return qna;
          });
        }
        return objArr;
      })
    );
  };

  useEffect(() => {
    if (okrSelfReviewModal) {
      getData();
    }
  }, [okrSelfReviewModal]);

  useEffect(() => {
    let submit = true;
    let temporary = 0;
    let total = 0;
    reviewData.forEach((objArr: any[]) => {
      objArr.forEach((qna: any) => {
        total += 1;
        if (qna?.answer) {
          if (
            typeof qna?.answer === "string"
              ? qna.answer.trim() === ""
              : qna.answer.length === 0
          ) {
            submit = false;
            if (
              qna.type !== "MULTIPLE_CHOICE_TEXT" ||
              !qna.answerByText ||
              qna.answerByText.trim() === ""
            )
              temporary += 1;
          }
        } else {
          submit = false;
          if (
            qna.type !== "MULTIPLE_CHOICE_TEXT" ||
            !qna.answerByText ||
            qna.answerByText.trim() === ""
          )
            temporary += 1;
        }
      });
    });
    setIsSubmit(submit);
    setIsTemporary(
      JSON.stringify(prevReviewData) !== JSON.stringify(reviewData) &&
        total !== temporary
    );
  }, [reviewData, prevReviewData]);

  const { okr: okrData } = selfOKRData || {};

  return (
    <Modal
      size="xl"
      show={!!okrSelfReviewModal && !!reviewData[0]}
      animation
      centered
      onHide={() => close()}
      id="modal_OKRReview"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">자기 OKR Review</h2>
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
        <Scroll
          className="modal-body"
          style={updateId ? { height: "90vh" } : { maxHeight: "90vh" }}
        >
          {!updateId ? (
            <div className="d-flex flex-row flex-wrap align-items-stretch">
              <Scroll
                className="d-flex flex-column col-auto w-100px flex-grow-1 section-1 px-6"
                style={{ maxHeight: "78vh" }}
              >
                <div className="flex-nowrap align-items-center border-0">
                  <h5 className="card-title align-items-start flex-column">
                    <span className="font-weight-bolder text-dark">
                      My OKR 현황
                    </span>
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
              </Scroll>
              <div className="col-auto w-100px flex-grow-1 section-2 px-6">
                <Scroll style={{ maxHeight: "66vh" }}>
                  <h5 className="card-title align-items-start flex-column font-weight-bolder word-keep">
                    Review
                  </h5>
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
                        {!finished ? (
                          <div className="mb-12">
                            <div className="font-size-lg font-weight-bolder word-keep">
                              1. Objective {1 + objectiveIndex}의 최종 Score를
                              Update 해주세요.
                            </div>
                            <p className="d-block font-size-sm mt-3">
                              <button
                                type="button"
                                className="btn btn-primary mx-2"
                                data-toggle="tab"
                                onClick={() =>
                                  okrData?.objective &&
                                  okrData.objective[objectiveIndex] &&
                                  setUpdateId(
                                    okrData.objective[objectiveIndex].id
                                  )
                                }
                              >
                                Score Update 하러가기
                              </button>
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                        {objectiveData.map((qna: any, qnaIndex: number) => (
                          <Options
                            qna={qna}
                            qnaIndex={qnaIndex}
                            finished={finished}
                            changeData={changeData}
                            objectiveIndex={objectiveIndex}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </Scroll>
                {!finished && (
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
                              제출 후 수정할 수 없습니다. <br />
                              제출하시겠습니까?
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
          ) : (
            <OKRWrite
              type="update"
              show
              close={() => {
                setUpdateId(null);
                getData();
              }}
              updateOKRId={updateId}
              year={year}
              quarter={quarter}
            />
          )}
        </Scroll>
      </div>
    </Modal>
  );
}
