/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/iframe-has-title */
import { Modal } from "react-bootstrap";
import { useAuth, useModal } from "hooks/useRedux";
import React, { useEffect, useState, createRef } from "react";
import Scroll from "components/Scroll";
import SVG from "utils/SVG";
import { useFeedOne } from "hooks/useFeedBackRedux";
import axios from "utils/axiosUtil";
import { DataType } from "components/item/FeedListItem";
import CommentItem, { CommentDataType } from "components/item/CommentItem";
import Profile from "components/Profile";

export default function FeedbackModal() {
  const { modals, closeModal } = useModal();
  const feedbackModal = modals.find((modal) => modal.name === "feedback");
  const id = feedbackModal?.param;
  const { user: my } = useAuth();

  const { update, deleteFeed } = useFeedOne();
  const [feedback, setFeedback] = useState<DataType>({});
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const {
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
    fileUrl,
  } = feedback;

  function close() {
    closeModal("feedback");
  }

  const getFeedback = async () => {
    try {
      if (feedbackModal) {
        const { data } = await axios(`/feedbacks/${id}`, "GET");
        setFeedback(data);
      }
    } catch (error) {
      console.log("e", error);
    }
  };

  useEffect(() => {
    getFeedback();
  }, [feedbackModal]);

  const clickLike = async () => {
    const body = {
      feedbackId: id,
      like: !liked,
      userId: receiveUser?.id,
    };
    try {
      await axios(`/feedbacks/like`, "POST", JSON.stringify(body));
      getFeedback();
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
          getFeedback();
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
        getFeedback();
      }
    } catch (error) {
      const aaa = await error;
      console.log("error", aaa);
      alert("Error!");
    }
  };

  return (
    <Modal
      size="lg"
      show={!!feedbackModal}
      animation
      centered
      onHide={() => close()}
      id="modal_help"
    >
      <div className="modal-content">
        <div className="modal-header justify-content-end">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="닫기"
            onClick={() => close()}
          >
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </div>
        <Scroll className="modal-body" style={{ maxHeight: "80vh" }}>
          <div>
            <div className="d-flex align-items-center">
              {!!feedbackBadge && (
                <div className="feedback-icon w-50px h-50px mr-5">
                  <img
                    className="bg-light-light rounded-lg"
                    alt="배지 이미지"
                    src={feedbackBadge?.fileUrlHttps}
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
                {fileUrl && (
                  <p>
                    <img className="max-w-100" src={fileUrl} alt="" />
                  </p>
                )}
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
                      liked ? "svg-icon-danger" : "svg-icon-dark-50"
                    }`}
                  >
                    <SVG name="like" />
                  </span>
                  {likeCount}
                </button>
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
        </Scroll>
      </div>
    </Modal>
  );
}
