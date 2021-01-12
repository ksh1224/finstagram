import IconPopover from "components/IconPopover";
import React, { useEffect, useState } from "react";
import { OverlayTrigger } from "react-bootstrap";
import SVG from "utils/SVG";
import { statusToKo, statusType } from "constant/progress";

const { IN_PROGRESS, COMPLETE, CANCEL } = statusType;

type KeyResultWriteItemType = {
  count: number;
  length?: number;
  onChange?: OKRChangeHandler;
  addKeyResult?: (index: number) => void;
  deleteKeyResult?: (index: number) => void;
  type?: "write" | "add" | "update";
} & KeyResultType;

export default function KeyResultWriteItem({
  count = 0,
  index = 0,
  length = 0,
  onChange,
  addKeyResult,
  deleteKeyResult,
  description,
  updateValues,
  objectiveIndex,
  type,
  id,
}: KeyResultWriteItemType) {
  return (
    <div className="table-row bg-light-o-100">
      <div className="table-cell align-self-center">
        Key-<span className="d-inline-block">{`Result ${count + 1}`}</span>
      </div>
      <div className="table-cell">
        <textarea
          className="form-control resize-none h-100 min-h-135px"
          value={description}
          onChange={({ target }) =>
            onChange &&
            onChange(index, { description: target.value }, objectiveIndex)
          }
        />
      </div>
      <div className="table-cell d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center">
          {type === "update" ? (
            <select
              onChange={({ target }) =>
                onChange &&
                onChange(index, { status: target.value }, objectiveIndex)
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
                <SVG name="question" />
              </span>
            </a>
          </OverlayTrigger>
        </div>
        <div className="d-flex justify-content-between mt-2 align-items-center">
          {type === "update" ? (
            <select
              onChange={({ target }) =>
                onChange &&
                onChange(
                  index,
                  { progress: Number(target.value) },
                  objectiveIndex
                )
              }
              className="custom-select form-control border-0 shadow-none pr-3 pl-0 py-0 bg-transparent bgi-position-x-right font-size-sm w-60px h-auto"
            >
              {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map(
                (value) => (
                  <option
                    selected={value === updateValues?.progress}
                    value={value}
                  >
                    {value}
                  </option>
                )
              )}
            </select>
          ) : (
            <div className="font-size-sm">{updateValues?.progress}</div>
          )}
          <OverlayTrigger
            placement="left"
            overlay={
              <IconPopover title="Key Result의 점수 (Score)">
                <p>
                  리뷰 시점의 Key Result 목표 대비 달성 수준에 기반해 점수 부여
                </p>
                <p className="font-weight-bolder">
                  목표 수립 단계에서는 &apos;0점&apos;으로 설정
                </p>
              </IconPopover>
            }
          >
            <a className="btn btn-icon btn-circle btn-xs btn-hover-icon-primary">
              <span className="svg-icon svg-icon-md svg-icon-dark mr-0">
                <SVG name="question" />
              </span>
            </a>
          </OverlayTrigger>
        </div>
        <div className="flex-grow-1 d-flex flex-column justify-content-end mt-4">
          {!id && count !== 0 && (
            <button
              type="button"
              className="btn btn-light-danger btn-sm font-size-xs py-1 my-2"
              onClick={() => deleteKeyResult && deleteKeyResult(index)}
            >
              <span className="svg-icon">
                <SVG name="minus" />
              </span>
              삭제
            </button>
          )}
          {count === length - 1 && (
            <button
              type="button"
              className="btn btn-light-primary btn-sm font-size-xs py-1"
              onClick={() =>
                addKeyResult &&
                typeof objectiveIndex === "number" &&
                addKeyResult(objectiveIndex)
              }
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
