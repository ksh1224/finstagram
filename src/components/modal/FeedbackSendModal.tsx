/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Profile from "components/Profile";
import { useModal, useBadgeList } from "hooks/useRedux";
import React, { useEffect, useState } from "react";

export default function FeedbackModal() {
  const [type, setType] = useState<"PRAISE" | "ADVICE">("PRAISE");
  const [select, setSelect] = useState<number>(0);
  const { feedbackUser, isShowFeedback } = useModal();
  const { data } = useBadgeList();

  return (
    <div
      className="modal fade"
      id="modal_sendFeedback"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="modal_sendFeedback"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-md"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header border-0 mb-n12 justify-content-end">
            <button
              type="button"
              className="close position-relative zindex-1"
              data-dismiss="modal"
              aria-label="닫기"
            >
              <i aria-hidden="true" className="ki ki-close" />
            </button>
          </div>

          <div className="modal-body">
            <div className="d-flex flex-column align-items-center">
              <Profile user={feedbackUser} type="feedbackModal" />

              <div className="font-weight-bolder text-dark-75 font-size-lg m-0 pt-2">
                강혜원
              </div>

              <div
                className="btn-group card-toolbar mt-5 mb-10"
                role="group"
                data-toggle="switchBtn"
                data-act-css="btn-primary btn-hover-primary"
                data-inact-css="btn-secondary"
              >
                <button
                  type="button"
                  className={`btn btn-sm w-100px ${
                    type === "PRAISE"
                      ? "btn-primary btn-hover-primary"
                      : "btn-secondary"
                  }`}
                  onClick={() => {
                    setType("PRAISE");
                  }}
                >
                  칭찬
                </button>
                <button
                  type="button"
                  className={`btn btn-sm w-100px ${
                    type === "ADVICE"
                      ? "btn-primary btn-hover-primary"
                      : "btn-secondary"
                  }`}
                  onClick={() => {
                    setType("ADVICE");
                  }}
                >
                  조언
                </button>
              </div>
            </div>

            <div className="tab-content">
              {type === "PRAISE" && (
                <div>
                  <div className="feedback-icon-group w-100">
                    <div className="text-nowrap d-flex justify-content-between">
                      {data?.CONTRIBUTION?.map((badge: any, i: number) => (
                        <div
                          key={badge?.id}
                          className="d-inline-block text-center"
                          onClick={() => setSelect(i)}
                        >
                          <span className="feedback-icon hover-on text-center cursor-pointer">
                            <img
                              alt=""
                              src={
                                select === i
                                  ? badge?.selectedFileUrl
                                  : badge?.fileUrl
                              }
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "25px",
                                border: `1.5px solid ${
                                  select === i ? "#000" : "#5555"
                                }`,
                              }}
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="separator separator-solid my-6 w-100" />

                  <div className="d-flex justify-content-between">
                    <p>동료에 대해 칭찬하고 싶은 내용을 작성해주세요.</p>
                    <span className="text-muted font-size-sm">0/100</span>
                  </div>

                  <textarea
                    className="form-control resize-none"
                    id="exampleTextarea"
                    rows={5}
                  />

                  <ol
                    className="p-0 mt-2 mb-0 font-size-sm text-black-50"
                    style={{ listStylePosition: "inside" }}
                  >
                    <li>칭찬배지와 관련한 행동을 구체적으로 적어주세요.</li>
                    <li>
                      동료의 행동이 본인에게 어떻게 도움이 되었는지
                      기재해주세요.
                    </li>
                  </ol>
                </div>
              )}

              {type === "ADVICE" && (
                <div>
                  <div className="separator separator-solid mb-6 w-100" />

                  <div className="d-flex justify-content-between">
                    <p>
                      &apos;협업&apos;또는 &apos;성과추진활동&apos;과 관련해
                      조언해주고 싶은 내용을 작성해주세요.
                    </p>
                    <span className="text-muted font-size-sm">0/100</span>
                  </div>

                  <textarea
                    className="form-control resize-none"
                    id="exampleTextarea"
                    rows={5}
                  />

                  <ol
                    className="p-0 mt-2 mb-0 font-size-sm text-black-50"
                    style={{ listStylePosition: "inside" }}
                  >
                    <li>
                      구체적인 행동(관찰 가능한 행동)에 초점을 맞추어 조언해
                      주세요.
                    </li>
                    <li>
                      조언하고 싶은 내용을 건설적으로 제안해 주세요.
                      <br />
                      *Feedback 내용은 선택하신 동료만 확인 가능합니다.
                    </li>
                  </ol>

                  <div className="dropzone dropzone-multi mt-6 attch_file">
                    <div className="dropzone-panel mb-lg-0 mb-2">
                      <a className="dropzone-select btn btn-light-primary font-weight-bold btn-sm">
                        파일 첨부
                      </a>
                    </div>
                    <div className="dropzone-items">
                      <div
                        className="dropzone-item"
                        style={{ display: "none" }}
                      >
                        <div className="dropzone-file">
                          <div
                            className="dropzone-filename"
                            title="some_image_file_name.jpg"
                          >
                            <span data-dz-name="">
                              some_image_file_name.jpg
                            </span>
                            <strong>
                              (<span data-dz-size="">340kb</span>)
                            </strong>
                          </div>
                          <div
                            className="dropzone-error"
                            data-dz-errormessage=""
                          />
                        </div>
                        <div className="dropzone-progress">
                          <div className="progress">
                            <div
                              className="progress-bar bg-primary"
                              role="progressbar"
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-valuenow={0}
                              data-dz-uploadprogress=""
                            />
                          </div>
                        </div>
                        <div className="dropzone-toolbar">
                          <span className="dropzone-delete" data-dz-remove="">
                            <i className="flaticon2-cross" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer border-0 p-0 mt-5">
            <button
              type="button"
              className="btn btn-lg btn-primary w-100 m-0 rounded-0"
            >
              보내기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
