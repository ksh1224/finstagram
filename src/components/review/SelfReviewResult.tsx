import { useReviewMain } from "hooks/useReview";
import React, { useEffect, useState } from "react";
import { enterLine } from "utils/stringUtil";

export default function SelfReviewResult({ modalSelf }: { modalSelf?: any }) {
  const { data = {} } = useReviewMain();
  const { result } = modalSelf || data || {};

  return (
    <div className="mb-30 tab-group">
      {!modalSelf ? (
        <h3 className="d-flex h-40px font-weight-bolder align-items-center mb-0">
          성과 Review 결과
        </h3>
      ) : (
        <h5 className="d-flex gutter-b align-items-center justify-content-center line-height-40px">
          <span className="d-inline-block h-40px font-weight-bolder border-bottom">
            성과 Review 결과
            <span />
          </span>
        </h5>
      )}
      <div className="mt-10">
        <div className="font-weight-bolder text-dark font-size-lg">
          자기 성과 Review
        </div>
        <div className="card bg-light-light text-dark-75 mt-4 line-height-xl">
          <div
            className="card-body p-6 word-keep"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {result?.self?.reviewData && result.self.reviewData[0].answer
              ? enterLine(
                  result.self.reviewData[0].answer,
                  "<split/>",
                  true,
                  true
                )
              : "리뷰 데이터가 없습니다"}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="font-weight-bolder text-dark font-size-lg">
          Continue Points(잘한점)
        </div>
        <div className="card bg-light-light text-dark-75 mt-4 line-height-xl">
          <div
            className="card-body p-6 word-keep"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {result?.self?.evaluation?.continuePoint
              ? result.self.evaluation.continuePoint
              : "리뷰 데이터가 없습니다"}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="font-weight-bolder text-dark font-size-lg">
          Consider Points(개선점)
        </div>
        <div className="card bg-light-light text-dark-75 mt-4 line-height-xl">
          <div
            className="card-body p-6 word-keep"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {result?.self?.evaluation?.considerPoint
              ? result.self.evaluation.considerPoint
              : "리뷰 데이터가 없습니다"}
          </div>
        </div>
      </div>
    </div>
  );
}
