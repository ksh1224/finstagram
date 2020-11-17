import { statusToKo } from "constant/progress";
import { useModal } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import SVG from "utils/SVG";

type KeyResultItemType = {
  objectIndex?: number;
  animationIndex?: number;
  keyResult?: any;
  lastIndex: boolean;
};

export default function KeyResultItem({
  objectIndex,
  animationIndex,
  keyResult = {},
  lastIndex,
}: KeyResultItemType) {
  const { showModal } = useModal();
  const {
    description,
    progress,
    status,
    statusColor,
    keyResultHistory,
    commentCount,
  } = keyResult;
  return (
    <div
      id={`okr_ac_${animationIndex}_body_${objectIndex}`}
      className="collapse"
      data-parent={`#okr_ac_${animationIndex}`}
    >
      <div className="card-body">
        <div className="font-size-base font-weight-bold mb-3 mt-1">
          Key Results
        </div>
        <div className="d-flex flex-wrap py-3 pr-10">
          <div className="w-100 mb-3">{description}</div>
          <button
            type="button"
            className="btn label label-light-dark label-inline btn-hover-light-primary"
            data-toggle="modal"
            data-target="#modal_krHistory"
            onClick={() => showModal("okrHistory", keyResultHistory)}
          >
            History
          </button>
          <a
            href="javascript:;"
            className="btn btn-transparent-white btn-icon-dark-65 btn-text-dark-65 btn-hover-text-primary btn-hover-icon-primary text-body ml-4 p-0"
            data-toggle="modal"
            data-target="#modal_krComment"
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
        {!lastIndex && <div className="separator separator-solid my-3" />}
      </div>
    </div>
  );
}
