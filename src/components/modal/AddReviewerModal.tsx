/* eslint-disable no-nested-ternary */
import { Modal } from "react-bootstrap";
import { useAuth, useModal, useSearchUser } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import SVG from "utils/SVG";
import axios from "utils/axiosUtil";
import Scroll from "components/Scroll";
import Profile from "components/Profile";
import { useReviewMain } from "hooks/useReview";
import { searchListUser } from "utils/searchUtil";

export default function AddReviewerModal() {
  const { user: my } = useAuth();
  const { request } = useReviewMain();
  const { modals, closeModal, showModal } = useModal();
  const [isSubmit, setIsSubmit] = useState(false);
  const [reviewerlist, setReviewerList] = useState<any[]>([]);
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [searchList, setSearchList] = useState<any[]>([]);
  const [selectList, setSelectList] = useState<any[]>([]);
  const { data: userData } = useSearchUser();

  const addReviewerModal = modals.find((modal) => modal.name === "addReviewer");
  const { meta } = addReviewerModal?.param || {};

  function close() {
    setText("");
    request(meta.id);
    closeModal("addReviewer");
  }

  const getData = async () => {
    try {
      const { data } = await axios(
        `/review/peer/reviewee/team/list/${my?.id}?metaId=${meta.id}`,
        "GET"
      );
      setReviewerList(data?.data);
      setFeedbackList(data?.feedbackUsers);
      setIsSubmit(data?.submitted);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addReviewer = async (description: string, reviewerId?: number) => {
    try {
      const body = reviewerId
        ? { reviewerId, description }
        : {
            data: selectList.map((user: any) => ({
              reviewerId: user.id,
              description,
            })),
          };
      const res = await axios(
        `/review/peer/reviewee/new${reviewerId ? "" : "/all"}?metaId=${
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

  const exceptReviewer = async (userId: number) => {
    try {
      const res = await axios(
        `/review/peer/reviewee/delete/${userId}`,
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
        `/review/peer/reviewee/submit?metaId=${meta.id}`,
        "POST"
      );
      if (res.responseCode === "SUCCESS") {
        close();
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

  const isSelect =
    (text && text.trim().length > 1) || (selectList && selectList.length > 0);

  return (
    <Modal
      show={!!addReviewerModal}
      animation
      centered
      onHide={() => close()}
      id="modal_myReviewer"
    >
      <Scroll className="modal-content" style={{ maxHeight: "95vh" }}>
        <div className="modal-header">
          <h5 className="modal-title">나의 Reviewer</h5>
          <button type="button" className="close" onClick={() => close()}>
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </div>
        <Scroll className="modal-body px-0" style={{ maxHeight: "90vh" }}>
          {isSubmit ? (
            <></>
          ) : (
            <div className="border-bottom px-7">
              <h5 className="font-weight-bolder gutter-b text-dark">
                나의 Reviewer 찾기
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
            <div className="d-flex flex-column pt-4 px-7">
              <h5 className="font-weight-bolder text-dark mb-4 word-keep">
                Finstagram에서 Feedback을 주거나 받은 동료
              </h5>
              <div
                className="text-nowrap mx-n2 text-center reviewer-list gutter-b"
                style={{ height: "74px" }}
              >
                {feedbackList.map((feedbackUser) => {
                  const isInclude = !!reviewerlist.find(
                    (reviewer) => reviewer.userId === feedbackUser.id
                  );
                  return (
                    <div
                      className="d-inline-block text-center"
                      style={isInclude ? { opacity: "50%" } : {}}
                      onClick={() =>
                        !isInclude &&
                        showModal("addReviewerComment", {
                          feedbackUser,
                          addReviewer,
                        })
                      }
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

          <div className="d-flex position-relative flex-column pt-4 px-7">
            <div className="d-flex flex-grow-1 flex-row pb-4">
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
              {reviewerlist.map((user) => (
                <div className="d-flex py-4 border-top border-light-dark">
                  <div className="d-flex w-150px align-items-center">
                    <div className="avatar symbol symbol-50 mr-4">
                      <Profile user={user} onClick={() => {}} />
                    </div>
                    <div className="overflow-hidden w-100px flex-grow-1 font-size-lg">
                      <div className="font-weight-bold">{user?.name}</div>
                      <small className="d-block text-truncate">
                        {user?.department}
                      </small>
                    </div>
                  </div>
                  <div className="d-flex flex-grow-1 flex-row">
                    <div className="d-flex flex-column col-8 p-0 align-items-center justify-content-center align-items-center justify-content-center">
                      <span className="text-center word-keep">
                        {user?.description}
                      </span>
                    </div>
                    <div className="d-flex flex-column col-4 p-0 align-items-center justify-content-center">
                      {isSubmit ? (
                        <></>
                      ) : user.type !== "EXTRA_BY_EVALUATOR" &&
                        user?.deletable ? (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => exceptReviewer(user?.userId)}
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
              ))}
            </Scroll>
            <div
              id="layer_reviewer_srchList"
              x-placement="bottom-start"
              className={isSelect ? "show" : undefined}
              style={{ top: "-147px" }}
            >
              {selectList ? (
                <div
                  className="reviewer-list px-7 border-bottom"
                  style={{ minHeight: "125px" }}
                >
                  <div className="text-nowrap mx-n2 text-center gutter-t gutter-b">
                    {selectList.map((user) => (
                      <div
                        className="d-inline-block text-center"
                        onClick={() =>
                          setSelectList([
                            ...selectList.filter(
                              (filterUser) => filterUser?.id !== user?.id
                            ),
                          ])
                        }
                      >
                        <div className="avatar symbol symbol-50 px-2">
                          <Profile user={user} onClick={() => {}} />
                          <button
                            type="button"
                            className="btn btn-xs btn-icon btn-circle btn-danger btn-hover-text-primary"
                          >
                            <span className="svg-icon svg-icon-white svg-icon-2x">
                              <SVG name="minus" />
                            </span>
                          </button>
                        </div>
                        <div className="font-weight-bold">{user?.name}</div>
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
                  {searchList.map((user) => (
                    <div
                      className="d-flex align-items-center bg-hover-light cursor-pointer px-5 py-4 reviewer-item"
                      onClick={() =>
                        !selectList.find(
                          (findUser) => findUser?.id === user?.id
                        ) && setSelectList([...selectList, user])
                      }
                    >
                      <div className="avatar symbol symbol-40 cursor-pointer">
                        <Profile user={user} onClick={() => {}} />
                      </div>
                      <div className="w-100px flex-grow-1 ml-5">
                        <div className="font-weight-bolder text-dark-75 font-size-md">
                          {`${user?.position} ${user?.name}`}
                        </div>
                        <div className="text-dark-50 m-0 flex-grow-1 font-size-sm">
                          {user?.organizationName}
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
                onClick={() =>
                  showModal("addReviewerComment", { selectList, addReviewer })
                }
              >
                추가하기
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-lg btn-primary w-100 m-0 rounded-0"
                onClick={() => fixReviewer()}
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
