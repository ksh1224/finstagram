import UserOKR from "components/okr/UserOKR";
import TeamList from "components/okr/TeamList";
import TeamOKR from "components/okr/TeamOKR";
import { useMyOKR, useTeamOKR, useUserOKR } from "hooks/useOKRRedux";
import React, { useEffect } from "react";

type Props = {
  title?: string;
  period?: "BEFORE" | "Write" | "END";
  periodText?: string;
  buttonText?: string;
  total?: number;
  count?: number;
  onClick?: () => void;
  header?: JSX.Element | JSX.Element[];
  children?: JSX.Element | JSX.Element[];
  removeBottom?: boolean;
  removeCenterText?: boolean;
  finished?: boolean;
};

export default function ReviewCardItem({
  title,
  period,
  periodText,
  buttonText,
  total = 0,
  count,
  onClick,
  header,
  children,
  removeBottom,
  removeCenterText,
  finished,
}: Props) {
  let centerText = "진행 가능";
  if (finished)
    switch (period) {
      case "END":
        centerText = "작성기간이 종료 되었습니다.";
        break;

      default:
        centerText = "진행 완료";
        break;
    }
  else
    switch (period) {
      case "END":
        centerText = "작성기간이 종료 되었습니다.";
        break;
      case "BEFORE":
        centerText = periodText || "";
        break;
      default:
        if (!count || count === 0) centerText = "진행 가능";
        else if (count < total) centerText = `${count}/${total}`;
        else centerText = "진행 완료";
        break;
    }

  return (
    <div className={`card card-custom ${!removeBottom ? "gutter-b" : ""}`}>
      <div className="row card-header flex-nowrap align-items-center border-0 mx-0">
        <h4 className="d-block card-title font-weight-bolder text-dark font-size-lg text-truncate">
          {title}
        </h4>
        {(period === "Write" || period === "END") && (
          <div className="card-toolbar">
            <span className="label label-md label-light-dark label-inline label-pill ml-2 text-nowrap">
              {periodText}
            </span>
          </div>
        )}
      </div>
      {removeCenterText && (period === "Write" || period === "END") ? (
        <></>
      ) : (
        <div className="card-body pt-2">
          <div className="text-center">
            <p className="font-size-h4 text-dark-75 font-weight-bolder mb-8">
              {centerText}
            </p>
            {((period === "Write" || period === "END") && header) || (
              <button
                type="button"
                className={`btn w-100 ${
                  period === "Write" && !finished
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
                data-toggle="modal"
                data-target="#modal_workReview"
                onClick={() =>
                  (period === "Write" || period === "END") &&
                  onClick &&
                  onClick()
                }
              >
                {buttonText ?? "Review 작성"}
              </button>
            )}
          </div>
        </div>
      )}
      {period === "Write" || period === "END" ? children : undefined}
    </div>
  );
}
