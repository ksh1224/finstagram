import Profile from "components/Profile";
import React, { useEffect } from "react";

type TopRankerItemType = {
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
};

export default function TopRankerItem({
  rank,
  user,
  feedbackReceived,
}: TopRankerItemType) {
  let rankColor = "font-weight-bolder mr-3";
  switch (rank) {
    case 1:
      rankColor = "label-dark font-weight-bolder mr-3";
      break;
    case 2:
      rankColor = "label-light-dark font-weight-bolder mr-3";
      break;

    default:
      break;
  }
  return (
    <div className="d-flex align-items-center mb-10">
      <span className={`label label-inline label-lg${rankColor}`}>{rank}</span>

      <div
        className="avatar symbol symbol-40 cursor-pointer"
        data-toggle="modal"
        data-target="#modal_userProfile"
      >
        <Profile user={user} />
      </div>
      <div className="d-flex flex-column font-weight-bold w-100px flex-grow-1 ml-3">
        <span className="text-dark mb-1 font-size-lg">{user?.name}</span>
        <span className="text-muted text-truncate mr-3">
          {user?.organization?.name}
        </span>
      </div>
      <div className="border-bottom border-light-dark">{feedbackReceived}</div>
    </div>
  );
}
