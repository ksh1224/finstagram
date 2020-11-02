import Profile from "components/Profile";
import SVG from "utils/SVG";
import React, { useState } from "react";

export default function FeedListItem() {
  const [open, setOpen] = useState(false);
  return (
    <div className="card card-custom gutter-b">
      <div className="card-body">
        <div>
          <div className="d-flex align-items-center">
            <div className="feedback-icon w-50px h-50px mr-5">
              <svg
                className="bg-light-light rounded-lg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 90 90"
              />
            </div>

            <div className="d-flex flex-column flex-grow-1 w-100px">
              <span className="d-flex justify-content-between align-items-center text-dark my-1 font-size-lg font-weight-bolder">
                <span>경영정보팀 이성현</span>
                <div className="avatar symbol symbol-25">
                  {/* <Profile /> */}
                </div>
              </span>
              <span className="d-flex justify-content-between align-items-center text-dark-50 font-weight-bold">
                <span>Form 디지털트랜스포메이션담당 이동국</span>
                <div className="avatar symbol symbol-25">
                  {/* <Profile /> */}
                </div>
              </span>
            </div>
          </div>

          <div>
            <div className="text-dark-75 font-size-lg font-weight-normal pt-5">
              <p>
                VPN 저희팀 전체 설정하는데 야근까지 하면서 챙겨 주셔서
                고맙습니다.
              </p>
            </div>
            <div className="separator separator-solid mt-6 mb-2" />

            <div className="d-flex align-items-center mb-n2">
              <button
                type="button"
                className="btn btn-hover-text-primary btn-hover-icon-primary btn-sm btn-text-dark-50 rounded font-weight-bolder font-size-sm p-2 mr-2"
                data-toggle="collapse"
                data-target="#cmt-feedback-feedback-000"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
              >
                <span className="svg-icon svg-icon-md mr-3">
                  <SVG name="comment" />
                </span>
                24
              </button>
              <button
                type="button"
                className="btn btn-sm btn-text-dark-50 btn-hover-icon-danger btn-hover-text-danger bg-hover-light-danger font-weight-bolder rounded font-size-sm p-2"
              >
                <span className="svg-icon svg-icon-md svg-icon-dark-50 pr-1">
                  <SVG name="like" />
                </span>
                75
              </button>
              <div className="dropdown dropdown-inline">
                <button
                  type="button"
                  className="btn btn-sm btn-hover-icon-dark bg-hover-light font-weight-bolder rounded font-size-sm p-2 ml-2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="svg-icon m-0">
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect x="0" y="0" width="24" height="24" />
                        <circle fill="#000000" cx="5" cy="12" r="2" />
                        <circle fill="#000000" cx="12" cy="12" r="2" />
                        <circle fill="#000000" cx="19" cy="12" r="2" />
                      </g>
                    </svg>
                  </span>
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="javascript:;">
                    삭제하기
                  </a>
                  <a className="dropdown-item" href="javascript:;">
                    수정하기
                  </a>
                </div>
              </div>
              <span className="w-100px flex-grow-1 text-right text-dark-50 font-size-sm">
                2020-09-13 16:32
              </span>
            </div>
            <div className="pt-5 collapse" id="cmt-feedback-feedback-000">
              <div>sss</div>
              <div>sss</div>
              <div>sss</div>
              <div>sss</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
