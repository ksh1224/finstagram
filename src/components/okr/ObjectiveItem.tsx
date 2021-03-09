import Profile from "components/Profile";
import { useAuth, useModal } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import { statusType, statusToKo } from "constant/progress";
import { Accordion, Card, useAccordionToggle, Button } from "react-bootstrap";
import SVG from "utils/SVG";
import { useMyOKR } from "hooks/useOKRRedux";
import KeyResultItem from "./KeyResultItem";

type ObjectiveItemType = {
  objective?: any;
  objectIndex?: number;
  user?: any;
  isOpen?: (id: number) => boolean;
  clickItem?: (id: number) => void;
  onUpdateOKR?: (id: number) => void;
};

export default function ObjectiveItem({
  objective = {},
  objectIndex = 0,
  user,
  isOpen = () => false,
  clickItem = () => {},
  onUpdateOKR,
}: ObjectiveItemType) {
  const {
    id,
    description,
    progress,
    keyResult,
    status,
    statusColor,
    objectiveHistory,
    multiMeta,
    remainingDays,
  }: any = objective;
  const { data: responseData = {} } = useMyOKR();
  const { showModal } = useModal();
  const decoratedOnClick = useAccordionToggle(`${objectIndex}`, () => {
    clickItem(objectIndex);
  });

  const { isWrite, isModifiable } = responseData;

  if (status)
    return (
      <div
        className={`card ${
          !keyResult ||
          keyResult.findIndex(
            (data: any) => data?.status && data?.status !== statusType.CANCEL
          ) === -1
            ? ""
            : "data"
        } ${isOpen(objectIndex) ? "" : "off"}`}
      >
        <Accordion.Toggle
          as={Card.Header}
          eventKey={`${objectIndex}`}
          onClick={decoratedOnClick}
        >
          <div className="card-header">
            <div
              className={`card-title flex-wrap pr-15 ${
                isOpen(objectIndex) ? "" : "collapsed"
              }`}
            >
              <div className="d-flex w-100 font-size-base">
                <div className="w-100px">
                  {`objective ${objectIndex + 1}`}
                  {typeof remainingDays === "number" && remainingDays > 0 && (
                    <>
                      <span className="d-inline d-lg-block ml-2 ml-lg-0 font-size-xs text-dark-50">
                        {remainingDays === 0
                          ? "d-day"
                          : `(D-${remainingDays}일)`}
                      </span>
                    </>
                  )}
                </div>
                <div className="w-100px flex-grow-1 mr-10">{description}</div>
                <div className="w-50px">{statusToKo[status]}</div>
                <div
                  className="w-35px text-right"
                  style={{ color: statusColor }}
                >
                  {progress}
                </div>
              </div>
              {objectiveHistory && objectiveHistory.length !== 0 && (
                <div className="d-flex justify-content-between w-100 mt-3">
                  <button
                    type="button"
                    className="btn label label-light-dark label-inline btn-hover-light-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      showModal("okrHistory", objectiveHistory);
                    }}
                  >
                    History
                  </button>
                  {!user && (isModifiable || isWrite) && (
                    <button
                      type="button"
                      className="btn label label-light-dark label-inline btn-hover-light-primary btn-hover-icon-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onUpdateOKR && id) onUpdateOKR(id);
                      }}
                    >
                      <span className="svg-icon svg-icon-1x svg-icon-dark">
                        <SVG name="write" />
                      </span>
                      Update
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={`${objectIndex}`} className="card-body">
          <>
            {keyResult &&
              keyResult.map(
                (data: any, index: number) =>
                  data?.status &&
                  data?.status !== statusType.CANCEL && (
                    <KeyResultItem
                      key={data?.id}
                      objectIndex={objectIndex}
                      keyResult={data}
                      lastIndex={keyResult.length - 1 === index}
                      index={index}
                    />
                  )
              )}
          </>
        </Accordion.Collapse>
      </div>
    );
  return <></>;
}
