/* eslint-disable jsx-a11y/iframe-has-title */
import { Modal } from "react-bootstrap";
import { useAuth, useModal } from "hooks/useRedux";
import React, { useEffect, useState, createRef } from "react";
import Scroll from "components/Scroll";

export default function CommentUpdateModal() {
  const { modals, closeModal } = useModal();
  const commentUpdateModal = modals.find(
    (modal) => modal.name === "commentUpdate"
  );
  const { comment, onClick } = commentUpdateModal?.param || {};
  const [text, setText] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  function close() {
    closeModal("commentUpdate");
  }

  useEffect(() => {
    if (commentUpdateModal) {
      setText(comment);
    }
  }, [commentUpdateModal]);

  useEffect(() => {
    if (commentUpdateModal) {
      if (text !== comment) setIsUpdate(true);
      else setIsUpdate(false);
    }
  }, [text]);

  return (
    <Modal
      size="lg"
      show={!!commentUpdateModal}
      animation
      centered
      onHide={() => close()}
      id="modal_commentUpdate"
    >
      <div className="modal-content">
        <div className="modal-body">
          <div className="d-flex align-items-center">
            <textarea
              id="edit_cmt"
              className="form-control resize-none"
              value={text}
              onChange={({ target }) => setText(target.value)}
            />
          </div>
        </div>
        <div className="modal-footer border-0 p-0">
          <button
            type="button"
            className={`btn btn-lg w-50 m-0 rounded-0 ${
              isUpdate ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => {
              if (isUpdate) {
                if (onClick) onClick(text);
                close();
              }
            }}
          >
            수정
          </button>
          <button
            type="button"
            className="btn btn-lg btn-secondary w-50 m-0 rounded-0"
            data-dismiss="modal"
            aria-label="닫기"
            onClick={() => close()}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}
