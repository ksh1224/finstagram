import { statusToKo } from "constant/progress";
import { useModal } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import SVG from "utils/SVG";
import { Accordion } from "react-bootstrap";

type KeyResultItemType = {
  objectIndex?: number;
  keyResult?: any;
  lastIndex: boolean;
  index?: number;
};

export default function KeyResultItem({
  objectIndex,
  keyResult = {},
  lastIndex,
  index,
}: KeyResultItemType) {
  const { showModal } = useModal();
  const {
    id,
    description,
    progress,
    status,
    statusColor,
    keyResultHistory,
    commentCount,
  } = keyResult;

  return (
    <Accordion.Collapse eventKey={`${objectIndex}`} data-hoit={`${objectIndex}`}>
      <div className="card-body">
        <div className="font-size-base font-weight-bold mb-3 mt-1">
          Key-
          <span className="d-inline-block">
            Result {index === undefined ? "" : index + 1}
          </span>
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
              showModal("okrComment", { id, description, progress, status })
            }
          >
            <span className="svg-icon mr-1">
              <SVG name="comment" />
            </span>
            {commentCount}
          </a>
          <div className="flex-grow-1" />
          <div className="w-50px">{statusToKo[status]}</div>
          <div className="w-35px text-right" style={{ color: statusColor }}>
            {progress}
          </div>
        </div>
        {!lastIndex && <div className="separator separator-solid my-3" />}
      </div>
    </Accordion.Collapse>
  );
}
