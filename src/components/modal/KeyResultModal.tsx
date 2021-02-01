/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/iframe-has-title */
import { Modal } from "react-bootstrap";
import { useAuth, useModal } from "hooks/useRedux";
import React, { useEffect, useState, createRef } from "react";
import Scroll from "components/Scroll";
import SVG from "utils/SVG";
import axios from "utils/axiosUtil";
import { DataType } from "components/item/FeedListItem";
import CommentItem, { CommentDataType } from "components/item/CommentItem";
import Profile from "components/Profile";
import KeyResultItem from "components/okr/KeyResultItem";
import { statusToKo } from "constant/progress";

export default function KeyResultModal() {
  const { modals, closeModal, showModal } = useModal();
  const keyResultModal = modals.find((modal) => modal.name === "keyResult");
  const id = keyResultModal?.param;
  const [keyResultData, setKeyResultData] = useState<any>(null);

  function close() {
    setKeyResultData(null);
    closeModal("keyResult");
  }

  const getKeyResultData = async () => {
    try {
      const { data } = await axios(`/okr/key_result/${id}`, "GET");
      setKeyResultData(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getKeyResultData();
  }, [keyResultModal]);

  const {
    description,
    progress,
    status,
    statusColor,
    keyResultHistory,
    commentCount,
  } = keyResultData || {};

  return (
    <Modal
      size="lg"
      show={!!keyResultData}
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
          <div className="card-body">
            <div className="font-size-base font-weight-bold mb-3 mt-1">
              Key-
              <span className="d-inline-block">Result</span>
            </div>
            <div className="d-flex flex-wrap py-3 pr-10">
              <div className="w-100 mb-3">{description}</div>
              <button
                type="button"
                className="btn label label-light-dark label-inline btn-hover-light-primary"
                onClick={() => showModal("okrHistory", keyResultHistory)}
              >
                History
              </button>
              <a
                href="javascript:;"
                className="btn btn-transparent-white btn-icon-dark-65 btn-text-dark-65 btn-hover-text-primary btn-hover-icon-primary text-body ml-4 p-0"
                onClick={() =>
                  showModal("okrComment", {
                    id,
                    description,
                    progress,
                    status,
                    onUpdate: () => getKeyResultData(),
                  })
                }
              >
                <span className="svg-icon mr-1">
                  <SVG name="comment" />
                </span>
                {commentCount}
              </a>
              <div className="flex-grow-1" />
              <div>{statusToKo[status]}</div>
              <div className="w-50px text-right" style={{ color: statusColor }}>
                {progress}
              </div>
            </div>
            <div className="separator separator-solid my-3" />
          </div>
        </Scroll>
      </div>
    </Modal>
  );
}
