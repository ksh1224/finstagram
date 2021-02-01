/* eslint-disable jsx-a11y/control-has-associated-label */
import Profile from "components/Profile";
import React, { useEffect } from "react";

export type TopRankerItemType = {
  feedbackReceived?: number;
  feedbackSent?: number;
  quarter?: number;
  rank?: number;
  total?: number;
  user?: {
    id?: number;
    username?: string;
    profileImageUrl?: string;
    name?: string;
    organization?: {
      name?: string;
    };
  };
  topFeedbackReceived?: number;
};

export default function TopRankerItem({
  rank,
  user,
  feedbackReceived,
  topFeedbackReceived,
}: TopRankerItemType) {
  let rankColor = "font-weight-bolder mr-3";
  let graphColor = "bg-gray-600";
  switch (rank) {
    case 1:
      rankColor = "label-dark font-weight-bolder mr-3";
      graphColor = "bg-danger";
      break;
    case 2:
      rankColor = "label-light-dark font-weight-bolder mr-3";
      graphColor = "bg-warning";
      break;
    case 3:
      graphColor = "bg-success";
      break;
    default:
      break;
  }
  return (
    <div className="d-flex align-items-center mb-10">
      <span className={`label label-inline label-lg ${rankColor}`}>{rank}</span>

      <div className="avatar symbol symbol-40 cursor-pointer">
        <Profile user={user} />
      </div>
      {/* <div className="d-flex flex-column font-weight-bold w-100px flex-grow-1 ml-3">
        <span className="text-dark mb-1 font-size-lg">{user?.name}</span>
        <span className="text-muted text-truncate mr-3">
          {user?.organization?.name}
        </span>
      </div>
      <div className="border-bottom border-light-dark">{feedbackReceived}</div> */}
      <div className="flex-grow-1 ml-3">
        <div className="d-flex justify-content-between font-size-lg font-weight-bold mb-1">
          <div>
            {user?.name}
            <small className="text-muted text-truncate ml-3">
              {user?.organization?.name}
            </small>
          </div>
          <div>{feedbackReceived}</div>
        </div>
        <div className="progress h-10px">
          <div
            className={`progress-bar progress-bar-striped ${graphColor}`}
            role="progressbar"
            style={{
              width: `${
                feedbackReceived && topFeedbackReceived
                  ? (feedbackReceived / topFeedbackReceived) * 100 || 0
                  : 0
              }%`,
            }}
            aria-valuenow={100}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
  );
}

TopRankerItem.defaultProps = {
  feedbackReceived: undefined,
  rank: undefined,
  user: undefined,
  // quarter: undefined,
  // total: undefined,
  // feedbackSent: undefined,
};
