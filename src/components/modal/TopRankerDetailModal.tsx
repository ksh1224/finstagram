/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Profile from "components/Profile";
import { Modal } from "react-bootstrap";
import { useModal } from "hooks/useRedux";
import { useTopRankerDetail } from "hooks/useFeedBackRedux";
import React, { useEffect, useState, createRef } from "react";
import SVG from "utils/SVG";
import TopRankerItem, {
  TopRankerItemType,
} from "components/item/TopRankerItem";

export default function TopRankerDetailModal() {
  const { modals, closeModal } = useModal();
  const {
    data,
    extraData,
    availableDates,
    availableOptions,
    isFetching,
    request,
  } = useTopRankerDetail();
  const sendFeedbackModal = modals.find(
    (modal: any) => modal.name === "topRanker"
  );
  const [orgGroupIndex, setOrgGroupIndex] = useState<number | null>(null);
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const [selectDate, setSelectDate] = useState({ year: "0", quarter: "0" });

  useEffect(() => {
    if (sendFeedbackModal) request(sendFeedbackModal?.param.orgGroupId);
  }, [modals]);

  useEffect(() => {
    const { year, quarter } = selectDate;
    if (year && quarter && orgGroupIndex !== null && availableOptions)
      request(availableOptions[orgGroupIndex].id, year, quarter);
  }, [selectDate]);

  useEffect(() => {
    if (
      availableOptions &&
      orgGroupIndex === null &&
      sendFeedbackModal?.param.orgGroupId
    ) {
      availableOptions.forEach((option: any, i: number) => {
        if (option.id === sendFeedbackModal?.param.orgGroupId) {
          setOrgGroupIndex(i);
        }
      });
    }
  }, [availableOptions]);

  function close() {
    closeModal("topRanker");
    setOrgGroupIndex(null);
    setSelectIndex(0);
  }

  return (
    <Modal
      show={!!sendFeedbackModal && orgGroupIndex !== null}
      animation
      centered
      onHide={() => close()}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">칭찬 배지 Top Ranker</h5>
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
          <select
            onChange={({ target }) => {
              request(target.value, selectDate.year, selectDate.quarter);
              availableOptions.forEach((option: any, i: number) => {
                if (option.id === Number(target.value)) {
                  setOrgGroupIndex(i);
                }
              });
            }}
            className="custom-select form-control w-auto"
          >
            {availableOptions?.map((optionData: any, i: number) => (
              <option
                selected={i === orgGroupIndex}
                value={`${optionData?.id}`}
              >
                {optionData.name}
              </option>
            ))}
          </select>
          <select
            onChange={({ target }) => {
              const [year, quarter] = target.value.split("_");
              setSelectDate({ year, quarter });
            }}
            className="custom-select form-control w-auto ml-2"
          >
            {availableDates?.map(({ year, quarter }: any) => (
              <option
                selected={
                  selectDate?.year === year && selectDate?.quarter === quarter
                }
                value={`${year}_${quarter}`}
              >{`${year}년 ${quarter}분기`}</option>
            ))}
          </select>
          <div className="feedback-icon-group mx-n7 pt-7 pb-10">
            <div className="text-nowrap px-7 d-flex justify-content-between">
              <div
                className="d-inline-block text-center"
                onClick={() => setSelectIndex(0)}
              >
                <span
                  className={`feedback-icon hover-on ${
                    selectIndex === 0 ? "on" : ""
                  }`}
                >
                  <SVG
                    className="w-50px h-50px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 90 90"
                    name="total"
                  />
                </span>
              </div>
              {data &&
                data.map((badgeData: any, i: number) => (
                  <div
                    className="d-inline-block text-center"
                    onClick={() => setSelectIndex(i + 1)}
                  >
                    <span className="feedback-icon hover-on on">
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "25px",
                          border: `1.5px solid ${
                            selectIndex === i + 1 ? "#000" : "#5555"
                          }`,
                        }}
                        src={badgeData?.feedbackBadge?.selectedFileUrlHttps}
                        alt=""
                      />
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div
            style={{ maxHeight: "300px" }}
            className="overflow-hidden overflow-y-auto"
          >
            {selectIndex === 0 ? (
              extraData && extraData.length !== 0 ? (
                extraData.map(({ count, user, rank }: any) => (
                  <TopRankerItem
                    rank={rank}
                    feedbackReceived={count}
                    user={user}
                    topFeedbackReceived={extraData[0]?.count}
                  />
                ))
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: "200px" }}
                >
                  <div className="w-100 py-8 text-center word-keep">
                    Top Ranker가 없습니다.
                  </div>
                </div>
              )
            ) : data &&
              data[selectIndex]?.data &&
              data[selectIndex].data.length !== 0 ? (
              data[selectIndex].data.map(({ count, user, rank }: any) => (
                <TopRankerItem
                  rank={rank}
                  feedbackReceived={count}
                  user={user}
                  topFeedbackReceived={data[selectIndex]?.data[0]?.count}
                />
              ))
            ) : (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "200px" }}
              >
                <div className="w-100 py-8 text-center word-keep">
                  Top Ranker가 없습니다.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
