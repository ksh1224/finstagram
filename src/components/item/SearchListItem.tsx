import Profile from "components/Profile";
import { useModal } from "hooks/useRedux";
import React, { useEffect } from "react";

type SearchListItemType = {
  user?: {
    id?: number;
    username?: string;
    name?: string;
    profileImageUrl?: string;
    organization?: { name?: string };
    organizationName?: string;
    nickname?: string;
    position?: string;
  };
  onClick?: () => void;
};
export default function SearchListItem({ user, onClick }: SearchListItemType) {
  const {
    id,
    name,
    nickname,
    organizationName,
    profileImageUrl,
    position,
  } = user!;
  return (
    <div
      className="d-flex align-items-center bg-hover-light cursor-pointer px-5 py-4"
      onClick={onClick}
    >
      <Profile user={user} />
      <div className="w-100px flex-grow-1 ml-5">
        <div className="font-weight-bolder text-dark-75 font-size-md">
          {`${position} ${name}`}
          {!!nickname && (
            <span className="font-weight-lighter">({nickname})</span>
          )}
        </div>
        <div className="text-dark-50 m-0 flex-grow-1 font-size-sm mt-1">
          {organizationName}
        </div>
      </div>
    </div>
  );
}

SearchListItem.defaultProps = {
  user: {},
  onClick: () => {},
};
