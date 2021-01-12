import { useReviewMain } from "hooks/useReview";
import React, { createRef, useEffect, useState } from "react";
import { Chart } from "chart.js";
import "chartjs-plugin-datalabels";

const pieConfig = (continueData?: number, considerData?: number): any => {
  let data = [continueData, considerData];
  let backgroundColor = ["#1bc5bd", "#ffa800"];
  if (!continueData || continueData === 0) {
    data = [considerData];
    backgroundColor = ["#ffa800"];
  }
  if (!considerData || considerData === 0) {
    data = [continueData];
    backgroundColor = ["#1bc5bd"];
  }
  return {
    type: "pie",
    data: {
      datasets: [
        {
          data,
          backgroundColor,
          label: "Dataset 1",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
      plugins: {
        datalabels: {
          labels: {
            title: {
              color: "white",
              font: {
                size: 20,
                weight: "bold",
              },
            },
          },
        },
      },
    },
  };
};

const barConfig = (
  myScore?: { average: number; positive: number; negative: number },
  totalScore?: { average: number; positive: number; negative: number }
): any => {
  const data = {
    labels: ["평균점수", "긍정응답율", "부정응답율"],
    datasets: [
      {
        label: "My Score",
        backgroundColor: "#1bc5bd",
        borderColor: "#1bc5bd",
        borderWidth: 1,
        data: [myScore?.average, myScore?.positive, myScore?.negative],
      },
      {
        label: "사업부 평균",
        backgroundColor: "#ffa800",
        borderColor: "#ffa800",
        borderWidth: 1,
        data: [totalScore?.average, totalScore?.positive, totalScore?.negative],
      },
    ],
  };
  return {
    type: "horizontalBar",
    data,
    options: {
      layout: {
        padding: {
          top: 25,
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
        },
      },
    },
  };
};

export default function PeerReviewResult() {
  const { data = {} } = useReviewMain();
  const contributionPieRef = createRef<HTMLCanvasElement>();
  const collaborationPieRef = createRef<HTMLCanvasElement>();
  const contributionBarRef = createRef<HTMLCanvasElement>();
  const collaborationBarRef = createRef<HTMLCanvasElement>();
  const { collaboration, contribution } = data?.result?.peer || {};

  useEffect(() => {
    if (
      contributionPieRef.current &&
      collaborationPieRef.current &&
      contributionBarRef.current &&
      collaborationBarRef.current &&
      collaboration &&
      contribution
    ) {
      const pie1 = new Chart(
        contributionPieRef.current,
        pieConfig(collaboration.continueCount, collaboration.considerCount)
      );
      const pie2 = new Chart(
        collaborationPieRef.current,
        pieConfig(contribution.continueCount, contribution.considerCount)
      );

      const bar1 = new Chart(
        contributionBarRef.current,
        barConfig(collaboration.myScore, collaboration.totalScore)
      );
      const bar2 = new Chart(
        collaborationBarRef.current,
        barConfig(contribution.myScore, contribution.totalScore)
      );
    }
  }, [data]);

  return (
    <div className="mb-30 tab-group">
      <h3 className="d-flex h-40px font-weight-bolder align-items-center mb-0">
        동료 Review 결과
      </h3>
      <div className="mt-10">
        <div className="font-size-h6 font-weight-bolder word-keep">성과</div>
        <div className="d-flex mt-10 review-chart">
          <div className="col-6">
            <div id="pie-result-legend" className="chart-reivew-legend">
              <ul className="0-legend">
                <li>
                  <span style={{ backgroundColor: "#1bc5bd" }} />
                  Continue: 4~6점을 준 동료 수
                </li>
                <li>
                  <span style={{ backgroundColor: "#ffa800" }} />
                  Consider: 1~3점을 준 동료 수
                </li>
              </ul>
            </div>
            <canvas ref={contributionPieRef} className="max-w-300px" />
          </div>
          <div className="col-6">
            <div className="d-flex">
              <div
                id="bar-result-legend"
                className="col-4 chart-reivew-legend p-0"
              >
                <ul className="3-legend">
                  <li>
                    <span style={{ backgroundColor: "#1bc5bd" }} />
                    My Score
                  </li>
                  <li>
                    <span style={{ backgroundColor: "#ffa800" }} />
                    사업부 평균
                  </li>
                </ul>
              </div>
              <div className="col-8 p-0">
                <span className="d-block font-size-sm text-muted mb-4">
                  *긍정응답률: 5.6점을 준 동료의 비율
                </span>
                <span className="d-block font-size-sm text-muted mb-4">
                  *부정응답률: 1.2점을 준 동료의 비율
                </span>
              </div>
            </div>
            <canvas ref={contributionBarRef} className="max-w-300px" />
          </div>
        </div>
        {contribution?.continueComment &&
        contribution?.continueComment.length !== 0 ? (
          <div className="mt-10">
            <div className="font-weight-bolder text-dark font-size-lg">
              Comment(잘한점)
            </div>
            <div className="card bg-light-light text-dark-75 mt-4 line-height-xl">
              <div className="card-body p-6 word-keep">
                {contribution.continueComment.map((comment: string) => (
                  <>
                    - {comment}
                    <br />
                  </>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {contribution?.considerComment &&
        contribution?.considerComment.length !== 0 ? (
          <div className="mt-10">
            <div className="font-weight-bolder text-dark font-size-lg">
              Comment(개선점)
            </div>
            <div className="card bg-light-light text-dark-75 mt-4 line-height-xl">
              <div className="card-body p-6 word-keep">
                {contribution.considerComment.map((comment: string) => (
                  <>
                    - {comment}
                    <br />
                  </>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-10">
        <div className="font-size-h6 font-weight-bolder word-keep">협업</div>
        <div className="d-flex mt-10 review-chart">
          <div className="col-6">
            <div id="pie-collabo-legend" className="chart-reivew-legend">
              <ul className="0-legend">
                <li>
                  <span style={{ backgroundColor: "#1bc5bd" }} />
                  Continue: 4~6점을 준 동료 수
                </li>
                <li>
                  <span style={{ backgroundColor: "#ffa800" }} />
                  Consider: 1~3점을 준 동료 수
                </li>
              </ul>
            </div>
            <canvas ref={collaborationPieRef} className="max-w-300px" />
          </div>
          <div className="col-6">
            <div className="d-flex">
              <div
                id="bar-collabo-legend"
                className="col-4 chart-reivew-legend p-0"
              >
                <ul className="3-legend">
                  <li>
                    <span style={{ backgroundColor: "#1bc5bd" }} />
                    My Score
                  </li>
                  <li>
                    <span style={{ backgroundColor: "#ffa800" }} />
                    사업부 평균
                  </li>
                </ul>
              </div>
              <div className="col-8 p-0">
                <span className="d-block font-size-sm text-muted mb-4">
                  *긍정응답률: 5.6점을 준 동료의 비율
                </span>
                <span className="d-block font-size-sm text-muted mb-4">
                  *부정응답률: 1.2점을 준 동료의 비율
                </span>
              </div>
            </div>
            <canvas ref={collaborationBarRef} className="max-w-300px" />
          </div>
        </div>
        {collaboration?.continueComment &&
        collaboration.continueComment.length !== 0 ? (
          <div className="mt-10">
            <div className="font-weight-bolder text-dark font-size-lg">
              Comment(잘한점)
            </div>
            <div className="card bg-light-light text-dark-75 mt-4 line-height-xl">
              <div className="card-body p-6 word-keep">
                {collaboration?.continueComment &&
                  collaboration.continueComment.map((comment: string) => (
                    <>
                      - {comment}
                      <br />
                    </>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {collaboration?.considerComment &&
        collaboration?.considerComment.length !== 0 ? (
          <div className="mt-10">
            <div className="font-weight-bolder text-dark font-size-lg">
              Comment(개선점)
            </div>
            <div className="card bg-light-light text-dark-75 mt-4 line-height-xl">
              <div className="card-body p-6 word-keep">
                {collaboration.considerComment.map((comment: string) => (
                  <>
                    - {comment}
                    <br />
                  </>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
