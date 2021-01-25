import ReviewCardItem from "components/item/ReviewCardItem";
import { useModal } from "hooks/useRedux";
import { useReviewMain } from "hooks/useReview";
import React from "react";
import { getWriteDate } from "utils/dateUtil";

export default function SelfReview() {
  const { showModal } = useModal();
  const { data: mainData = {} } = useReviewMain();
  const {
    meta = {},
    date,
    progress,
    reviewOkrIncluded,
    reviewPeerIncluded,
    reviewSelfIncluded,
  } = mainData;

  const { self, peerRevieweeSubmitted, okrSelfSubmitted, peerRevieweeCount } =
    progress || {};

  const {
    dateReviewSelfStart,
    dateReviewSelfEnd,
    dateReviewerChangeStart,
    dateReviewerChangeEnd,
    dateReviewOkrStart,
    dateReviewOkrEnd,
  } = date;

  const { period: selfPeriod, periodText: selfPeriodText } = getWriteDate(
    dateReviewSelfStart,
    dateReviewSelfEnd
  );
  const {
    period: peerSelectPeriod,
    periodText: peerSelectPeriodText,
  } = getWriteDate(dateReviewerChangeStart, dateReviewerChangeEnd);
  const { period: okrPeriod, periodText: okrPeriodText } = getWriteDate(
    dateReviewOkrStart,
    dateReviewOkrEnd
  );

  return (
    <div className="card card-custom card-stretch rounded-bottom-0 w-100">
      <div className="card-header border-0 justify-content-start">
        <h3 className="card-title font-weight-bolder">본인 Review</h3>
      </div>
      <div className="card-body overflow-y-auto">
        {reviewSelfIncluded && (
          <ReviewCardItem
            title="성과 Review"
            finished={self}
            period={selfPeriod}
            periodText={selfPeriodText}
            onClick={() =>
              showModal("selfReview", { meta, period: selfPeriod })
            }
          />
        )}
        {reviewOkrIncluded && (
          <ReviewCardItem
            title="OKR Review"
            period={okrPeriod}
            periodText={okrPeriodText}
            finished={okrSelfSubmitted}
            onClick={() =>
              showModal("okrSelfReview", {
                meta,
                finished: okrSelfSubmitted || okrPeriod === "END",
              })
            }
          />
        )}
        {reviewPeerIncluded && peerSelectPeriod === "Write" && (
          <ReviewCardItem
            title="Reviewer 선정"
            total={6}
            count={peerRevieweeCount}
            finished={peerRevieweeSubmitted}
            period={peerSelectPeriod}
            periodText={peerSelectPeriodText}
            buttonText="Reviewer 선정"
            onClick={() => showModal("addReviewer", { meta })}
          />
        )}
      </div>
    </div>
  );
}
