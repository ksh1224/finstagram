import { Modal } from "react-bootstrap";
import { useAuth, useModal } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import SVG from "utils/SVG";
import axios from "utils/axiosUtil";
import Scroll from "components/Scroll";
import Profile from "components/Profile";
import { useReviewMain } from "hooks/useReview";

export default function LeaderReviewModal() {
  const { modals, closeModal, showModal } = useModal();
  const [isTemporary, setIsTemporary] = useState(false);
  const { request } = useReviewMain();
  const [isSubmit, setIsSubmit] = useState(false);
  const [prevData, setPrevData] = useState<any>(null);
  const [generalIndexQna, setGeneralIndexQna] = useState<any[]>([]);
  const [generalTextQna, setGeneralTextQna] = useState<any[]>([]);

  const leaderReviewModal = modals.find(
    (modal) => modal.name === "leaderReview"
  );

  const { meta, user, finished } = leaderReviewModal?.param || {};

  function close() {
    closeModal("leaderReview");
    setTimeout(() => {
      setPrevData(null);
      setGeneralIndexQna([]);
      setGeneralTextQna([]);
    }, 300);
  }

  const getData = async () => {
    try {
      const { data } = await axios(
        `/review/leader/reviewData?receive_user_id=${user.id}&metaId=${meta.id}`,
        "GET"
      );
      setPrevData(data);
      setGeneralIndexQna(data?.generalIndexQna);
      setGeneralTextQna(data?.generalTextQna);
    } catch (error) {
      console.log("error", error);
    }
  };

  const update = async (submit: boolean) => {
    try {
      const data = { ...prevData, generalIndexQna, generalTextQna };
      const res = await axios(
        `/review/leader/submit?submit=${submit}&metaId=${meta.id}`,
        "POST",
        JSON.stringify(data)
      );
      if (res.responseCode === "SUCCESS") {
        request(meta?.id);
        close();
        setTimeout(() => {
          showModal("confirm", {
            text: submit ? "제출되었습니다." : "임시저장되었습니다.",
          });
        }, 300);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (leaderReviewModal) {
      getData();
    }
  }, [leaderReviewModal]);

  useEffect(() => {
    if (generalIndexQna && generalTextQna) {
      let submit = true;
      let temporary = true;
      let falseNum = 0;
      generalIndexQna.forEach(({ answer }) => {
        if (!answer) {
          falseNum += 1;
          submit = false;
        }
      });
      generalTextQna.forEach(({ answer }) => {
        if (!answer || answer.trim() === "") {
          falseNum += 1;
          submit = false;
        }
      });
      if (
        falseNum !== generalIndexQna.length + generalTextQna.length &&
        !(
          JSON.stringify(generalIndexQna) ===
            JSON.stringify(prevData?.generalIndexQna) &&
          JSON.stringify(generalTextQna) ===
            JSON.stringify(prevData?.generalTextQna)
        )
      )
        temporary = true;
      else temporary = false;
      setIsSubmit(submit);
      setIsTemporary(temporary);
    }
  }, [generalIndexQna, generalTextQna]);

  return (
    <Modal
      show={!!leaderReviewModal && !!prevData}
      animation
      centered
      onHide={() => close()}
      id="modal_leaderReview"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="d-flex modal-title align-items-center">
            <Profile width={50} user={prevData?.receiveUser} />
            <div className="ml-3">
              {prevData?.receiveUser?.name}님 리더 Review
            </div>
          </h2>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="닫기"
            onClick={() => close()}
          >
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </div>
        <Scroll className="modal-body" style={{ maxHeight: "90vh" }}>
          <div className="d-flex row-cols-6">
            <div className="d-flex flex-column align-items-center justify-content-end p-3">
              <span className="d-block font-size-sm text-dark-50 font-weight-bold text-uppercase text-center mb-3 word-keep">
                매우 동의하지 않음
              </span>
              <label className="radio radio-num">
                <input type="radio" checked disabled />
                <span>1</span>
              </label>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-end p-3">
              <span className="d-block font-size-sm text-dark-50 font-weight-bold text-uppercase text-center mb-3 word-keep">
                동의하지 않음
              </span>
              <label className="radio radio-num">
                <input type="radio" checked disabled />
                <span>2</span>
              </label>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-end p-3">
              <span className="d-block font-size-sm text-dark-50 font-weight-bold text-uppercase text-center mb-3 word-keep">
                약간 동의하지 않음
              </span>
              <label className="radio radio-num">
                <input type="radio" checked disabled />
                <span>3</span>
              </label>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-end p-3">
              <span className="d-block font-size-sm text-dark-50 font-weight-bold text-uppercase text-center mb-3 word-keep">
                약간 동의함
              </span>
              <label className="radio radio-num">
                <input type="radio" checked disabled />
                <span>4</span>
              </label>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-end p-3">
              <span className="d-block font-size-sm text-dark-50 font-weight-bold text-uppercase text-center mb-3 word-keep">
                동의함
              </span>
              <label className="radio radio-num">
                <input type="radio" checked disabled />
                <span>5</span>
              </label>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-end p-3">
              <span className="d-block font-size-sm text-dark-50 font-weight-bold text-uppercase text-center mb-3 word-keep">
                매우 동의함
              </span>
              <label className="radio radio-num">
                <input type="radio" checked disabled />
                <span>6</span>
              </label>
            </div>
          </div>

          <Scroll className="border-top" style={{ maxHeight: "45vh" }}>
            <>
              {generalIndexQna.map(({ answer, question }, i) => (
                <div className="my-7">
                  <div className="font-size-lg font-weight-bolder word-keep">
                    {`${i + 1}. ${question}`}
                  </div>
                  <div className="d-flex row-cols-6">
                    {[1, 2, 3, 4, 5, 6].map((number) => (
                      <div
                        className="d-flex flex-column align-items-center justify-content-end p-3"
                        onClick={() =>
                          !finished &&
                          setGeneralIndexQna([
                            ...generalIndexQna.map((qna, j) => {
                              if (j === i) return { ...qna, answer: number };
                              return qna;
                            }),
                          ])
                        }
                      >
                        <label className="radio radio-num">
                          <input
                            type="radio"
                            name={`radios${i}`}
                            disabled
                            checked={number === answer}
                          />
                          <span>{number}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="border-top pt-7">
                {generalTextQna.map(({ answer, question }, i) =>
                  finished ? (
                    <>
                      <div className="font-size-lg font-weight-bolder word-keep">{`${
                        i + 1
                      }. ${question}`}</div>
                      <div className="resize-none mt-3 mb-5">{answer}</div>
                    </>
                  ) : (
                    <>
                      <div className="font-size-lg font-weight-bolder word-keep">{`${
                        i + 1
                      }. ${question}`}</div>
                      <textarea
                        className="form-control resize-none mt-3 mb-5"
                        rows={3}
                        value={answer}
                        onChange={({ target }) =>
                          setGeneralTextQna([
                            ...generalTextQna.map((qna, j) => {
                              if (j === i)
                                return { ...qna, answer: target.value };
                              return qna;
                            }),
                          ])
                        }
                      />
                    </>
                  )
                )}
              </div>
            </>
          </Scroll>
          {!finished ? (
            <div className="d-flex align-items-center justify-content-center mt-12">
              <button
                type="button"
                className={`btn btn-lg w-150px font-weight-bold mx-2 ${
                  isTemporary ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => isTemporary && update(false)}
              >
                임시저장
              </button>
              <button
                type="button"
                className={`btn btn-lg w-150px font-weight-bold mx-2 ${
                  isSubmit ? "btn-primary" : "btn-secondary"
                }`}
                data-toggle="modal"
                data-target="#modal_workPreview"
                onClick={() =>
                  isSubmit &&
                  showModal("confirm", {
                    onConfirm: () => update(true),
                    isCancel: true,
                    text: (
                      <>
                        제출 후 수정할 수 없습니다. <br /> 제출하시겠습니까?
                      </>
                    ),
                  })
                }
              >
                제출하기
              </button>
            </div>
          ) : (
            <></>
          )}
        </Scroll>
      </div>
    </Modal>
  );
}
