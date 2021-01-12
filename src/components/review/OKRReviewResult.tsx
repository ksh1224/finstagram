import { useReviewMain } from "hooks/useReview";
import React, { useEffect, useState } from "react";
import { enterLine, tagUtil } from "utils/stringUtil";

export default function OKRReviewResult() {
  const { data = {} } = useReviewMain();
  const { okr, reviewData, evaluationData } = data?.result?.okr || {};
  const [selfOkrData, setSelfOkrData] = useState<any[]>();

  useEffect(() => {
    const newArr: any[] = [];
    if (okr?.objective) {
      okr.objective.forEach((okrObj: any) => {
        if (okrObj.status === "CANCEL") return;
        const newInnerArr: any[] = [];
        reviewData.forEach((obj: any) => {
          if (okrObj.id === obj.objective.id) newInnerArr.push(obj);
        });
        newArr.push(newInnerArr);
      });
      setSelfOkrData(newArr);
    }
  }, [data]);

  return (
    <div className="mb-30 tab-group">
      <h3 className="d-flex h-40px font-weight-bolder align-items-center mb-0">
        OKR Review 결과
      </h3>
      <div className="mt-10">
        <div className="font-weight-bolder text-dark font-size-lg">
          조직장 Review
        </div>
        <div className="card bg-light-light text-dark-75 mt-4 line-height-xl">
          <div className="card-body p-6 word-keep">
            {evaluationData && evaluationData[0]
              ? evaluationData[0].answer
              : "리뷰 데이터가 없습니다."}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="font-weight-bolder text-dark font-size-lg">
          자기 Review
        </div>
        <div
          className="my-review-accordion accordion accordion-toggle-arrow"
          id="accordionObjective"
        >
          {selfOkrData &&
            selfOkrData.map((qnas: any[], index) => {
              return (
                <div className="pt-8">
                  <div className="mb-4">
                    <div className="d-inline-block bg-primary btn-sm text-white">
                      Objective {index + 1}
                    </div>
                  </div>
                  <div
                    id="collapseObjective1"
                    className="collapse show"
                    data-parent="#accordionObjective"
                  >
                    {qnas &&
                      qnas.map(
                        (
                          {
                            type,
                            question,
                            answer,
                            optionList,
                            answerByText,
                          }: any,
                          qnaIndex
                        ) => {
                          const arr: JSX.Element[] = [];
                          switch (type) {
                            case "MULTIPLE_CHOICE_TEXT":
                              answer.forEach((id: any) => {
                                const selectOption = optionList.find(
                                  (option: any) => option.id === id
                                );
                                arr.push(
                                  <>
                                    -{tagUtil(selectOption.description, "sm")}
                                    <br />
                                  </>
                                );
                              });
                              if (
                                typeof answerByText === "string" &&
                                answerByText.trim() !== ""
                              )
                                arr.push(
                                  <>
                                    -{answer}
                                    <br />
                                  </>
                                );
                              break;
                            case "MULTIPLE_CHOICE":
                              answer.forEach((id: any) => {
                                const selectOption = optionList.find(
                                  (option: any) => option.id === id
                                );
                                arr.push(
                                  <>
                                    -{tagUtil(selectOption.description, "sm")}
                                    <br />
                                  </>
                                );
                              });
                              break;
                            case "TEXT":
                              arr.push(
                                <>
                                  -{answer}
                                  <br />
                                </>
                              );
                              break;

                            default:
                              break;
                          }
                          return (
                            <div className="pt-4">
                              <div className="font-weight-bolder">
                                {1 + qnaIndex}.{tagUtil(question, "sm")}
                              </div>
                              <div className="card bg-light-light text-dark-75 mt-4 line-height-xl">
                                <div className="card-body p-6 word-keep">
                                  {arr}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>
                  {/* <div
              className="btn btn-spread bg-secondary btn-sm text-center w-100"
              data-toggle="collapse"
              data-target="#collapseObjective1"
            /> */}
                </div>
              );
            })}

          {/*  */}
        </div>
      </div>
    </div>
  );
}
