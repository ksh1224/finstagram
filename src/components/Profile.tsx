/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";

type ProfileType = {
  id?: number;
  src?: string;
};

export default function Profile({ id, src }: ProfileType) {
  return (
    <div
      className="avatar symbol symbol-40 cursor-pointer"
      data-toggle="modal"
      data-target="#modal_userProfile"
      onClick={() => console.log("userId", id)}
    >
      <span className="symbol-label position-relative bg-transparent">
        <img className="rounded-circle object-fit-cover" src={src} alt="" />
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
          <circle
            className="circle-chart__bar animate"
            stroke="#00acc1"
            strokeWidth="2"
            strokeDasharray="37,100"
            strokeLinecap="round"
            fill="none"
            cx="16.91549431"
            cy="16.91549431"
            r="15.91549431"
          />
        </svg>
      </span>
    </div>
  );
}

Profile.defaultProps = {
  src:
    "http://pds.fnf.co.kr/emp_profile_images/2020042706023132.jpg/dims/cropcenter/512x512/optimize//dims/resize/100x100/optimize/",
};
