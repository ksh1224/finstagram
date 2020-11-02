import React from "react";

export default function MyFeedbackHeader() {
  return (
    <div className="card-header border-0">
      <h3 className="card-title font-weight-bolder">My Feedback</h3>
      <div className="card-toolbar">
        <select className="custom-select form-control border-0 shadow-none pr-5 bgi-position-x-right">
          <option value="20_all">2020년 연 누적</option>
          <option value="20_3" selected>
            2020년 3분기
          </option>
          <option value="20_2">2020년 2분기</option>
          <option value="20_1">2020년 1분기</option>
          <option value="19_all">2019년 연 누적</option>
          <option value="19_4">2019년 4분기</option>
        </select>
      </div>
    </div>
  );
}
