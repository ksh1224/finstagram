import { useReviewMain } from "hooks/useReview";
import React, { createRef, useEffect, useState } from "react";
import { enterLine } from "utils/stringUtil";
import { Chart } from "chart.js";
import "chartjs-plugin-datalabels";

const barConfig = (
  myScorePercentage?: number,
  averageScorePercentage?: number
): any => {
  const data = {
    labels: ["My Score", "사업부 평균"],
    datasets: [
      {
        backgroundColor: ["#1bc5bd", "#ffa800"],
        borderColor: ["#1bc5bd", "#ffa800"],
        data: [myScorePercentage, averageScorePercentage],
        borderWidth: 1,
      },
    ],
  };

  return {
    type: "horizontalBar",
    data,
    options: {
      layout: {
        padding: {
          right: 30,
        },
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            display: false,
            ticks: {
              beginAtZero: true,
              min: 0,
              mirror: true,
            },
          },
        ],
      },
      tooltips: {
        enabled: false,
      },
      plugins: {
        datalabels: {
          anchor: "end",
          align: "end",
          formatter(value: any) {
            return `${value}%`;
          },
        },
      },
    },
  };
};

export default function LeaderReviewResult() {
  const { data = {} } = useReviewMain();
  const {
    averageScorePercentage,
    averageScoreTotalAverage,
    myScorePercentage,
    myScoreTotalAverage,
    considerComments,
    continueComments,
    scores,
  } = data?.result?.leadership || {};
  const barRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    if (
      barRef.current &&
      typeof myScorePercentage === "number" &&
      typeof averageScorePercentage === "number"
    ) {
      const bar = new Chart(
        barRef.current,
        barConfig(myScorePercentage, averageScorePercentage)
      );
    }
  }, [data]);

  return (
    <div className="mb-30 tab-group">
      <h3 className="d-flex h-40px font-weight-bolder align-items-center mb-0">
        리더 Review 결과
      </h3>
      <div className="">
        <div className="mt-10">
          <div className="font-weight-bolder text-dark font-size-lg">
            Overall Score(긍정 응답률)
          </div>
          <div className="position-relative mt-4">
            <canvas ref={barRef} className="max-w-600px" height="50px" />
            <div
              className="chart-sub-value"
              style={{ width: "calc(100% - 200px)" }}
            >
              <span
                className={`d-flex align-items-center mt-2 ${
                  averageScorePercentage <= 50
                    ? "position-relative left-50 mb-2 text-dark"
                    : ""
                }`}
              >
                평균 5점
              </span>
              <span
                className={`d-flex align-items-center mt-2 ${
                  averageScoreTotalAverage <= 50
                    ? "position-relative left-50 mb-2 text-dark"
                    : ""
                }`}
              >
                평균 {averageScoreTotalAverage}점
              </span>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="font-weight-bolder text-dark font-size-lg">
            문항 별 결과(긍정응답률)
          </div>
          <div className="card bg-light-light text-dark-75 mt-4">
            <div className="card-body review-score py-4 px-6">
              {scores &&
                scores.map(
                  ({ question, myScore, averageScore }: any, i: number) => {
                    return (
                      <div className="d-flex py-3 align-items-center justify-content-between flex-wrap">
                        <div className="flex-grow-1 text-dark-75 mb-0 mr-4 word-keep">
                          {i + 1}. {question}
                        </div>
                        <div className="d-flex justify-content-end font-weight-bolder mt-0 text-dark-75">
                          <div className="mr-6 p-0 text-nowrap">
                            My Score
                            <span className=" text-primary ml-2">
                              {myScore}
                            </span>
                          </div>
                          <div className="mr-6 p-0 text-nowrap">
                            사업부 평균
                            <span className="text-primary ml-2">
                              {averageScore}
                            </span>
                          </div>
                          <div className="mr-6 p-0 text-nowrap">
                            Gap
                            <span className="text-primary ml-2">
                              {myScore - averageScore}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}

              {/*  */}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="font-weight-bolder text-dark font-size-lg">
            Comments
          </div>
          {continueComments && continueComments.length !== 0 ? (
            <div className="mt-6">
              <div className="font-weight-bold text-dark font-size-lg">
                리더로서 지속적으로 유지해야할 강점을 기재해 주세요.
              </div>
              <div className="card bg-light-light text-dark-75 mt-2 line-height-xl">
                <div className="card-body p-6 word-keep">
                  <ul className="pl-4 mt-2 mb-0">
                    {continueComments.map((comment: string) => (
                      <li className="word-keep">{comment}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <> </>
          )}
          {considerComments && considerComments.length !== 0 ? (
            <div className="mt-6">
              <div className="font-weight-bold text-dark font-size-lg">
                더 좋은 리더가 되기 위해 개발해야 하는 점을 기재해주세요.
              </div>
              <div className="card bg-light-light text-dark-75 mt-2 line-height-xl">
                <div className="card-body p-6 word-keep">
                  <ul className="pl-4 mt-2 mb-0">
                    {considerComments.map((comment: string) => (
                      <li className="word-keep">{comment}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <> </>
          )}
        </div>
      </div>
    </div>
  );
}
