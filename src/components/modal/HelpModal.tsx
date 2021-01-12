/* eslint-disable jsx-a11y/iframe-has-title */
import { Modal } from "react-bootstrap";
import { useAuth, useModal } from "hooks/useRedux";
import React, { useEffect, useState, createRef } from "react";
import Scroll from "components/Scroll";

export default function HelpModal() {
  const { modals, closeModal } = useModal();
  const helpModal = modals.find((modal) => modal.name === "help");
  const { title, uri, fileUrl } = helpModal?.param || {};
  const url = process.env.REACT_APP_HOST?.replace("s://", "://") + uri;

  function close() {
    closeModal("help");
  }

  return (
    <Modal
      size="lg"
      show={!!helpModal}
      animation
      centered
      onHide={() => close()}
      id="modal_help"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <i
              aria-hidden="true"
              className="ki ki-close"
              onClick={() => close()}
            />
          </button>
        </div>
        <Scroll style={{ height: "80vh" }}>
          <iframe
            src={`${url}#view=FitH&toolbar=0&navpanes=0`}
            width="100%"
            height="100%"
            frameBorder="0"
          />
        </Scroll>
      </div>
    </Modal>
  );
}
