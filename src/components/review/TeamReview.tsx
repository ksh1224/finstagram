/* eslint-disable no-nested-ternary */
import ReviewCardItem from "components/item/ReviewCardItem";
import ReviewCheckItem from "components/item/ReviewCheckItem";
import ReviewListOneItem from "components/item/ReviewListOneItem";
import Profile from "components/Profile";
import Scroll from "components/Scroll";
import { useAuth, useModal } from "hooks/useRedux";
import {
  useReviewMain,
  useReviewOKRList,
  useReviewTeamList,
} from "hooks/useReview";
import React, { useEffect, useState } from "react";
import { getWriteDate } from "utils/dateUtil";
import { searchList } from "utils/searchUtil";
import SVG from "utils/SVG";

export default function TeamReview() {
  const { data: mainData = {} } = useReviewMain();
  const { showModal } = useModal();
  const {
    meta = {},
    date,
    progress = {},
    reviewLeaderIncluded,
    reviewOkrIncluded,
    reviewSelfIncluded,
  } = mainData;
  const { user: my } = useAuth();
  const [isPosible, setIsPosible] = useState(false);
  const [isOKRPosible, setIsOKRPosible] = useState(false);
  const [text, setText] = useState("");
  const [okrText, setOkrText] = useState("");
  const { data: teamListData, request: teamRequest } = useReviewTeamList();
  const { data: okrListData, request: okrListRequest } = useReviewOKRList();

  // search();
  useEffect(() => {
    if (meta) {
      teamRequest(meta?.id);
      okrListRequest(meta?.id);
    }
  }, [meta]);

  // search();
  useEffect(() => {}, [meta]);

  useEffect(() => {}, [text]);

  useEffect(() => {}, [okrText]);

  const {
    dateReviewLeaderStart,
    dateReviewLeaderEnd,

    dateReviewEval1stStartAt,
    dateReviewEval1stEndAt,
    dateReviewEval2ndStartAt,
    dateReviewEval2ndEndAt,
    dateReviewFinalizeStart,
    dateReviewFinalizeEnd,

    dateReviewOkrEvalStart,
    dateReviewOkrEvalEnd,
  } = date;

  const { period: leaderPeriod, periodText: leaderPeriodText } = getWriteDate(
    dateReviewLeaderStart,
    dateReviewLeaderEnd
  );

  let headReviewStartAt;
  let headReviewEndAt;

  if (dateReviewFinalizeEnd <= dateReviewEval2ndEndAt)
    headReviewEndAt = dateReviewFinalizeEnd;
  else if (dateReviewEval2ndEndAt <= dateReviewEval1stEndAt)
    headReviewEndAt = dateReviewEval2ndEndAt;
  else headReviewEndAt = dateReviewEval1stEndAt;

  if (dateReviewEval1stStartAt <= dateReviewEval2ndStartAt)
    headReviewStartAt = dateReviewEval1stStartAt;
  else if (dateReviewEval2ndStartAt <= dateReviewFinalizeStart)
    headReviewStartAt = dateReviewEval2ndStartAt;
  else headReviewStartAt = dateReviewFinalizeStart;

  const { period: headPeriod, periodText: headPeriodText } = getWriteDate(
    headReviewStartAt,
    headReviewEndAt
  );

  const { period: okrEvalPeriod, periodText: okrEvalPeriodText } = getWriteDate(
    dateReviewOkrEvalStart,
    dateReviewOkrEvalEnd
  );

  const findList =
    text.trim().length > 1
      ? searchList(teamListData, text, ["user", "name"])
      : teamListData;

  const findOKRList =
    okrText.trim().length > 1
      ? searchList(okrListData, okrText, ["user", "name"])
      : okrListData;

  return (
    <div className="card card-custom card-stretch rounded-bottom-0">
      <div className="card-header border-0 align-items-center justify-content-between">
        <h3 className="card-title font-weight-bolder">팀원 Review</h3>
        {/* <span className="label label-lg label-light-dark label-inline label-pill ml-2">
          {leaderPeriodText}
        </span> */}
      </div>
      <div className="card-body overflow-y-auto">
        {reviewLeaderIncluded &&
          progress?.leadership &&
          progress.leadership.length !== 0 && (
            <ReviewCardItem
              title="리더 Review"
              period={leaderPeriod}
              periodText={leaderPeriodText}
              header={<></>}
              removeCenterText={leaderPeriod !== "END"}
            >
              <Scroll className="card-body pt-2" style={{ maxHeight: "250px" }}>
                {progress.leadership.length !== 0 ? (
                  progress.leadership.map(({ user, finished }: any) => (
                    <div className="card card-custom shadow-none border bg-light">
                      <div className="card-body">
                        <div className="d-flex border-light-dark">
                          <div className="d-flex w-150px align-items-center">
                            <div className="avatar symbol symbol-50 mr-4">
                              <Profile user={user} />
                            </div>
                            <div className="overflow-hidden w-100px flex-grow-1 font-size-lg">
                              <div className="font-weight-bold">
                                {user?.name}
                              </div>
                              <small className="d-block text-truncate">
                                {user?.organization?.name}
                              </small>
                            </div>
                          </div>
                          <div className="d-flex flex-column w-100 p-0 align-items-end justify-content-center">
                            <button
                              type="button"
                              className={`btn btn-sm ${
                                leaderPeriod === "Write" && !finished
                                  ? "btn-primary"
                                  : "btn-secondary"
                              }`}
                              onClick={() =>
                                (leaderPeriod === "Write" ||
                                  (leaderPeriod === "END" && finished)) &&
                                showModal("leaderReview", {
                                  user,
                                  meta,
                                  finished,
                                })
                              }
                            >
                              {finished
                                ? "작성 완료"
                                : leaderPeriod === "END"
                                ? "미작성"
                                : "Review 작성"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="d-flex py-4">
                    <div className="w-100 py-8 text-center word-keep">
                      리뷰 가능한 리더가 없습니다.
                    </div>
                  </div>
                )}
              </Scroll>
            </ReviewCardItem>
          )}

        {my.isReviewer && reviewSelfIncluded ? (
          <ReviewCardItem
            title="팀원 성과 Review"
            period={headPeriod}
            periodText={headPeriodText}
            header={
              <div className="d-flex flex-row">
                <div className="flex-grow-1 quick-search quick-search-inline quick-search-has-result bg-white rounded">
                  <div className="quick-search quick-search-has-result input-group input-group-solid">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <span className="svg-icon svg-icon-lg">
                          <SVG name="search" />
                        </span>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control py-4 h-auto"
                      placeholder="이름을 입력해 주세요."
                      value={text}
                      onChange={({ target }) => setText(target.value)}
                    />

                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i
                          className="quick-search-close ki ki-close icon-sm text-muted"
                          style={text === "" ? { display: "none" } : {}}
                          onClick={() => setText("")}
                        />
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="checkbox-inline ml-3"
                  onClick={() => setIsPosible(!isPosible)}
                >
                  <label className="checkbox text-nowrap">
                    <input
                      type="checkbox"
                      name="Checkboxes2"
                      disabled
                      checked={isPosible}
                    />
                    <span />
                    Review 가능만 보기
                  </label>
                  <label className="checkbox" />
                </div>
              </div>
            }
          >
            <div className="d-flex flex-column position-relative bg-light-light">
              <div className="d-flex flex-grow-1 flex-row py-4 px-8 bg-secondary border-top border-light-dark">
                <div className="d-flex w-150px justify-content-center">
                  구성원
                </div>
                <div className="d-flex flex-grow-1 flex-row">
                  <div className="col-3 p-0 text-center">Self</div>
                  <div className="col-3 p-0 text-center">1차</div>
                  <div className="col-3 p-0 text-center">2차</div>
                  <div className="col-3 p-0 text-center">Final</div>
                </div>
              </div>
              <Scroll style={{ maxHeight: "300px" }}>
                {findList && findList.length !== 0 ? (
                  findList.map((peer: any) => {
                    if (!isPosible || peer?.progress === "IN_PROGRESS")
                      return (
                        <ReviewCheckItem
                          {...peer}
                          onClick={() =>
                            showModal("teamReview", { user: peer?.user, meta })
                          }
                        />
                      );
                    return <></>;
                  })
                ) : (
                  <div className="d-flex py-4 border-top">
                    <div className="w-100 py-8 text-center word-keep">
                      리뷰 가능한 팀원이 없습니다.
                    </div>
                  </div>
                )}
              </Scroll>
            </div>
          </ReviewCardItem>
        ) : (
          <></>
        )}

        {my.isReviewer && reviewOkrIncluded ? (
          <ReviewCardItem
            title="팀원 OKR Review"
            period={okrEvalPeriod}
            periodText={okrEvalPeriodText}
            header={
              <div className="d-flex flex-row">
                <div className="flex-grow-1 quick-search quick-search-inline quick-search-has-result bg-white rounded">
                  <div className="quick-search quick-search-has-result input-group input-group-solid">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <span className="svg-icon svg-icon-lg">
                          <SVG name="search" />
                        </span>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control py-4 h-auto"
                      placeholder="이름을 입력해 주세요."
                      value={okrText}
                      onChange={({ target }) => setOkrText(target.value)}
                    />

                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i
                          className="quick-search-close ki ki-close icon-sm text-muted"
                          style={okrText === "" ? { display: "none" } : {}}
                          onClick={() => setOkrText("")}
                        />
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="checkbox-inline ml-3"
                  onClick={() => setIsOKRPosible(!isOKRPosible)}
                >
                  <label className="checkbox text-nowrap">
                    <input
                      type="checkbox"
                      name="Checkboxes2"
                      disabled
                      checked={isOKRPosible}
                    />
                    <span />
                    Review 가능만 보기
                  </label>
                  <label className="checkbox" />
                </div>
              </div>
            }
          >
            <div className="d-flex flex-column position-relative bg-light-light">
              <div className="d-flex flex-grow-1 flex-row px-8 py-4 bg-secondary border-top border-light-dark justify-content-between">
                <div className="d-flex w-150px justify-content-center">
                  대상자
                </div>
                <div className="w-100px p-0 text-center">현황</div>
              </div>
              <Scroll style={{ maxHeight: "300px" }}>
                {findOKRList && findOKRList.length !== 0 ? (
                  findOKRList.map((peer: any) => {
                    if (!isOKRPosible || peer?.progress === "IN_PROGRESS")
                      return (
                        <ReviewListOneItem
                          contents={peer.user}
                          buttonText={(() => {
                            switch (peer.progress) {
                              case "PENDING":
                                if (okrEvalPeriod === "END") return "미작성";
                                return "Review 하기";
                              case "COMPLETE":
                                return "완료";
                              default:
                                return "자기 Review 미작성";
                            }
                          })()}
                          onClick={() =>
                            peer.progress !== "NOT_STARTED" &&
                            !(
                              peer.progress === "PENDING" &&
                              okrEvalPeriod === "END"
                            ) &&
                            showModal("okrTeamReview", {
                              meta,
                              user: peer.user,
                              finished: peer.progress === "COMPLETE",
                            })
                          }
                          action={
                            peer.progress === "PENDING" &&
                            okrEvalPeriod !== "END"
                          }
                        />
                      );
                    return <></>;
                  })
                ) : (
                  <div className="d-flex py-4 border-top">
                    <div className="w-100 py-8 text-center word-keep">
                      리뷰 가능한 팀원이 없습니다.
                    </div>
                  </div>
                )}
              </Scroll>
            </div>
          </ReviewCardItem>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
