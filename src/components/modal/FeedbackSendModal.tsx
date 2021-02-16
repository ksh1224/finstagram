/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Profile from "components/Profile";
import { Modal } from "react-bootstrap";
import { useModal, useBadgeList } from "hooks/useRedux";
import { useFeedback } from "hooks/useFeedBackRedux";
import React, { useEffect, useState, createRef } from "react";

export default function FeedbackSendModal() {
  const fileRef = createRef<HTMLInputElement>();
  const textLimit = 100;
  const [type, setType] = useState<"PRAISE" | "ADVICE">("PRAISE");
  const [select, setSelect] = useState(0);
  const [contents, setContents] = useState("");
  const [file, setFile] = useState<any>(null);
  const [prevFileName, setPrevFileName] = useState<string>();
  const { feedbackSend } = useFeedback();
  const { modals, closeModal } = useModal();
  const { data: dadgeList } = useBadgeList();
  const [show, setShow] = useState(false);
  const sendFeedbackModal = modals.find(
    (modal: any) => modal.name === "sendFeedback"
  );
  const updateFeedbackModal = modals.find(
    (modal: any) => modal.name === "updateSendFeedback"
  );
  const feed = updateFeedbackModal?.param;

  const close = () => {
    if (sendFeedbackModal || updateFeedbackModal) {
      setShow(false);
      setTimeout(() => {
        if (sendFeedbackModal) closeModal("sendFeedback");
        else {
          closeModal("updateSendFeedback");
          setPrevFileName(undefined);
        }
        setSelect(0);
        setContents("");
        setFile(null);
      }, 300);
    }
  };

  function sendFeedback() {
    if (sendFeedbackModal) {
      feedbackSend(
        type,
        sendFeedbackModal?.param,
        dadgeList?.CONTRIBUTION[select],
        contents,
        file && file[0]
      );
      close();
    }
  }

  function updateFeedback() {
    if (updateFeedbackModal) {
      feedbackSend(
        type,
        sendFeedbackModal?.param,
        dadgeList?.CONTRIBUTION[select],
        contents,
        file && file[0],
        feed?.id
      );
      close();
    }
  }

  useEffect(() => {
    if (updateFeedbackModal) {
      if (feed?.feedbackBadge) {
        const findIndex = dadgeList?.CONTRIBUTION.findIndex(
          (badge: any) => badge.id === feed?.feedbackBadge.id
        );
        if (findIndex >= 0) setSelect(findIndex);
      }
      setType(feed?.type);
      setContents(feed?.contents);
      setPrevFileName(feed?.fileName);
      setShow(true);
    }
  }, [updateFeedbackModal]);

  useEffect(() => {
    if (sendFeedbackModal) {
      setShow(true);
    }
  }, [sendFeedbackModal]);

  return (
    <Modal show={show} animation centered onHide={() => close()}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">피드백 보내기</h3>
          <button
            type="button"
            className="close position-relative zindex-1"
            data-dismiss="modal"
            aria-label="닫기"
            onClick={() => close()}
          >
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </div>

        <div className="modal-body">
          <div className="d-flex flex-column align-items-center">
            <Profile
              user={
                sendFeedbackModal ? sendFeedbackModal?.param : feed?.sendUser
              }
              type="feedbackModal"
            />

            <div className="font-weight-bolder text-dark-75 font-size-lg m-0 pt-2">
              {sendFeedbackModal
                ? sendFeedbackModal?.param.name
                : feed?.sendUser.name}
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
                제안
              </button>
            </div>
          </div>

          <div className="tab-content">
            {type === "PRAISE" && (
              <div>
                <div className="feedback-icon-group w-100">
                  <div className="text-nowrap d-flex justify-content-between">
                    {dadgeList?.CONTRIBUTION?.map((badge: any, i: number) => (
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
                                ? badge?.selectedFileUrlHttps
                                : badge?.fileUrlHttps
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
                        <div className="mt-4 font-size-sm text-dark-50 text-truncate">
                          {badge?.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="separator separator-solid my-6 w-100" />

                <div className="d-flex justify-content-between">
                  <p>동료에 대해 칭찬하고 싶은 내용을 작성해주세요.</p>
                  <span className="text-muted font-size-sm">{`${contents.length}/${textLimit}`}</span>
                </div>

                <textarea
                  className="form-control resize-none"
                  id="exampleTextarea"
                  rows={5}
                  value={contents}
                  onChange={({ target }) =>
                    setContents(
                      target.value.length <= textLimit
                        ? target.value
                        : target.value.substr(0, textLimit)
                    )
                  }
                />

                <ol
                  className="p-0 mt-2 mb-0 font-size-sm text-black-50"
                  style={{ listStylePosition: "inside" }}
                >
                  <li>칭찬배지와 관련한 행동을 구체적으로 적어주세요.</li>
                  <li>
                    동료의 행동이 본인에게 어떻게 도움이 되었는지 기재해주세요.
                  </li>
                </ol>
              </div>
            )}

            {type === "ADVICE" && (
              <div>
                <div className="separator separator-solid mb-6 w-100" />

                <div className="d-flex justify-content-between">
                  <p>
                    &#39;협업&#39; 또는 &#39;성과추진활동&#39;과 관련해 동료가
                    보완하면 좋을 내용에 대해 구체적 / 건설적으로 제안해주세요.
                  </p>
                  <span className="text-muted font-size-sm">{`${contents.length}/${textLimit}`}</span>
                </div>

                <textarea
                  className="form-control resize-none"
                  id="exampleTextarea"
                  rows={5}
                  value={contents}
                  onChange={({ target }) =>
                    setContents(
                      target.value.length <= textLimit
                        ? target.value
                        : target.value.substr(0, textLimit)
                    )
                  }
                />

                <ol
                  className="p-0 mt-2 mb-0 font-size-sm text-black-50"
                  style={{ listStylePosition: "inside" }}
                >
                  *Feedback 내용은 선택하신 동료만 확인 가능합니다.
                </ol>
                <input
                  ref={fileRef}
                  type="file"
                  onChange={({ target }) => setFile(target.files)}
                  style={{ display: "none" }}
                />
                <div className="dropzone dropzone-multi mt-6 attch_file">
                  <div className="dropzone-panel mb-lg-0 mb-2">
                    <a
                      className="dropzone-select btn btn-light-primary font-weight-bold btn-sm"
                      onClick={() => fileRef.current?.click()}
                    >
                      파일 첨부
                    </a>
                  </div>
                  <div className="dropzone-items">
                    {!!file && !!file[0] ? (
                      <div className="dropzone-item">
                        <div className="dropzone-file">
                          <div
                            className="dropzone-filename"
                            title={file[0].name || prevFileName}
                          >
                            <span data-dz-name="">
                              {file[0].name || prevFileName}
                            </span>
                            <strong>
                              (
                              <span data-dz-size={file[0].size}>
                                {`${file[0].size}KB`}
                              </span>
                              )
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
                            <i
                              className="flaticon2-cross"
                              onClick={() => setFile(null)}
                            />
                          </span>
                        </div>
                      </div>
                    ) : (
                      prevFileName && (
                        <div className="dropzone-item">
                          <div className="dropzone-file">
                            <div
                              className="dropzone-filename"
                              title={prevFileName}
                            >
                              <span data-dz-name="">{prevFileName}</span>
                            </div>
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
                              <i
                                className="flaticon2-cross"
                                onClick={() => setFile(null)}
                              />
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer border-0 p-0 mt-5">
          {updateFeedbackModal ? (
            <button
              type="button"
              className="btn btn-lg btn-primary w-100 m-0 rounded-0"
              onClick={() => updateFeedback()}
            >
              수정하기
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-lg btn-primary w-100 m-0 rounded-0"
              onClick={() => sendFeedback()}
            >
              보내기
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
