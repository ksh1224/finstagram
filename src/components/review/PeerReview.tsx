import ReviewCardItem from "components/item/ReviewCardItem";
import ReviewListItem from "components/item/ReviewListItem";
import Scroll from "components/Scroll";
import { useAuth, useModal } from "hooks/useRedux";
import {
  useReviewMain,
  useReviewPeerEvalList,
  useReviewPeerList,
} from "hooks/useReview";
import React, { useEffect, useState } from "react";
import { getWriteDate } from "utils/dateUtil";
import { search, searchList } from "utils/searchUtil";
import SVG from "utils/SVG";

export default function PeerReview() {
  const { showModal } = useModal();
  const { data: mainData = {} } = useReviewMain();
  const { user: my } = useAuth();
  const { meta = {}, date, progress, reviewPeerIncluded } = mainData;
  const { data: peerListData, request: peerListRequest } = useReviewPeerList();
  const {
    data: peerEvalListData,
    request: peerEvalListRequest,
  } = useReviewPeerEvalList();
  const [text, setText] = useState("");

  const { peer } = progress || {};

  useEffect(() => {
    peerListRequest(meta.id);
    peerEvalListRequest(meta.id);
  }, [meta]);

  useEffect(() => {}, [text]);

  const {
    dateReviewPeerStart,
    dateReviewPeerEnd,
    dateReviewerChangeStart,
    dateReviewerChangeEnd,
    dateReviewerChangeByEvaluatorStart,
    dateReviewerChangeByEvaluatorEnd,
  } = date;

  const {
    period: peerSelectPeriod,
    periodText: peerSelectPeriodText,
  } = getWriteDate(dateReviewerChangeStart, dateReviewerChangeEnd);

  const {
    period: peerSelectEvalPeriod,
    periodText: peerSelectEvalPeriodText,
  } = getWriteDate(
    dateReviewerChangeByEvaluatorStart,
    dateReviewerChangeByEvaluatorEnd
  );

  const { period: peerPeriod, periodText: peerPeriodText } = getWriteDate(
    dateReviewPeerStart,
    dateReviewPeerEnd
  );

  const findList =
    text.trim().length > 1
      ? searchList(peerListData, text, ["user", "name"])
      : peerListData;
  return (
    <div className="card card-custom card-stretch rounded-bottom-0 w-100">
      <div className="card-header border-0 justify-content-start">
        <h3 className="card-title font-weight-bolder">동료 Review</h3>
      </div>
      <div className="card-body overflow-y-auto">
        {my.isReviewer && (
          <ReviewCardItem
            title="팀원 Reviewer 추가"
            // total={1}
            // count={progress?.okrSelfSubmitted ? 1 : 0}
            period={peerSelectEvalPeriod}
            periodText={peerSelectEvalPeriodText}
            header={<></>}
            // removeCenterText
          >
            <div className="border-top border-light-dark" />
            <div className="d-flex flex-column bg-light-light pt-8 px-8">
              <div className="d-flex flex-grow-1 flex-row pb-4">
                <div className="d-flex w-150px justify-content-center">
                  팀원
                </div>
                <div className="d-flex flex-grow-1 flex-row">
                  <div className="col-6 p-0 text-center">내용</div>
                  <div className="col-6 p-0 text-center word-keep">
                    Reviewer 선정현황
                  </div>
                </div>
              </div>
              <Scroll style={{ maxHeight: "250px" }}>
                {peerEvalListData && peerEvalListData.length !== 0 ? (
                  peerEvalListData.map((contents: any) => (
                    <ReviewListItem
                      contents={contents?.user}
                      buttonText={`${contents?.size}/6`}
                      action={contents?.size < 6}
                      description={
                        contents?.size < 6
                          ? `${6 - contents?.size}명 이상 추가해주세요.`
                          : ""
                      }
                      onClick={() =>
                        showModal("addTeamReviewer", {
                          meta,
                          user: contents?.user,
                        })
                      }
                    />
                  ))
                ) : (
                  <div className="d-flex py-4 border-top border-light-dark">
                    <div className="w-100 py-8 text-center word-keep">
                      리뷰 가능한 팀원이 없습니다.
                    </div>
                  </div>
                )}
              </Scroll>
            </div>
          </ReviewCardItem>
        )}
        <ReviewCardItem
          title="동료 Review 작성"
          total={peer?.total}
          count={peer?.finished}
          period={peerPeriod}
          periodText={peerPeriodText}
          removeBottom
          header={
            <div className="d-flex flex-row">
              <div className="quick-search quick-search-inline quick-search-has-result bg-white rounded w-100">
                <div className="flex-grow-1 quick-search quick-search-has-result input-group input-group-solid">
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
            </div>
          }
        >
          <div className="border-top border-light-dark" />
          <div className="d-flex flex-column position-relative bg-light-light p-8">
            <div className="d-flex flex-grow-1 flex-row pb-4">
              <div className="d-flex w-150px justify-content-center">동료</div>
              <div className="d-flex flex-grow-1 flex-row">
                <div className="col-6 p-0 text-center">내용</div>
                <div className="col-6 p-0 text-center">비고</div>
              </div>
            </div>
            <Scroll style={{ maxHeight: "250px" }}>
              {findList && findList.length !== 0 ? (
                findList.map((contents: any) => (
                  <ReviewListItem
                    contents={contents}
                    buttonText={
                      contents?.submitted ? "작성 완료" : "Review 하기"
                    }
                    onClick={() =>
                      showModal("peerReview", { meta, user: contents })
                    }
                    action={!contents?.submitted}
                  />
                ))
              ) : (
                <div className="d-flex py-4 border-top border-light-dark">
                  <div className="w-100 py-8 text-center word-keep">
                    리뷰 가능한 팀원이 없습니다.
                  </div>
                </div>
              )}
            </Scroll>
          </div>
        </ReviewCardItem>
      </div>
    </div>
  );
}
