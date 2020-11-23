/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Profile from "components/Profile";
import { Modal } from "react-bootstrap";
import { useModal, useBadgeList } from "hooks/useRedux";
import { useFeedback } from "hooks/useFeedBackRedux";
import React, { useEffect, useState, createRef } from "react";
import { statusToKo } from "constant/progress";

export default function OKRHistoryModal() {
  const { modals, closeModal } = useModal();
  const okrHistoryModal = modals.find(
    (modal: any) => modal.name === "okrHistory"
  );
  return (
    <Modal
      show={!!okrHistoryModal}
      animation
      centered
      onHide={() => closeModal("okrHistory")}
      id="modal_krHistory"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title6">History</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="닫기"
            onClick={() => closeModal("okrHistory")}
          >
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </div>
        <div className="modal-body">
          <table className="w-100">
            <thead>
              <tr>
                <th>날짜</th>
                <th>Status</th>
                <th>진척도</th>
                <th>근거,이유</th>
              </tr>
            </thead>
            <tbody>
              {okrHistoryModal?.param &&
                okrHistoryModal?.param.map((obj: any) => {
                  let className = "text-danger";
                  if (obj?.progress > 0.6) className = "text-success";
                  else if (obj?.progress > 0.3) className = " text-warning";
                  return (
                    <tr>
                      <td>{obj?.createdAt.split("T")[0]}</td>
                      <td>{statusToKo[obj?.status]}</td>
                      <td className={className}>{obj?.progress}</td>
                      <td>{obj.description}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
