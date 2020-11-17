import React, { useEffect, useState } from "react";

type OKRGraphType = {
  rowScore?: number;
  mediumScore?: number;
  highScore?: number;
  show?: boolean;
};

export default function OKRGraph({
  rowScore,
  mediumScore,
  highScore,
  show,
}: OKRGraphType) {
  const total = (rowScore || 0) + (mediumScore || 0) + (highScore || 0);

  return (
    <>
      <div
        className={`chart-donut h-275px w-100px flex-grow-1 ${
          show ? "show" : ""
        }`}
      >
        <svg width="100%" height="100%" viewBox="0 0 40 40">
          <circle
            className="donut-ring"
            cx="20"
            cy="20"
            r="15.91549430918954"
          />
          {rowScore && rowScore > 0 && (
            <circle
              className="donut-segment-1"
              strokeDasharray="100,100"
              cx="20"
              cy="20"
              r="15.91549431"
            />
          )}
          {highScore && mediumScore && mediumScore > 0 && (
            <circle
              className="donut-segment-2"
              strokeDasharray={`${
                (100 / total) * (mediumScore + highScore)
              },100`}
              cx="20"
              cy="20"
              r="15.91549431"
            />
          )}
          {highScore && highScore > 0 && (
            <circle
              className="donut-segment-3"
              strokeDasharray={`${(100 / total) * highScore},100`}
              cx="20"
              cy="20"
              r="15.91549431"
            />
          )}
          <g className="donut-text">
            <text y="48%" transform="translate(0, 2)">
              <tspan className="donut-text-1" x="50%" textAnchor="middle">
                {total}
              </tspan>
            </text>
            <text y="60%" transform="translate(0, 2)">
              <tspan className="donut-text-2" x="50%" textAnchor="middle">
                Objectives
              </tspan>
            </text>
          </g>
        </svg>
      </div>
      {total !== 0 && (
        <div className="char-donut-legend">
          <div className="legend-segment-3">
            <i />
            <strong>{rowScore}</strong>0.7 이상
          </div>
          <div className="legend-segment-2">
            <i />
            <strong>{mediumScore}</strong>0.3 초과
            <br />
            0.7 미만
          </div>
          <div className="legend-segment-1">
            <i />
            <strong>{highScore}</strong>0.3 이하
          </div>
        </div>
      )}
    </>
  );
}

OKRGraph.defaultProps = {
  rowScore: null,
  mediumScore: null,
  highScore: null,
  show: false,
};
