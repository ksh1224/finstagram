/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import Profile from "components/Profile";
import SVG from "utils/SVG";
import { useAuth, useModal } from "hooks/useRedux";
import axios from "utils/axiosUtil";

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
  type?: "feedback" | "okr";
  onDelete?: (commentId: number) => void;
  onUpdate?: () => void;
};

export default function CommentItem({
  content,
  id,
  user,
  createdAt,
  likeCount,
  liked,
  type,
  onDelete,
  onUpdate,
}: CommentDataType) {
  const { user: my } = useAuth();
  const { showModal } = useModal();
  const [like, setLike] = useState(liked);

  const likeComment = async () => {
    try {
      if (type === "okr") {
        const body = {
          commentId: id,
          like: !liked,
          userId: my.id,
        };
        await axios(`/okr/comment/like`, "POST", JSON.stringify(body));
      } else {
        const body = {
          feedbackCommentId: id,
          like: !liked,
          userId: my.id,
        };
        await axios(`/feedbacks/comment/like`, "POST", JSON.stringify(body));
      }
      await setLike(!like);
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateComment = async (text: string) => {
    try {
      if (type === "okr") {
        await axios(`/okr/comment/update/${id}`, "PUT", text);
      } else {
        await axios(`/feedbacks/comment/update/${id}`, "PUT", text);
      }
      if (onUpdate) await onUpdate();
    } catch (error) {
      console.log("error", error);
    }
  };

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
                  onClick={() =>
                    showModal("commentUpdate", {
                      comment: content,
                      onClick: updateComment,
                    })
                  }
                >
                  수정
                </a>
                <a
                  className="ml-3"
                  href="javascript:;"
                  onClick={() =>
                    showModal("confirm", {
                      onConfirm: () => id && onDelete && onDelete(id),
                      isCancel: true,
                      text: "삭제하시겠습니까?",
                    })
                  }
                >
                  삭제
                </a>
              </>
            )}
          </div>
        </div>
        <div className="font-size-sm">
          <a onClick={() => likeComment()}>
            <span
              className={`svg-icon svg-icon-sm pr-1 ${
                like ? "svg-icon-danger" : "svg-icon-light-dark"
              }`}
            >
              <SVG name="like" />
            </span>
          </a>
          {typeof likeCount === "number" &&
            (liked
              ? like
                ? likeCount
                : likeCount - 1
              : like
              ? likeCount + 1
              : likeCount)}
        </div>
      </div>
      <div className="text-dark-75 font-size-sm font-weight-normal pt-3">
        {content}
      </div>
    </div>
  );
}
