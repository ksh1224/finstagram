/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useAuth, useModal } from "hooks/useRedux";
import React from "react";

type ProfileType = {
  user?: {
    id?: number;
    username?: string;
    name?: string;
    profileImageUrl?: string;
    organization?: { name?: string };
  };
  width?: number;
  type?: "default" | "item" | "feedbackModal";
  className?: string;
  onClick?: () => void;
};

export default function Profile({
  width,
  type,
  user,
  onClick,
  className,
}: ProfileType) {
  let wrapClassName = "avatar symbol symbol-40 cursor-pointer";
  switch (type) {
    case "item":
      wrapClassName = "avatar symbol symbol-25 cursor-pointer";
      break;

    case "feedbackModal":
      wrapClassName = "avatar symbol symbol-60 cursor-pointer";
      break;

    default:
      break;
  }
  const { showModal } = useModal();
  const { user: my } = useAuth();
  return (
    <div
      className={`${
        width ? `avatar symbol symbol-${width} cursor-pointer` : wrapClassName
      } ${className || ""}`}
      onClick={
        onClick
          ? () => onClick()
          : () =>
              user && user.id !== my.id && showModal("userProfile", { user })
      }
    >
      <span className="symbol-label position-relative bg-transparent">
        <img
          className="rounded-circle object-fit-cover"
          src={
            user?.profileImageUrl ||
            "https://pds.joins.com/news/component/htmlphoto_mmdata/202001/15/73d1ac33-95b5-4d41-9fe4-9f8c4490d2d7.jpg"
          }
          alt=""
        />
        <svg
          className="circle-chart position-absolute top-0 left-0 w-100 h-100"
          viewBox="0 0 33.83098862 33.83098862"
          width="200"
          height="200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="circle-chart__bg"
            stroke="#e8ddff"
            strokeWidth="2"
            fill="none"
            cx="16.91549431"
            cy="16.91549431"
            r="15.91549431"
          />
          {/* <circle
            className="circle-chart__bar animate"
            stroke="#00acc1"
            strokeWidth="2"
            strokeDasharray="37,100"
            strokeLinecap="round"
            fill="none"
            cx="16.91549431"
            cy="16.91549431"
            r="15.91549431"
          /> */}
        </svg>
      </span>
    </div>
  );
}

Profile.defaultProps = {
  user: {
    profileImageUrl:
      "https://pds.joins.com/news/component/htmlphoto_mmdata/202001/15/73d1ac33-95b5-4d41-9fe4-9f8c4490d2d7.jpg",
  },
  type: "default",
  width: null,
  onClick: null,
  className: "",
};
