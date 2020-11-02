import React from "react";
import MyFeedbackBody from "./MyFeedbackBody";
import MyFeedbackHeader from "./MyFeedbackHeader";

export default function MyFeedback() {
  return (
    <div className="col-auto h-sm-100 flex-grow-1 w-100px">
      <div className="card card-custom card-stretch rounded-bottom-0">
        <MyFeedbackHeader />
        <MyFeedbackBody />
      </div>
    </div>
  );
}
