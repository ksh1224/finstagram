import React, { useEffect } from "react";
import { useMyFeedback } from "hooks/useRedux";
import MyFeedbackBody from "./MyFeedbackBody";
import MyFeedbackHeader from "./MyFeedbackHeader";

export default function MyFeedback() {
  const { isFetching, data, request } = useMyFeedback();
  console.log(data);
  return (
    <div className="col-auto h-sm-100 flex-grow-1 w-100px">
      <div className="card card-custom card-stretch rounded-bottom-0">
        <MyFeedbackHeader />
        <MyFeedbackBody />
      </div>
    </div>
  );
}
