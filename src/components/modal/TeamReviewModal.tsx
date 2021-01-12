import { Modal } from "react-bootstrap";
import { useAuth, useModal } from "hooks/useRedux";
import React, { useEffect, useState, createRef } from "react";
import Profile from "components/Profile";
import axios from "utils/axiosUtil";
import { enterLine } from "utils/stringUtil";
import Scroll from "components/Scroll";
import { useReviewMain } from "hooks/useReview";

const scores = ["LEADING", "STRONG", "SOLID", "BUILDING", "IMPROVEMENT_NEEDED"];

export default function TeamReviewModal() {
  const { request } = useReviewMain();
  const { modals, closeModal } = useModal();
  const [prevData, setPrevData] = useState<any>({});
  const [isTemporary, setIsTemporary] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [teamData, setTeamData] = useState<
    { name: number | string; data: any }[] | null
  >(null);
  const [editData, setEditData] = useState<{
    considerPoint?: string | null;
    continuePoint?: string | null;
    rating?: string | null;
    name?: string | number | null;
  }>({
    considerPoint: null,
    continuePoint: null,
    rating: null,
    name: null,
  });

  const teamReviewModal = modals.find((modal) => modal.name === "teamReview");

  const { meta, user } = teamReviewModal?.param || {};
  const { id } = meta || {};

  function close() {
    closeModal("teamReview");
    setTimeout(() => setTeamData(null), 200);
    setIsCopy(false);
    setIsComplete(false);
  }

  const getData = async () => {
    try {
      const { data } = await axios(
        `/review/self/team/${user.id}?metaId=${id}`,
        "GET"
      );
      const { evaluation1st, evaluation2nd, evaluationFinal, evaluationTemp } =
        data || {};
      const { considerPoint, continuePoint, rating } = evaluationTemp || {};
      const newTeamData = [];
      if (evaluation1st?.user?.id === evaluation2nd?.user?.id) {
        newTeamData.push({ name: 1, data: evaluation1st });
        newTeamData.push({ name: "Final", data: evaluationFinal });
      } else {
        newTeamData.push({ name: 1, data: evaluation1st });
        newTeamData.push({ name: 2, data: evaluation2nd });
        newTeamData.push({ name: "Final", data: evaluationFinal });
      }
      let name = null;

      if (evaluation1st?.editable) name = 1;
      if (evaluation2nd?.editable) name = 2;
      if (evaluationFinal?.editable) name = "Final";
      if (
        !evaluation1st?.editable &&
        !evaluation2nd?.editable &&
        !evaluationFinal?.editable
      )
        setIsComplete(true);
      setPrevData(data);
      setEditData({
        considerPoint,
        continuePoint,
        rating: evaluationFinal?.editable
          ? newTeamData[newTeamData.length - 2]?.data?.rating
          : rating,
        name,
      });
      setTeamData(newTeamData);
    } catch (error) {
      console.log("error", error);
      close();
    }
  };

  const getSubmitted = async () => {
    const { data: isSubmitted } = await axios(
      `/review/self/isSubmitted?metaId=${id}`,
      "GET"
    );
    // if (isSubmitted) close();
  };

  const update = async (submit: boolean) => {
    const updateData = prevData;
    if (submit) {
      if (editData.name === 1)
        updateData.evaluation1st = { ...updateData.evaluation1st, ...editData };
      if (editData.name === 2)
        updateData.evaluation2nd = { ...updateData.evaluation2nd, ...editData };
      if (editData.name === "Final")
        updateData.evaluationFinal = {
          ...updateData.evaluationFinal,
          ...editData,
        };
    } else {
      updateData.evaluationTemp = { ...updateData.evaluationTemp, ...editData };
    }
    const res = await axios(
      `/review/self/team/evaluate?submit=${submit}&metaId=${id}`,
      "POST",
      JSON.stringify(updateData)
    );

    if (res.responseCode === "SUCCESS") {
      request();
      close();
    }
  };

  useEffect(() => {
    if (teamReviewModal && user) {
      getSubmitted();
      getData();
    }
  }, [teamReviewModal]);

  useEffect(() => {
    if (
      (editData.name === "Final" || !!editData.rating) &&
      !!editData.considerPoint &&
      !!editData.continuePoint &&
      editData.considerPoint.trim() !== "" &&
      editData.continuePoint.trim() !== ""
    ) {
      setIsTemporary(true);
      setIsSubmit(true);
    } else {
      setIsTemporary(false);
      setIsSubmit(false);
    }
  }, [editData]);

  useEffect(() => {
    if (teamData) {
      const editIndex = teamData.findIndex(({ data }) => data.editable);
      if (isCopy) {
        const { data: copyData } = teamData[editIndex - 1] || {};
        const { considerPoint, continuePoint, rating } = copyData || {};
        setEditData({
          ...editData,
          considerPoint,
          continuePoint,
          rating,
        });
      } else {
        setEditData({
          ...editData,
          considerPoint: null,
          continuePoint: null,
          ...(editData.name !== "Final" && { rating: null }),
        });
      }
    }
  }, [isCopy]);

  const copyBox = (
    <div
      className="d-flex flex-row cursor-pointer"
      onClick={() => setIsCopy(!isCopy)}
    >
      <label className="checkbox checkbox-sm">
        <input type="checkbox" name="Checkboxes3_1" disabled checked={isCopy} />
        <span />
      </label>
      <span className="d-block font-size-sm text-dark-50 font-weight-bold text-uppercase ml-3">
        이전 Review 내용 가져오기
      </span>
    </div>
  );

  return (
    <Modal
      size="xl"
      show={!!teamReviewModal && !!teamData}
      animation
      centered
      onHide={() => close()}
      id="modal_teamReview"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="d-flex modal-title align-items-center">
            <div className="avatar symbol symbol-50 mr-4">
              <Profile user={user} />
            </div>
            <div className="ml-3">{user?.name}님 성과 Review</div>
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
        <div className="modal-body">
          <div className="d-flex flex-row flex-wrap align-items-stretch">
            <div className="col-auto w-100px flex-grow-1 section-1">
              <h5 className="d-flex gutter-b align-items-center justify-content-center line-height-40px">
                <span className="d-inline-block h-40px font-weight-bolder border-bottom">
                  자기 성과 Review
                </span>
              </h5>
              {prevData?.reviewData &&
                prevData?.reviewData.map((review: any) => (
                  <>
                    <h6 className="font-weight-bolder word-keep">
                      {review?.question}
                    </h6>
                    <div className="mt-12">
                      <div className="font-size-lg font-weight-bold">
                        {!!review?.answer && enterLine(review?.answer)}
                      </div>
                      {/* <div className="text-dark-75 font-size-sm font-weight-normal word-keep pt-3">성과 내용</div> */}
                    </div>
                  </>
                ))}
            </div>
            <div className="col-auto w-100px flex-grow-1 modal-tabs section-2">
              <div className="h-40px gutter-b font-size-h5 font-weight-bold text-center">
                <ul className="header-tabs nav h-100" role="tablist">
                  {teamData &&
                    teamData.map(({ name, data }, i) => {
                      return (
                        <li className="w-100px">
                          <a
                            href="#"
                            className={`mx-0 ${
                              (isComplete
                                ? teamData.length - 1 === i
                                : data.editable) && "active"
                            }`}
                            data-toggle="tab"
                            data-target={`#review_${name}`}
                            role="tab"
                          >
                            <span className="font-weight-bolder">
                              {name === "Final" ? name : `${name}차`}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <Scroll className="tab-content" style={{ maxHeight: "63vh" }}>
                {teamData ? (
                  teamData.map(({ name, data }, i) => {
                    if (name)
                      return (
                        <div
                          className={`content tab-pane ${
                            (isComplete
                              ? teamData.length - 1 === i
                              : data.editable) && "show active"
                          }`}
                          id={`review_${name}`}
                        >
                          {name === "Final" && (
                            <p className="text-dark-75 font-size-sm font-weight-normal mb-6 word-keep">
                              이전 단계의 성과 Review 내용을 기반을, 팀원에게
                              Finsta로 공유될 피드백 내용을 최종적으로 확정해
                              주시기 바랍니다.
                              <br />
                              성과(Level은 Finsta를 통해서는 본인에게 공유되지
                              않습니다.)
                            </p>
                          )}
                          <h6 className="font-weight-bolder">
                            {name === "Final"
                              ? "결과 FeedBack"
                              : `조직장 Review: ${name}차 평가자(${data?.user?.name})`}
                          </h6>
                          {name !== "Final" && (
                            <div className="mt-12">
                              <div className="d-flex justify-content-between">
                                <div className="font-weight-bold">
                                  1. 성과 Level
                                </div>
                                {name === 2 && data.editable && copyBox}
                              </div>
                              <div
                                className={`d-flex row-cols-5 mt-3 ${
                                  data.editable &&
                                  "border rounded cursor-pointer"
                                }`}
                              >
                                {scores.map((score) => (
                                  <div
                                    className="d-flex flex-column align-items-center justify-content-end p-3"
                                    onClick={() =>
                                      data.editable &&
                                      setEditData({
                                        ...editData,
                                        rating:
                                          editData.rating === score
                                            ? null
                                            : score,
                                      })
                                    }
                                  >
                                    <span className="d-block font-size-sm text-dark-50 font-weight-bold text-center mb-3">
                                      {score.split("_").join(" ")}
                                    </span>
                                    <label className="checkbox checkbox-lg">
                                      <input
                                        type="checkbox"
                                        name="Checkboxes3_2"
                                        checked={
                                          data.editable
                                            ? editData?.rating === score
                                            : data?.rating === score
                                        }
                                        disabled
                                      />
                                      <span />
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <span className="d-block font-size-sm text-muted mt-3">
                                * 성과 Level 부여 시 '도움말'을 참고해주세요.
                              </span>
                            </div>
                          )}
                          <div className="mt-12">
                            <div className="d-flex justify-content-between">
                              <div className="font-weight-bold">
                                {name === "Final" ? 1 : 2}. Continue Point
                                (잘한점)
                              </div>
                              {name === "Final" && data.editable && copyBox}
                            </div>
                            {data.editable ? (
                              <textarea
                                className="form-control resize-none mt-3"
                                placeholder="텍스트를 입력하세요."
                                rows={6}
                                value={editData?.considerPoint || ""}
                                onChange={({ target }) =>
                                  data.editable &&
                                  setEditData({
                                    ...editData,
                                    considerPoint: target.value,
                                  })
                                }
                              />
                            ) : (
                              <div className="text-dark-75 font-size-sm font-weight-normal pt-3 pl-2">
                                {data.considerPoint ||
                                  "작성한 리뷰가 없습니다."}
                              </div>
                            )}
                          </div>
                          <div className="mt-12">
                            <div className="font-weight-bold">
                              {name === "Final" ? 2 : 3}. Consider Point
                              (개선점)
                            </div>
                            {data.editable ? (
                              <textarea
                                className="form-control resize-none mt-3"
                                placeholder="텍스트를 입력하세요."
                                rows={6}
                                value={editData?.continuePoint || ""}
                                onChange={({ target }) =>
                                  data.editable &&
                                  setEditData({
                                    ...editData,
                                    continuePoint: target.value,
                                  })
                                }
                              />
                            ) : (
                              <div className="text-dark-75 font-size-sm font-weight-normal pt-3 pl-2">
                                {data.continuePoint ||
                                  "작성한 리뷰가 없습니다."}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    return <></>;
                  })
                ) : (
                  <></>
                )}
              </Scroll>
              {!isComplete && (
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
                    onClick={() => isSubmit && update(true)}
                  >
                    제출하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}