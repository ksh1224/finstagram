/* eslint-disable react/no-array-index-key */
import { useReviewMain } from "hooks/useReview";
import React, { createRef, useEffect, useState, useRef } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import SelfReview from "components/review/SelfReview";
import { getDeadline } from "utils/dateUtil";
import PeerReview from "components/review/PeerReview";
import TeamReview from "components/review/TeamReview";
import SelfReviewResult from "components/review/SelfReviewResult";
import { useAuth } from "hooks/useRedux";
import PeerReviewResult from "components/review/PeerReviewResult";
import LeaderReviewResult from "components/review/LeaderReviewResult";
import TeamReviewResult from "components/review/TeamReviewResult";
import OKRReviewResult from "components/review/OKRReviewResult";
import useWindowSize from "hooks/useWindowSize";
import Scroll from "components/Scroll";
import useScrollTop from "hooks/useScrollTop";
import styles from "./review.scss";

export default function Review() {
  const {
    request,
    availableMetas = [],
    data = {},
    isFetching,
  } = useReviewMain();
  const { width: windowWidth } = useWindowSize();
  const scrollRef = createRef<HTMLDivElement>();
  const mobileScrollRef = useRef<HTMLElement>(document.documentElement);
  const { user: my } = useAuth();
  const [selectMeta, setSelectMeta] = useState<any>();
  const [resultIndex, setResultIndex] = useState(0);
  const [tabArr, setTabArr] = useState<{ height: number; index: number }[]>([]);

  const calculateHeight = () => {
    if (scrollRef.current) {
      let top = 0;
      const newArr: { height: number; index: number }[] = [];
      scrollRef.current.childNodes.forEach((childNode: any, index) => {
        const { height } = childNode.getBoundingClientRect();
        if (height !== 0) {
          if (top === 0) setResultIndex(index);
          top += height + 97.5;
          newArr.push({ height: top, index });
        }
      });
      setTabArr(newArr);
    }
  };

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    if (!selectMeta) setSelectMeta(availableMetas[0]);
  }, [availableMetas]);

  useEffect(() => {
    if (scrollRef.current) {
      calculateHeight();
      scrollRef.current.scrollTo(0, 1);
      scrollRef.current.scrollTo(0, 0);
    }
  }, [data]);

  const {
    reviewLeaderIncluded,
    reviewOkrIncluded,
    reviewPeerIncluded,
    reviewSelfIncluded,
    date = {},
    meta = {},
    progress = {},
  } = data;

  const { dateShowResult } = date;

  const { isWrite } = getDeadline(dateShowResult);

  useScrollTop(tabArr, (el) => {
    const { scrollTop } = el;
    mobileScrollRef.current = el;
    if (!isWrite && scrollRef.current) {
      if (scrollTop === 0 && tabArr[0]) {
        setResultIndex(tabArr[0].index);
        calculateHeight();
        return;
      }
      let prevTabHeight = 0;
      tabArr.forEach((tab, i) => {
        if (scrollTop === 0) {
          setResultIndex(tabArr[0].index);
        } else if (prevTabHeight < scrollTop && scrollTop <= tab.height) {
          setResultIndex(tabArr[i].index);
        }
        prevTabHeight = tab.height;
      });
    }
  });

  useEffect(() => {
    if (!isWrite && windowWidth && scrollRef.current && windowWidth <= 767) {
      scrollRef.current.scrollTo(0, 1);
      scrollRef.current.scrollTo(0, 0);
    }
    calculateHeight();
  }, [windowWidth]);

  const click = (index: number) => {
    const tab = tabArr.find(({ index: tabIndex }) => index - 1 === tabIndex);
    scrollRef.current?.scrollTo({
      behavior: "smooth",
      top: (tab?.height || 0) + 1,
    });
    mobileScrollRef.current?.scrollTo({
      behavior: "smooth",
      top: (tab?.height || 0) + 1,
    });
  };

  return (
    <div
      className="content container-fluid tab-pane pb-0 show active"
      id="content_tab_review"
      role="tabpanel"
      aria-labelledby="content_tab_review"
    >
      {!isFetching || availableMetas[0] ? (
        <div className="d-flex flex-column col h-100 p-0">
          <div
            className="d-flex flex-center mt-5 mb-10 review-top-select"
            style={{ zIndex: 999 }}
          >
            <DropdownButton
              className="dropdown bootstrap-select form-control max-w-200px bg-light"
              style={styles}
              title={meta?.name}
              variant="light"
            >
              {availableMetas &&
                availableMetas.map((metaData: any) => (
                  <Dropdown.Item
                    onClick={() => {
                      setSelectMeta(metaData);
                      request(metaData.id);
                    }}
                  >
                    {metaData.name}
                  </Dropdown.Item>
                ))}
            </DropdownButton>
          </div>
          {isWrite ? (
            <div className="row h-100 p-0 section-review flex-nowrap">
              <div className="review-wrap">
                <SelfReview />
              </div>
              <div
                className="review-two-wrap  h-100"
                style={{
                  display:
                    reviewPeerIncluded ||
                    ((reviewOkrIncluded || reviewSelfIncluded) &&
                      my.isReviewer) ||
                    reviewLeaderIncluded
                      ? "flex"
                      : "none",
                  flex:
                    (!windowWidth || windowWidth > 991) &&
                    reviewPeerIncluded &&
                    (((reviewOkrIncluded || reviewSelfIncluded) &&
                      my.isReviewer) ||
                      reviewLeaderIncluded)
                      ? 2
                      : 1,
                }}
              >
                {reviewPeerIncluded && (
                  <div className="review-wrap">
                    <PeerReview />
                  </div>
                )}

                {(((reviewOkrIncluded || reviewSelfIncluded) &&
                  my.isReviewer) ||
                  (reviewLeaderIncluded &&
                    progress?.leadership?.length &&
                    progress.leadership.length !== 0)) && (
                  <div className="review-wrap">
                    <TeamReview />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="row flex-grow-1 h-100px p-0" id="tab-review">
              <div className="col-auto h-sm-100 flex-grow-1 w-100">
                <div className="card card-custom flex-row h-100 review-result">
                  <div className="section-1 col-auto h-sm-100 w-400px d-flex flex-column border-right px-0">
                    <div className="card card-custom card-stretch rounded-20 shadow-none">
                      <div className="card-body position-relative px-10 py-0">
                        <div className="d-flex flex-column h-100">
                          <div className="review-tabs my-8 tab-menu">
                            <ul
                              className="header-tabs nav flex-column h-100"
                              role="tablist"
                            >
                              {[
                                reviewOkrIncluded,
                                reviewSelfIncluded,
                                reviewPeerIncluded,
                                reviewLeaderIncluded && my.isReviewer,
                                reviewSelfIncluded && my.isReviewer,
                              ].map((show: any, index) => {
                                let title = "OKR";
                                if (index === 1) title = "성과";
                                else if (index === 2) title = "동료";
                                else if (index === 3) title = "리더";
                                else if (index === 4) title = "팀원";

                                if (show)
                                  return (
                                    <li className="h-50px cursor-pointer ㄴ">
                                      <a
                                        className={`mx-0 pl-8 ${
                                          index === resultIndex ? "active" : ""
                                        }`}
                                        onClick={() => click(index)}
                                      >
                                        <span className="font-weight-bolder">
                                          {title}
                                          <span className="text-review">
                                            {" "}
                                            Review
                                          </span>
                                        </span>
                                      </a>
                                    </li>
                                  );
                                return <></>;
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="section-2 col-auto h-sm-100 flex-grow-1 w-100px d-flex flex-column px-0">
                    <div className="card card-custom card-stretch rounded-20 shadow-none">
                      <div className="card-body position-relative px-10 py-0">
                        <Scroll
                          className="h-100 tab-container py-8"
                          ref={scrollRef}
                          onScroll={() => {
                            if (scrollRef.current) {
                              const {
                                scrollTop,
                                clientHeight,
                                scrollHeight,
                              } = scrollRef.current;

                              if (scrollTop === 0 && tabArr[0]) {
                                setResultIndex(tabArr[0].index);
                                calculateHeight();
                                return;
                              }
                              let prevTabHeight = 0;
                              tabArr.forEach((tab, i) => {
                                if (scrollTop === 0) {
                                  setResultIndex(tabArr[0].index);
                                } else if (
                                  scrollTop + clientHeight >=
                                  scrollHeight
                                )
                                  setResultIndex(
                                    tabArr[tabArr.length - 1].index
                                  );
                                else if (
                                  prevTabHeight < scrollTop &&
                                  scrollTop <= tab.height
                                ) {
                                  setResultIndex(tabArr[i].index);
                                }
                                prevTabHeight = tab.height;
                              });
                            }
                          }}
                        >
                          {[
                            reviewOkrIncluded,
                            reviewSelfIncluded,
                            reviewPeerIncluded,
                            reviewLeaderIncluded && my.isReviewer,
                            reviewSelfIncluded && my.isReviewer,
                          ].map((show: any, index) => {
                            let review = <OKRReviewResult />;
                            if (index === 1) review = <SelfReviewResult />;
                            else if (index === 2) review = <PeerReviewResult />;
                            else if (index === 3)
                              review = <LeaderReviewResult />;
                            else if (index === 4) review = <TeamReviewResult />;
                            return (
                              <div
                                id={`result_${index}`}
                                key={`result_${index}`}
                              >
                                {show ? review : <></>}
                              </div>
                            );
                          })}
                        </Scroll>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex w-100 h-100 align-items-center justify-content-center">
          <div className="spinner spinner-primary spinner-lg spinner-center w-100 h-50px" />
        </div>
      )}
    </div>
  );
}
