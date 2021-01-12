/* eslint-disable jsx-a11y/interactive-supports-focus */
import Profile from "components/Profile";
import React from "react";

export type Props = {
  contents?: any;
  buttonText?: string;
  action?: boolean;
  description?: string;
  between?: boolean;
  onClick?: () => void;
};

export default function ReviewListItem({
  contents,
  buttonText,
  action,
  description,
  between,
  onClick,
}: Props) {
  return (
    <div
      className="d-flex py-4 border-top border-light-dark justify-content-between"
      role="button"
      onClick={() => onClick && onClick()}
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
      {between ? (
        <div className="d-flex w-100px align-items-center justify-content-center">
          <button
            type="button"
            className={`btn btn-sm w-75px px-0 text-nowrap font-size-xs ${
              typeof action === "undefined" || action
                ? "btn-primary"
                : "btn-secondary"
            }`}
          >
            {buttonText}
          </button>
        </div>
      ) : (
        <div className="row flex-grow-1 mx-0">
          <div className="d-flex flex-column col-6 p-0 align-items-center justify-content-center align-items-center justify-content-center">
            <span className="text-center word-keep">
              {description || contents?.description}
            </span>
          </div>
          <div className="d-flex flex-column col-6 p-0 align-items-center justify-content-center">
            <button
              type="button"
              className={`btn btn-sm w-75px px-0 text-nowrap font-size-xs ${
                typeof action === "undefined" || action
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
            >
              {buttonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
