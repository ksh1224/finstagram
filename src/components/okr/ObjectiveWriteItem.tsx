import IconPopover from "components/IconPopover";
import { statusToKo, statusType } from "constant/progress";
import { useMyOKR } from "hooks/useOKRRedux";
import React, { useEffect, useState } from "react";
import { OverlayTrigger } from "react-bootstrap";
import SVG from "utils/SVG";

const { IN_PROGRESS, COMPLETE, CANCEL } = statusType;

type ObjectiveWriteItemType = {
  count?: number;
  length?: number;
  onChange?: OKRChangeHandler;
  addObjective?: () => void;
  deleteObjective?: (index: number) => void;
  type?: "write" | "add" | "update";
  keyResults?: KeyResultType[];
} & ObjectiveType;

export default function ObjectiveWriteItem({
  id,
  count = 0,
  index = 0,
  length = 0,
  onChange,
  addObjective,
  deleteObjective,
  description,
  updateValues,
  type,
  keyResults,
  multiMetaDuration,
}: ObjectiveWriteItemType) {
  const { data } = useMyOKR();
  // eslint-disable-next-line consistent-return
  const countTypeNumber = () => {
    switch (type) {
      case "write":
        return count + 1;
      case "add":
        return data?.data?.objective.length + 1;
      case "update":
        return (
          data?.data?.objective?.findIndex(
            ({ id: objectiveId }: { id: any }) => objectiveId === id
          ) + 1 || 0
        );
      default:
        break;
    }
  };
  return (
    <div className="table-row">
      <div className="table-cell align-self-center">{`Objective ${countTypeNumber()}`}</div>
      <div className="table-cell">
        <textarea
          value={description}
          onChange={({ target }) =>
            onChange && onChange(index, { description: target.value })
          }
          className="form-control resize-none h-100 min-h-135px"
        />
      </div>
      <div className="table-cell d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center">
          {type === "update" ? (
            <select
              onChange={({ target }) =>
                onChange && onChange(index, { status: target.value })
              }
              className="custom-select form-control border-0 shadow-none pr-3 pl-0 py-0 bg-transparent bgi-position-x-right font-size-sm w-60px h-auto"
            >
              {[IN_PROGRESS, COMPLETE, CANCEL].map((value) => (
                <option
                  selected={value === updateValues?.status}
                  value={`${value}`}
                >
                  {statusToKo[value]}
                </option>
              ))}
            </select>
          ) : (
            <div className="font-size-sm">
              {updateValues?.status && statusToKo[updateValues?.status]}
            </div>
          )}
          <OverlayTrigger
            placement="left"
            overlay={
              <IconPopover title="OKR 추진 현황 관리">
                <p>
                  - 추진중 : 현재 추진 중인 OKR
                  <br />
                  - 추진 완료 : 해당 분기에 완수한 OKR
                  <br />- 추진 취소 : OKR 변경 사유에 해당되어 중도 진행이
                  취소된 OKR
                </p>
                <p className="font-weight-bolder">
                  목표 수립 단계에서는 &apos;추진중&apos;으로 설정
                </p>
              </IconPopover>
            }
          >
            <a className="btn btn-icon btn-circle btn-xs btn-hover-icon-primary">
              <span className="svg-icon svg-icon-md svg-icon-dark mr-0">
                <SVG xmlns="http://www.w3.org/2000/svg" name="question" />
              </span>
            </a>
          </OverlayTrigger>
        </div>
        <div className="d-flex justify-content-between mt-2 align-items-center">
          {type === "update" ? (
            <div className="font-size-sm">
              {`${((multiMetaDuration || 0) + 1) * 3}개월`}
            </div>
          ) : (
            <select
              className="custom-select form-control border-0 shadow-none pr-3 pl-0 py-0 bg-transparent bgi-position-x-right font-size-sm w-60px h-auto"
              onChange={({ target }) =>
                onChange &&
                onChange(index, { multiMetaDuration: Number(target.value) })
              }
            >
              {[0, 1].map((duration) => (
                <option
                  selected={duration === multiMetaDuration}
                  value={duration}
                >
                  {((duration || 0) + 1) * 3}개월
                </option>
              ))}
            </select>
          )}
          <OverlayTrigger
            placement="left"
            overlay={
              <IconPopover title="OKR 기간">
                <p>해당 Objective의 추진 기간 설정</p>
              </IconPopover>
            }
          >
            <a className="btn btn-icon btn-circle btn-xs btn-hover-icon-primary">
              <span className="svg-icon svg-icon-md svg-icon-dark mr-0">
                <SVG xmlns="http://www.w3.org/2000/svg" name="question" />
              </span>
            </a>
          </OverlayTrigger>
        </div>
        <div className="d-flex justify-content-between mt-2 align-items-center">
          {type === "update" ? (
            <div className="font-size-sm">
              {keyResults
                ? (
                    keyResults?.reduce((acc, value) => {
                      return acc + (value?.updateValues?.progress || 0);
                    }, 0) / keyResults?.length
                  ).toFixed(1)
                : 0}
            </div>
          ) : (
            <div className="font-size-sm">{updateValues?.progress || 0}</div>
          )}
          <OverlayTrigger
            placement="left"
            overlay={
              <IconPopover title="Objective의 점수 (Score)">
                <p>추천중, 추진 완료된 Key Result 점수의 평균 (자동 산출)</p>
                <p className="font-weight-bolder">
                  목표 수립 단계에서는 &apos;0점&apos;으로 설정
                </p>
              </IconPopover>
            }
          >
            <a className="btn btn-icon btn-circle btn-xs btn-hover-icon-primary">
              <span className="svg-icon svg-icon-md svg-icon-dark mr-0">
                <SVG xmlns="http://www.w3.org/2000/svg" name="question" />
              </span>
            </a>
          </OverlayTrigger>
        </div>
        <div className="flex-grow-1 d-flex flex-column justify-content-end mt-4">
          {!id && count !== 0 && (
            <button
              type="button"
              className="btn btn-light-danger btn-sm font-size-xs py-1 my-2"
              onClick={() => deleteObjective && deleteObjective(index)}
            >
              <span className="svg-icon">
                <SVG name="minus" />
              </span>
              삭제
            </button>
          )}
          {type === "write" && count === length - 1 && (
            <button
              type="button"
              className="btn btn-light-primary btn-sm font-size-xs py-1"
              onClick={() => addObjective && addObjective()}
            >
              <span className="svg-icon">
                <SVG name="plus" />
              </span>
              추가
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
