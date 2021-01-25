import { Modal } from "react-bootstrap";
import { useAuth, useModal } from "hooks/useRedux";
import React, { useEffect, useState, createRef } from "react";
import { statusToKo } from "constant/progress";
import { useRefreshOKRData } from "hooks/useOKRRedux";
import SVG from "utils/SVG";
import axios from "utils/axiosUtil";
import CommentItem from "components/item/CommentItem";

export default function OKRCommentModal() {
  const { user: my } = useAuth();
  const { modals, closeModal } = useModal();
  const { refreshOKRData } = useRefreshOKRData();
  const [comments, setComments] = useState<
    | {
        user: any;
        content: string;
        createdAt: string;
        id: number;
        likeCount: number;
        liked: boolean;
        updatedAt: string;
      }[]
    | null
  >([]);

  const [text, setText] = useState("");

  const okrCommentModal = modals.find(
    (modal: any) => modal.name === "okrComment"
  );

  const { id, description, progress, status, onUpdate } =
    okrCommentModal?.param || {};

  function close() {
    closeModal("okrComment");
    setTimeout(() => {
      setComments(null);
      setText("");
    }, 300);
  }

  const getComments = async () => {
    try {
      const res = await axios(`/okr/comment/${id}?user_id=${my.id}`, "GET");
      if (res.responseCode === "SUCCESS") {
        setComments(res.data);
      }
    } catch (error) {
      console.log("error", error);
      alert("Error!");
    }
  };

  const addComment = async () => {
    if (text.trim() === "") alert("댓글을 입력해 주세요");
    else {
      try {
        const res = await axios(`/okr/comment/new`, "POST", {
          content: text.trim(),
          keyResultId: id,
          userId: my.id,
        });
        if (res.responseCode === "SUCCESS") {
          setText("");
          getComments();
          refreshOKRData();
          if (onUpdate) onUpdate();
        }
      } catch (error) {
        console.log("error", error);
        alert("Error!");
      }
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      const res = await axios(`/okr/comment/delete/${commentId}`, "DELETE");
      if (res.responseCode === "SUCCESS") {
        getComments();
        refreshOKRData();
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.log("error", error);
      alert("Error!");
    }
  };

  useEffect(() => {
    if (okrCommentModal) {
      getComments();
    }
  }, [okrCommentModal]);

  return (
    <Modal
      show={!!okrCommentModal && comments}
      animation
      centered
      onHide={() => close()}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title font-size-h6">
            <span className="d-block font-size-sm font-weight-normal">
              {statusToKo[status]}
              <span className="text-danger font-weight-bold">{progress}</span>
            </span>
            {description}
          </h5>
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
        <div className="modal-body pt-4">
          <div
            style={{ maxHeight: "300px" }}
            className="overflow-hidden overflow-y-auto"
          >
            {comments &&
              comments.map((props) => (
                <CommentItem
                  type="okr"
                  {...props}
                  onUpdate={() => getComments()}
                  onDelete={deleteComment}
                />
              ))}
          </div>

          <div className="separator separator-solid my-5" />

          <div className="d-flex align-items-center">
            <textarea
              className="form-control resize-none w-100px flex-grow-1"
              placeholder="댓글을 입력하세요."
              style={{ overflow: "hidden", overflowWrap: "break-word" }}
              rows={1}
              value={text}
              onChange={({ target }) => setText(target.value)}
            />
            <a
              className="btn btn-light-primary font-weight-bold ml-3"
              onClick={() => addComment()}
            >
              등록
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}
