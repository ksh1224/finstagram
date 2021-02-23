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
import { searchList } from "utils/searchUtil";
import SVG from "utils/SVG";

export default function PeerReview() {
  const { showModal } = useModal();
  const { data: mainData = {} } = useReviewMain();
  const { user: my } = useAuth();
  const { meta = {}, date, progress } = mainData;
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
    // dateReviewerChangeStart,
    // dateReviewerChangeEnd,
    dateReviewerChangeByEvaluatorStart,
    dateReviewerChangeByEvaluatorEnd,
  } = date;

  // const {
  //   period: peerSelectPeriod,
  //   periodText: peerSelectPeriodText,
  // } = getWriteDate(dateReviewerChangeStart, dateReviewerChangeEnd);

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

  // 버튼 추가할 때 확정 확인 로직 추가해야함 url: /review/peer/reviewee/team/submitted?metaId=${}
  // const fixReviewer = async () => {
  //   try {
  //     const res = await axios(
  //       `/review/peer/reviewee/team/submit?metaId=${meta.id}`,
  //       "POST"
  //     );
  //     if (res.responseCode === "SUCCESS") {
  //       setTimeout(() => {
  //         showModal("confirm", {
  //           text: "확정되었습니다.",
  //         });
  //       }, 300);
  //     } else {
  //       console.log("res", res);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  return (
    <div className="card card-custom card-stretch rounded-bottom-0 w-100">
      <div className="card-header border-0 justify-content-start">
        <h3 className="card-title font-weight-bolder">동료 Review</h3>
      </div>
      <div className="card-body overflow-y-auto">
        {my.isReviewer &&
          (peerSelectEvalPeriod === "Write" ||
            peerSelectEvalPeriod === "BEFORE") && (
            <ReviewCardItem
              title="팀원 Reviewer 추가"
              // total={1}
              // count={progress?.okrSelfSubmitted ? 1 : 0}
              period={peerSelectEvalPeriod}
              periodText={peerSelectEvalPeriodText}
              header={<></>}
              // removeCenterText
            >
              <div className="d-flex flex-column position-relative bg-light-light">
                <div className="d-flex flex-grow-1 flex-row px-8 py-4 bg-secondary border-top border-light-dark align-items-center">
                  <div className="d-flex w-150px justify-content-center">
                    팀원
                  </div>
                  <div className="d-flex flex-grow-1 flex-row align-items-center">
                    <div className="col-6 p-0 text-center">내용</div>
                    <div className="col-6 p-0 text-center word-keep">
                      Reviewer 선정현황
                    </div>
                  </div>
                </div>
                <Scroll style={{ maxHeight: "300px" }}>
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
                    <div className="w-100 py-8 text-center word-keep">
                      리뷰 가능한 팀원이 없습니다.
                    </div>
                  )}
                </Scroll>
              </div>
              {/* {isSubmit ? (
                <></>
              ) : (
                <div className="modal-footer border-0 p-0">
                  {isSelect ? (
                    <button
                      type="button"
                      className="btn btn-lg btn-success w-100 m-0 rounded-0"
                      onClick={() => addReviewer()}
                    >
                      추가하기
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-lg btn-primary w-100 m-0 rounded-0"
                      onClick={() =>
                        showModal("confirm", {
                          onConfirm: () => fixReviewer(),
                          isCancel: true,
                          text: (
                            <>
                              확정 후 수정할 수 없습니다. <br />{" "}
                              확정하시겠습니까?
                            </>
                          ),
                        })
                      }
                    >
                      확정하기
                    </button>
                  )}
                </div>
              )} */}
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
          <div className="d-flex flex-column position-relative bg-light-light">
            <div className="d-flex flex-grow-1 flex-row py-4 px-8 bg-secondary border-top border-light-dark">
              <div className="d-flex w-150px justify-content-center">동료</div>
              <div className="d-flex flex-grow-1 flex-row">
                <div className="col-6 p-0 text-center">내용</div>
                <div className="col-6 p-0 text-center">비고</div>
              </div>
            </div>
            <Scroll style={{ maxHeight: "300px" }}>
              {findList && findList.length !== 0 ? (
                findList.map((contents: any) => (
                  <ReviewListItem
                    contents={contents}
                    buttonText={
                      // eslint-disable-next-line no-nested-ternary
                      contents?.submitted
                        ? "작성 완료"
                        : peerPeriod === "END"
                        ? "미작성"
                        : "Review 하기"
                    }
                    onClick={() =>
                      (peerPeriod === "Write" ||
                        (contents?.submitted && peerPeriod === "END")) &&
                      showModal("peerReview", {
                        meta,
                        user: contents,
                      })
                    }
                    action={peerPeriod !== "END" && !contents?.submitted}
                  />
                ))
              ) : (
                <div className="w-100 py-8 text-center word-keep">
                  리뷰 가능한 팀원이 없습니다.
                </div>
              )}
            </Scroll>
          </div>
        </ReviewCardItem>
      </div>
    </div>
  );
}
