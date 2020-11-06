import React, { useEffect } from "react";
import Profile from "components/Profile";
import SVG from "utils/SVG";
import { useAuth } from "hooks/useRedux";

export type CommentDataType = {
  content?: string;
  createdAt?: string;
  id?: number;
  likeCount?: number;
  liked?: boolean;
  updatedAt?: string;
  user?: {
    id?: number;
    username?: string;
    name?: string;
    profileImageUrl?: string;
    organization?: { name?: string };
  };
};

export default function CommentItem({
  content,
  id,
  user,
  createdAt,
  likeCount,
  liked,
}: CommentDataType) {
  const { APIAuth } = useAuth();
  const { user: my } = APIAuth;
  return (
    <div className="py-5">
      <div className="d-flex align-items-center">
        <Profile user={user} />
        <div className="w-100px flex-grow-1 mx-5">
          <div className="text-dark-50 font-weight-normal flex-grow-1 font-size-sm">
            <span className="text-dark-75 text-hover-primary font-size-lg font-weight-bolder mr-2">
              {user?.name}
            </span>
            <span>{user?.organization?.name}</span>
          </div>
          <div className="text-muted font-size-xs">
            <span>{createdAt?.split("T")[0]}</span>
            {user?.id === my.id && (
              <>
                <a
                  className="ml-3"
                  href="javascript:;"
                  data-toggle="modal"
                  data-target="#modal_editCmt"
                >
                  수정
                </a>
                <a className="ml-3" href="#">
                  삭제
                </a>
              </>
            )}
          </div>
        </div>
        <div className="font-size-sm">
          <a href="#">
            <span
              className={`svg-icon svg-icon-sm pr-1 ${
                liked ? "svg-icon-danger" : "svg-icon-light-dark"
              }`}
            >
              <SVG name="like" />
            </span>
          </a>
          {likeCount}
        </div>
      </div>
      <div className="text-dark-75 font-size-sm font-weight-normal pt-3">
        {content}
      </div>
    </div>
  );
}
