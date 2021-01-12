/* eslint-disable no-nested-ternary */
import Profile from "components/Profile";
import SVG from "utils/SVG";
import React, { useState } from "react";
import axios from "utils/axiosUtil";
import { useAuth, useModal } from "hooks/useRedux";
import { useFeedOne } from "hooks/useFeedBackRedux";
import CommentItem, { CommentDataType } from "./CommentItem";

export type DataType = {
  fileUrl?: string;
  request?: boolean;
  category?: string;
  commentCount?: number;
  contents?: string;
  createdAt?: string;
  feedbackBadge?: {
    id?: number;
    name?: string;
    description?: string;
    fileUrl?: string;
  };
  id?: number;
  likeCount?: number;
  liked?: boolean;
  receiveUser?: {
    id?: number;
    username?: string;
    name?: string;
    profileImageUrl?: string;
    organization?: { name?: string };
  };
  sendUser?: {
    id?: number;
    username?: string;
    name?: string;
    profileImageUrl?: string;
    organization?: { name?: string };
  };
  statusType?: string;
  type?: string;
  updatedAt?: string;
  feedType?: "recent" | "received" | "sent" | "modal"; // 피드 종류
  feedbackComment?: {
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
  }[];
  onUpdate?: () => void;
};

export default function FeedListItem(feed: DataType) {
  const {
    id,
    sendUser,
    receiveUser,
    contents,
    feedbackBadge,
    createdAt,
    commentCount,
    likeCount,
    feedType,
    liked,
    feedbackComment,
    onUpdate,
  } = feed || {};
  const { update, deleteFeed } = useFeedOne();
  const { user: my } = useAuth();
  const { showModal } = useModal();
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(liked);
  const [text, setText] = useState("");

  const clickLike = async () => {
    const body = {
      feedbackId: id,
      like: !like,
      userId: receiveUser?.id,
    };
    try {
      await axios(`/feedbacks/like`, "POST", JSON.stringify(body));
      setLike(!like);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addComment = async () => {
    if (text.trim() === "") alert("댓글을 입력해 주세요");
    else {
      try {
        const res = await axios(`/feedbacks/comment/new`, "POST", {
          content: text.trim(),
          feedbackId: id,
          userId: my.id,
        });
        if (res.responseCode === "SUCCESS") {
          setText("");
          update(id);
          if (onUpdate) onUpdate();
        }
      } catch (error) {
        const aaa = await error;
        console.log("error", aaa);
        alert("Error!");
      }
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      const res = await axios(
        `/feedbacks/comment/delete/${commentId}`,
        "DELETE"
      );
      if (res.responseCode === "SUCCESS") {
        update(id);
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      const aaa = await error;
      console.log("error", aaa);
      alert("Error!");
    }
  };

  return (
    <div className="card card-custom gutter-b">
      <div className="card-body">
        <div>
          <div className="d-flex align-items-center">
            {!!feedbackBadge && (
              <div className="feedback-icon w-50px h-50px mr-5">
                <img
                  className="bg-light-light rounded-lg"
                  alt="배지 이미지"
                  src={feedbackBadge?.fileUrl}
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
            )}

            <div className="d-flex flex-column flex-grow-1 w-100px">
              <span className="d-flex justify-content-between align-items-center text-dark my-1 font-size-lg font-weight-bolder">
                <span>{`${receiveUser?.organization?.name} ${receiveUser?.name}`}</span>
                <Profile user={receiveUser} type="item" />
              </span>
              <span className="d-flex justify-content-between align-items-center text-dark-50 font-weight-bold">
                <span>{`Form ${sendUser?.organization?.name} ${sendUser?.name}`}</span>
                <Profile user={sendUser} type="item" />
              </span>
            </div>
          </div>

          <div>
            <div className="text-dark-75 font-size-lg font-weight-normal pt-5">
              <p>{contents}</p>
            </div>
            <div className="separator separator-solid mt-6 mb-2" />

            <div className="d-flex align-items-center mb-n2">
              <button
                type="button"
                className={`btn btn-hover-text-primary btn-hover-icon-primary btn-sm btn-text-dark-50 rounded font-weight-bolder font-size-sm p-2 mr-2 ${
                  open ? "bg-light-primary" : "bg-hover-light-primary"
                }`}
                data-toggle="collapse"
                data-target={`#cmt-feedback-feedback-${`${feedType}${id}`}`}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
              >
                <span
                  className={`svg-icon svg-icon-md pr-2 ${
                    open ? "svg-icon-primary" : "svg-icon-dark-50"
                  }`}
                >
                  <SVG name="comment" />
                </span>
                {commentCount}
              </button>
              <button
                type="button"
                className="btn btn-sm btn-text-dark-50 btn-hover-icon-danger btn-hover-text-danger bg-hover-light-danger font-weight-bolder rounded font-size-sm p-2"
                onClick={() => clickLike()}
              >
                <span
                  className={`svg-icon svg-icon-md pr-1 ${
                    like ? "svg-icon-danger" : "svg-icon-dark-50"
                  }`}
                >
                  <SVG name="like" />
                </span>
                {typeof likeCount === "number" &&
                  (liked
                    ? like
                      ? likeCount
                      : likeCount - 1
                    : like
                    ? likeCount + 1
                    : likeCount)}
              </button>
              {feedType === "sent" && (
                <div className="dropdown dropdown-inline">
                  <button
                    type="button"
                    className="btn btn-sm btn-hover-icon-dark bg-hover-light font-weight-bolder rounded font-size-sm p-2 ml-2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="svg-icon m-0">
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24" />
                          <circle fill="#000000" cx="5" cy="12" r="2" />
                          <circle fill="#000000" cx="12" cy="12" r="2" />
                          <circle fill="#000000" cx="19" cy="12" r="2" />
                        </g>
                      </svg>
                    </span>
                  </button>
                  <div className="dropdown-menu">
                    <a
                      className="dropdown-item"
                      href="javascript:;"
                      onClick={() => id && deleteFeed(id)}
                    >
                      삭제하기
                    </a>
                    <a
                      className="dropdown-item"
                      href="javascript:;"
                      onClick={() =>
                        feed.request
                          ? showModal("updateRequestFeedback", feed)
                          : showModal("updateSendFeedback", feed)
                      }
                    >
                      수정하기
                    </a>
                  </div>
                </div>
              )}
              <span className="w-100px flex-grow-1 text-right text-dark-50 font-size-sm">
                {createdAt?.split("T").join(" ").substr(0, 16)}
              </span>
            </div>
            <div
              className="pt-5 collapse"
              id={`cmt-feedback-feedback-${`${feedType}${id}`}`}
            >
              {!!feedbackComment &&
                feedbackComment.length !== 0 &&
                feedbackComment.map((comment: CommentDataType) => (
                  <CommentItem
                    key={`${feedType}_${comment?.id}`}
                    {...comment}
                    onUpdate={() => update(id)}
                    onDelete={() => comment?.id && deleteComment(comment?.id)}
                  />
                ))}
              <div className="separator separator-solid mt-5 mb-4" />
              <form className="position-relative">
                <textarea
                  className="form-control border-0 p-0 pr-10 resize-none"
                  placeholder="Reply..."
                  style={{
                    overflow: "hidden",
                    overflowWrap: "break-word",
                    height: "19px",
                  }}
                  rows={1}
                  value={text}
                  onChange={({ target }) => setText(target.value)}
                />
                <div className="position-absolute top-0 right-0 mt-n1 mr-n2">
                  <span
                    className="btn btn-icon btn-sm btn-hover-icon-primary"
                    onClick={() => addComment()}
                  >
                    <span className="svg-icon svg-icon-primary">
                      <SVG name="send" />
                    </span>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
