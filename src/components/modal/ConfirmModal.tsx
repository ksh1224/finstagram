/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Modal } from "react-bootstrap";
import { useModal } from "hooks/useRedux";
import React, { useEffect, useState } from "react";

export default function ConfirmModal() {
  const { modals, closeModal } = useModal();
  const confirmModal = modals.find((modal) => modal.name === "confirm");
  const [content, setContent] = useState<string | null>(null);
  const [cancel, setCancel] = useState<boolean>(false);

  const { onConfirm, isCancel, text } = confirmModal?.param || {};

  function close() {
    closeModal("confirm");
    setTimeout(() => {
      setContent(null);
    }, 300);
  }

  useEffect(() => {
    if (text) {
      setContent(text);
      setCancel(isCancel);
    }
  }, [confirmModal]);

  return (
    <Modal
      size="sm"
      show={!!confirmModal && content}
      animation
      centered
      onHide={() => close()}
    >
      <div className="modal-content">
        <div className="modal-body min-h-100px d-flex align-items-center justify-content-center font-size-lg">
          <p className="text-dark m-0">
            {content}
          </p>
        </div>
        <div
          className="modal-footer border-0 p-0">
          {cancel && (
            <button
              type="button"
              className="btn btn-secondary btn-block m-0 rounded-0 w-50px flex-grow-1"
              data-dismiss="modal"
              onClick={() => close()}
            >
              취소
            </button>
          )}
          <button
            type="button"
            className="btn btn-primary btn-block m-0 rounded-0 w-50px flex-grow-1"
            data-dismiss="modal"
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              }
              close();
            }}
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
