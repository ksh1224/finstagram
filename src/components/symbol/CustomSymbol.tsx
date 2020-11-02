import React from "react";

export default function CustomSymbol() {
  // 재사용될 가능성이 있는 symbol
  return (
    <div className="avatar symbol symbol-120">
      <span className="symbol-label position-relative bg-transparent">
        {/* <img class="rounded-circle object-fit-cover" src="http://storage.fnf.co.kr/emp_profile_images/2019070802265175.jpg/dims/resize/240x240/optimize/" alt="" /> */}
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
