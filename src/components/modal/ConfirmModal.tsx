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
        <div
          className="modal-body"
          style={{
            minHeight: "100px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p
            className="text-dark-75 m-0"
            style={{ fontSize: "18px", textAlign: "center" }}
          >
            {content}
          </p>
        </div>
        <div
          className="modal-footer"
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            borderTopColor: "#0000",
            padding: "10px",
          }}
        >
          {cancel && (
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => close()}
            >
              취소
            </button>
          )}
          <button
            type="button"
            className="btn btn-primary"
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
