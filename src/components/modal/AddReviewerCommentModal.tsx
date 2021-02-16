import { Modal } from "react-bootstrap";
import { useAuth, useModal } from "hooks/useRedux";
import React, { useState } from "react";

export default function AddReviewerCommentModal() {
  const { modals, closeModal } = useModal();
  const [text, setText] = useState("");

  const addReviewerCommentModal = modals.find(
    (modal) => modal.name === "addReviewerComment"
  );
  const { selectList, addReviewer, feedbackUser } =
    addReviewerCommentModal?.param || {};

  function close() {
    closeModal("addReviewerComment");
    setText("");
  }

  return (
    <Modal
      show={!!addReviewerCommentModal}
      animation
      centered
      onHide={() => close()}
      id="modal_myReviewer"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">나의 Reviewer 추가</h5>
          <button type="button" className="close" onClick={() => close()}>
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </div>
        <div className="modal-body">
          <div className="border-bottom">
            <h5 className="font-weight-bolder">Reviewer</h5>
            <ul className="list-team">
              {feedbackUser ? (
                <li>
                  <span className="text-dark-50 font-weight-bold">
                    {feedbackUser?.organization.name} {feedbackUser?.name}
                  </span>
                </li>
              ) : (
                selectList &&
                selectList.map((user: any) => (
                  <li>
                    <span className="text-dark-50 font-weight-bold">
                      {user?.organizationName} {user?.name}
                    </span>
                  </li>
                ))
              )}
            </ul>
            <h5 className="font-weight-bolder mt-12">
              해당 동료와의 협업 내용을 간단히 작성해주세요.
            </h5>
            <textarea
              className="form-control resize-none mt-3"
              placeholder="(ex, AA부터 BB까지 00프로젝트를 함께 진행함)"
              rows={6}
              value={text}
              onChange={({ target }) => setText(target.value)}
            />
          </div>
        </div>
        <div className="modal-footer border-0 p-0">
          <button
            type="button"
            className="btn btn-lg btn-secondary w-50 m-0 rounded-0"
            data-dismiss="modal"
            aria-label="닫기"
            onClick={() => close()}
          >
            취소
          </button>
          <button
            type="button"
            className="btn btn-lg btn-primary w-50 m-0 rounded-0"
            onClick={() => {
              if (addReviewer) {
                if (feedbackUser) addReviewer(text, feedbackUser.id);
                else addReviewer(text);
              }
              close();
            }}
          >
            추가
          </button>
        </div>
      </div>
    </Modal>
  );
}
