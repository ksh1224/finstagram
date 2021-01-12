import ReviewCardItem from "components/item/ReviewCardItem";
import ReviewListItem from "components/item/ReviewListItem";
import Profile from "components/Profile";
import { useAuth, useModal } from "hooks/useRedux";
import { useReviewMain, useReviewOKRList } from "hooks/useReview";
import React, { useEffect, useState } from "react";
import { getWriteDate } from "utils/dateUtil";
import SVG from "utils/SVG";

export default function OKRReview() {
  const { showModal } = useModal();
  const { data: mainData = {} } = useReviewMain();
  const { meta = {}, date, progress = {} } = mainData;

  useEffect(() => {}, [meta]);

  const { dateReviewOkrStart, dateReviewOkrEnd } = date;

  const { period: okrPeriod, periodText: okrPeriodText } = getWriteDate(
    dateReviewOkrStart,
    dateReviewOkrEnd
  );

  return (
    <div className="col-6 h-sm-100 flex-grow-1 section-1">
      <div className="card card-custom card-stretch rounded-bottom-0">
        <div className="card-header border-0 justify-content-start">
          <h3 className="card-title font-weight-bolder">OKR Review</h3>
        </div>
        <div className="card-body overflow-y-auto">
          <ReviewCardItem
            title="자기 Review"
            period={okrPeriod}
            periodText={okrPeriodText}
            onClick={() =>
              showModal("okrSelfReview", {
                meta,
                finished: progress?.okrSelfSubmitted,
              })
            }
            finished={progress?.okrSelfSubmitted}
          />
        </div>
      </div>
    </div>
  );
}
