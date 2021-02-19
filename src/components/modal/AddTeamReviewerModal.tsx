/* eslint-disable no-nested-ternary */
import { Modal } from "react-bootstrap";
import { useAuth, useModal, useSearchUser } from "hooks/useRedux";
import React, { createRef, useEffect, useState } from "react";
import SVG from "utils/SVG";
import axios from "utils/axiosUtil";
import Scroll from "components/Scroll";
import Profile from "components/Profile";
import { useReviewMain } from "hooks/useReview";
import { searchListUser } from "utils/searchUtil";

export default function AddTeamReviewerModal() {
  const { request } = useReviewMain();
  const { modals, closeModal, showModal } = useModal();
  const [isSubmit, setIsSubmit] = useState(false);
  const [reviewerlist, setReviewerList] = useState<any[]>([]);
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [searchList, setSearchList] = useState<any[]>([]);
  const [selectList, setSelectList] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [top, setTop] = useState(0);
  const viewRef = createRef<HTMLDivElement>();
  const { data: userData } = useSearchUser();

  const addReviewerModal = modals.find(
    (modal) => modal.name === "addTeamReviewer"
  );
  const { meta, user } = addReviewerModal?.param || {};

  function close() {
    request(meta?.id);
    closeModal("addTeamReviewer");
    setTimeout(() => {
      setText("");
      setReviewerList([]);
      setFeedbackList([]);
      setIsSubmit(false);
      setProfile(null);
    }, 300);
  }

  const getData = async () => {
    try {
      const { data } = await axios(
        `/review/peer/reviewee/team/list/${user.id}?metaId=${meta.id}`,
        "GET"
      );
      setProfile(data?.user);
      setReviewerList(data?.data);
      setFeedbackList(data?.feedbackUsers);
      setIsSubmit(data?.submitted);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addReviewer = async (reviewerId?: number) => {
    const body = reviewerId
      ? { reviewerId, userId: user.id }
      : {
          data: selectList.map((reviewer: any) => ({
            reviewerId: reviewer.id,
            userId: user.id,
          })),
        };
    try {
      const res = await axios(
        `/review/peer/reviewee/team/new${reviewerId ? "" : "/all"}?metaId=${
          meta.id
        }`,
        "POST",
        JSON.stringify(body)
      );
      if (res.responseCode === "SUCCESS") {
        getData();
        setText("");
        setSelectList([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const exceptReviewer = async (reviewerId: number) => {
    try {
      const res = await axios(
        `/review/peer/reviewee/delete/team/${user.id}/${reviewerId}`,
        "DELETE"
      );
      if (res.responseCode === "SUCCESS") {
        getData();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fixReviewer = async () => {
    try {
      const res = await axios(
        `/review/peer/reviewee/team/submit/${user.id}?metaId=${meta.id}`,
        "POST"
      );
      if (res.responseCode === "SUCCESS") {
        close();
        setTimeout(() => {
          showModal("confirm", {
            text: "확정되었습니다.",
          });
        }, 300);
      } else {
        console.log("res", res);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (addReviewerModal) {
      getData();
    }
  }, [addReviewerModal]);

  useEffect(() => {
    if (text && text.trim().length > 1) {
      const search = text.trim();
      if (!userData) return;
      const searchData = searchListUser(userData.user, search);
      setSearchList(searchData);
    }
  }, [text]);

  useEffect(() => {
    setTop((viewRef.current?.clientHeight || 0) + 25);
  }, [viewRef]);

  const isSelect =
    (text && text.trim().length > 1) || (selectList && selectList.length > 0);

  return (
    <Modal
      show={!!addReviewerModal && !!profile}
      animation
      centered
      onHide={() => close()}
      id="modal_myReviewer"
    >
      <Scroll className="modal-content" style={{ maxHeight: "90vh" }}>
        <div className="modal-header">
          <h2 className="d-flex modal-title align-items-center">
            <Profile width={50} user={profile} />
            <div className="ml-3">{profile?.name}님의 Reviewer</div>
          </h2>
          <button type="button" className="close" onClick={() => close()}>
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </div>
        <Scroll className="modal-body px-0 pb-0" style={{ maxHeight: "85vh" }}>
          {isSubmit ? (
            <></>
          ) : (
            <div className="border-bottom px-7">
              <h5 className="font-weight-bolder gutter-b text-dark">
                Reviewer 찾기
              </h5>

              <div
                className="quick-search quick-search-has-result input-group input-group-solid mb-3"
                data-toggle="search"
              >
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
                  placeholder="추가하고 싶은 동료를 검색해 주세요."
                  value={text}
                  onChange={({ target }) => setText(target.value)}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i
                      className="quick-search-close ki ki-close icon-sm text-muted"
                      style={{ display: isSelect ? "block" : "none" }}
                      onClick={() => {
                        setText("");
                        setSelectList([]);
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
          )}
          {isSubmit ? (
            <></>
          ) : (
            <div ref={viewRef} className="d-flex flex-column px-7 gutter-b">
              <h5 className="font-weight-bold text-dark-75 gutter-t mb-7 word-keep">
                Finstagram에서 Feedback을 주거나 받은 동료
              </h5>
              <div className="text-nowrap text-center reviewer-list pb-2 px-7 mx-n7 fs-scroll">
                {feedbackList.map((feedbackUser) => {
                  const isInclude = !!reviewerlist.find(
                    (reviewer) => reviewer.userId === feedbackUser.id
                  );
                  return (
                    <div
                      className="d-inline-block text-center"
                      style={isInclude ? { opacity: "50%" } : {}}
                      onClick={() => !isInclude && addReviewer(feedbackUser.id)}
                    >
                      <div className="avatar symbol symbol-50 px-2">
                        <Profile user={feedbackUser} onClick={() => {}} />
                      </div>
                      <div className="font-weight-bold">
                        {feedbackUser?.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="d-flex position-relative flex-column bg-light-light">
            <div className="d-flex flex-grow-1 flex-row py-4 px-7 bg-secondary border-top border-light-dark">
              <div className="d-flex w-150px justify-content-center">
                Reviewer
              </div>
              <div className="d-flex flex-grow-1 flex-row">
                <div className="col-8 p-0 text-center">내용</div>
                {isSubmit ? (
                  <></>
                ) : (
                  <div className="col-4 p-0 text-center">비고</div>
                )}
              </div>
            </div>
            <Scroll style={{ maxHeight: "30vh" }}>
              {reviewerlist.length !== 0 ? (
                reviewerlist.map((reviewer) => (
                  <div className="d-flex py-4 px-7 border-top border-light-dark">
                    <div className="d-flex w-150px align-items-center">
                      <div className="avatar symbol symbol-50 mr-4">
                        <Profile user={reviewer} onClick={() => {}} />
                      </div>
                      <div className="overflow-hidden w-100px flex-grow-1 font-size-lg">
                        <div className="font-weight-bold">{reviewer?.name}</div>
                        <small className="d-block text-truncate">
                          {reviewer?.department}
                        </small>
                      </div>
                    </div>
                    <div className="d-flex flex-grow-1 flex-row">
                      <div className="d-flex flex-column col-8 p-0 align-items-center justify-content-center align-items-center justify-content-center">
                        <span className="text-center word-keep">
                          {reviewer?.description}
                        </span>
                      </div>
                      <div className="d-flex flex-column col-4 p-0 align-items-center justify-content-center">
                        {isSubmit ? (
                          <></>
                        ) : reviewer?.deletable ? (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => exceptReviewer(reviewer?.userId)}
                          >
                            제외
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                          >
                            필수
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    minHeight: "100px",
                  }}
                  className="text-dark-75 font-size-lg font-weight-normal text-center"
                >
                  Reviewer가 없습니다.
                </span>
              )}
            </Scroll>
            <div
              id="layer_reviewer_srchList"
              x-placement="bottom-start"
              className={isSelect ? "show" : undefined}
              style={{ top: `-${top}px` }}
            >
              {selectList ? (
                <div
                  className="reviewer-list px-7 border-bottom"
                  style={{ minHeight: "125px" }}
                >
                  <div className="text-nowrap mx-n2 text-center gutter-t gutter-b">
                    {selectList.map((reviewer) => (
                      <div
                        className="d-inline-block text-center"
                        onClick={() =>
                          setSelectList([
                            ...selectList.filter(
                              (filterUser) => filterUser?.id !== reviewer?.id
                            ),
                          ])
                        }
                      >
                        <div className="avatar symbol symbol-50 px-2">
                          <Profile user={reviewer} onClick={() => {}} />
                          <button
                            type="button"
                            className="btn btn-xs btn-icon btn-circle btn-danger btn-hover-text-primary"
                          >
                            <span className="svg-icon svg-icon-white svg-icon-2x">
                              <SVG name="minus" />
                            </span>
                          </button>
                        </div>
                        <div className="font-weight-bold">{reviewer?.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="quick-search-wrapper h-101 bg-white scroll ps">
                <Scroll
                  className="quick-search-result"
                  style={{ height: "39.1vh" }}
                >
                  {searchList.map((reviewer) => (
                    <div
                      className="d-flex align-items-center bg-hover-light cursor-pointer px-5 py-4 reviewer-item"
                      onClick={() =>
                        !selectList.find(
                          (findUser) => findUser?.id === reviewer?.id
                        ) && setSelectList([...selectList, reviewer])
                      }
                    >
                      <div className="avatar symbol symbol-40 cursor-pointer">
                        <Profile user={reviewer} onClick={() => {}} />
                      </div>
                      <div className="w-100px flex-grow-1 ml-5">
                        <div className="font-weight-bolder text-dark-75 font-size-md">
                          {`${reviewer?.position} ${reviewer?.name}`}
                        </div>
                        <div className="text-dark-50 m-0 flex-grow-1 font-size-sm">
                          {reviewer?.organizationName}
                        </div>
                      </div>
                    </div>
                  ))}
                </Scroll>
              </div>
            </div>
          </div>
        </Scroll>

        {isSubmit ? (
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
                        확정 후 수정할 수 없습니다. <br /> 확정하시겠습니까?
                      </>
                    ),
                  })
                }
              >
                확정하기
              </button>
            )}
          </div>
        )}
      </Scroll>
    </Modal>
  );
}
