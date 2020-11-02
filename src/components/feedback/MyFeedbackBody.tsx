import React from "react";
import CustomSymbol from "components/symbol/CustomSymbol";
import { select, call } from "redux-saga/effects";
import MyFeedbackItem from "components/item/MyFeedbackItem";

export default function MyFeedbackBody() {
  return (
    <div className="card-body pt-2 overflow-y-auto">
      <div className="d-flex flex-column flex-center">
        <CustomSymbol />
        <a
          href="#"
          className="card-title font-weight-bolder text-dark-75 text-hover-primary font-size-h4 m-0 pt-4 pb-7"
        >
          경영정보팀 강혜원
        </a>
      </div>

      <div className="card card-custom bg-light-light shadow-none gutter-b">
        <div className="card-header border-0">
          <h4 className="card-title text-dark font-weight-bolder">칭찬 배지</h4>
        </div>
        <div className="card-body px-0 pt-0">
          <div className="feedback-icon-group card-spacer-x my-n5 py-5">
            <div className="text-nowrap mx-n2">
              <MyFeedbackItem />
            </div>
          </div>
        </div>
      </div>

      <div className="card card-custom bg-light-light shadow-none">
        <div className="card-header border-0">
          <h4 className="card-title text-dark">Feedback</h4>
        </div>
        <div className="card-body pt-0">
          <div className="row row-paddingless mb-10 text-center">
            <div className="col">
              <div className="mr-2">
                <div className="font-size-h4 text-dark-75 font-weight-bolder">
                  2
                </div>
                <div className="font-size-sm text-dark-50 font-weight-bold mt-1">
                  내가 받은 피드백
                </div>
              </div>
            </div>

            <div className="col">
              <div className="mr-2">
                <div className="font-size-h4 text-dark-75 font-weight-bolder">
                  14
                </div>
                <div className="font-size-sm text-dark-50 font-weight-bold mt-1">
                  내가 보낸 피드백
                </div>
              </div>
            </div>
          </div>
          <div className="border-top border-light-dark my-5" />
          <p className="text-dark-75 m-0 pt-5 font-weight-normal">
            내가 Feedback을 주고받은 동료들입니다.
          </p>

          <div className="d-flex gutter-t min-h-60px">
            <div className="d-flex w-150px">
              <div className="avatar symbol symbol-50 mr-3">
                <span className="symbol-label position-relative bg-transparent">
                  {/* <img class="rounded-circle object-fit-cover" src="http://storage.fnf.co.kr/emp_profile_images/2019070802265175.jpg/dims/resize/240x240/optimize/" alt=""> */}
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

              <div className="w-100px flex-grow-1 font-size-lg">
                <div className="font-weight-bold">강혜원</div>
                <small className="d-block text-truncate">경영정보팀</small>
              </div>
            </div>
            <div className="w-100px flex-grow-1 ml-5">
              <div className="chart-bar" data-sent="3" data-received="1" />
            </div>
          </div>

          <div className="d-flex gutter-t min-h-60px">
            <div className="d-flex w-150px">
              <div className="avatar symbol symbol-50 mr-3">
                <span className="symbol-label position-relative bg-transparent">
                  {/* <img class="rounded-circle object-fit-cover" src="http://storage.fnf.co.kr/emp_profile_images/2019070802265175.jpg/dims/resize/240x240/optimize/" alt=""> */}
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
              <div className="w-100px flex-grow-1 font-size-lg">
                <div className="font-weight-bold">강혜원</div>
                <small className="d-block text-truncate">경영정보팀</small>
              </div>
            </div>
            <div className="w-100px flex-grow-1 ml-5">
              <div className="chart-bar" data-sent="0" data-received="1" />
            </div>
          </div>

          <div className="d-flex gutter-t min-h-60px">
            <div className="d-flex w-150px">
              <div className="avatar symbol symbol-50 mr-3">
                <span className="symbol-label position-relative bg-transparent">
                  {/* <img class="rounded-circle object-fit-cover" src="http://pds.fnf.co.kr/hr_attach/2019083011150221.jpg/dims/resize/80x80/optimize/" alt=""> */}
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
              <div className="w-100px flex-grow-1 font-size-lg">
                <div className="font-weight-bold">이동국</div>
                <small className="d-block text-truncate">
                  디지털트랜스포메이션담당
                </small>
              </div>
            </div>
            <div className="w-100px flex-grow-1 ml-5">
              <div className="chart-bar" data-sent="4" data-received="0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
