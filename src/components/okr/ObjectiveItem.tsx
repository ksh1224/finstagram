import Profile from "components/Profile";
import { useAuth, useModal } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import { statusType, statusToKo } from "constant/progress";
import remove from "remove.scss";
import KeyResultItem from "./KeyResultItem";

type ObjectiveItemType = {
  objective?: any;
  objectIndex?: number;
  animationIndex?: number;
};

export default function ObjectiveItem({
  objective = {},
  objectIndex = 0,
  animationIndex = 0,
}: ObjectiveItemType) {
  const {
    description,
    progress,
    keyResult,
    status,
    statusColor,
    objectiveHistory,
  }: any = objective;
  const { showModal } = useModal();
  const [isButton, setIsButton] = useState(false);
  if (status)
    return (
      <div
        className="card"
        style={!keyResult && keyResult.length === 0 ? remove : undefined}
      >
        <div
          className="card-header"
          id={`okr_ac_${animationIndex}_head_${objectIndex}`}
        >
          <div
            className="card-title collapsed flex-wrap pr-15"
            data-toggle="collapse"
            data-target={`#okr_ac_${animationIndex}_body_${objectIndex}`}
          >
            <div className="d-flex w-100 font-size-base">
              <div className="w-100px">{`objective ${objectIndex + 1}`}</div>
              <div className="w-100px flex-grow-1 mr-10">{description}</div>
              <div>{statusToKo[status]}</div>
              <div className="w-50px text-right" style={{ color: statusColor }}>
                {progress}
              </div>
            </div>
            {objectiveHistory && objectiveHistory.length !== 0 && (
              <div className="d-flex justify-content-between w-100 mt-3">
                <button
                  type="button"
                  className="btn label label-light-dark label-inline btn-hover-light-primary"
                  onMouseEnter={() => setIsButton(true)}
                  onMouseLeave={() => setIsButton(false)}
                  onClick={() => showModal("okrHistory", objectiveHistory)}
                >
                  History
                </button>
              </div>
            )}
          </div>
        </div>
        {keyResult &&
          keyResult.map(
            (data: any, index: number) =>
              data?.status &&
              data?.status !== statusType.CANCEL && (
                <KeyResultItem
                  animationIndex={isButton ? -1 : animationIndex}
                  objectIndex={objectIndex}
                  keyResult={data}
                  lastIndex={keyResult.length - 1 === index}
                />
              )
          )}
      </div>
    );
  return <></>;
}
