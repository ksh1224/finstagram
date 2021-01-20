/* eslint-disable jsx-a11y/interactive-supports-focus */
import Profile from "components/Profile";
import React from "react";

export type Props = {
  contents?: any;
  buttonText?: string;
  action?: boolean;
  onClick?: () => void;
};

export default function ReviewListOneItem({
  contents,
  buttonText,
  action,
  onClick,
}: Props) {
  return (
    <div
      className="d-flex py-4 border-top border-light-dark justify-content-between"
      role="button"
      onClick={() => onClick && action && onClick()}
    >
      <div className="d-flex w-150px align-items-center">
        <div className="avatar symbol symbol-50 mr-4">
          <Profile user={contents} onClick={() => {}} />
        </div>
        <div className="overflow-hidden w-100px flex-grow-1 font-size-lg">
          <div className="font-weight-bold">{contents.name}</div>
          <small className="d-block text-truncate">
            {contents?.department || contents?.organization?.name}
          </small>
        </div>
      </div>
      <div className="d-flex flex-grow-1 flex-row align-items-center justify-content-end">
        <button
          type="button"
          className={`btn d-inline-block btn-sm ${
            typeof action === "undefined" || action
              ? "bg-primary"
              : "bg-secondary"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
