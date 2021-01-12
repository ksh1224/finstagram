/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
import { useAuth, useModal } from "hooks/useRedux";
import { useMyOKR, useUserOKR } from "hooks/useOKRRedux";
import React, { useEffect, useState } from "react";
import SVG from "utils/SVG";
import DataValidationContainer from "layouts/DataValidationContainer";
import OKRAccordion from "./OKRAccordion";
import OKRGraph from "./OKRGraph";
import OKRWrite from "./OKRWrite";

type UserOKRType = {
  isMy?: boolean;
};

export default function UserOKR({ isMy }: UserOKRType) {
  let responseData: {
    data?: any;
    availableDates?: any;
    year?: any;
    quarter?: any;
    user?: any;
    extraData?: any;
  };
  let isFetching;
  let request: (arg0: number, arg1: number, arg2?: number) => void;
  if (isMy) ({ data: responseData = {}, isFetching, request } = useMyOKR());
  else ({ data: responseData = {}, isFetching, request } = useUserOKR());

  const { showModal } = useModal();
  const { data, availableDates, year, quarter, user } = responseData;
  const [show, setShow] = useState(false);
  const [okrWriteType, setOkrWriteType] = useState<"write" | "add" | "update">(
    "write"
  );
  const [updateOKRId, setUpdateOKRId] = useState<number>();
  const [isWrite, setIsWrite] = useState(false);
  const [isModifiable, setIsModifiable] = useState(false);
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [isModifiableOpen, setIsModifiableOpen] = useState(false);

  useEffect(() => {
    if (responseData?.extraData) {
      const {
        writeStartAt,
        writeEndAt,
        modifiableStartAt,
        modifiableEndAt,
      } = responseData.extraData;
      const now = new Date();
      const [writeStart, writeEnd, modifiableStart, modifiableEnd] = [
        new Date(writeStartAt),
        new Date(writeEndAt),
        new Date(modifiableStartAt),
        new Date(modifiableEndAt),
      ];
      writeStart.setHours(0, 0, 0, 0);
      writeEnd.setHours(23, 59, 59, 999);
      modifiableStart.setHours(0, 0, 0, 0);
      modifiableEnd.setHours(23, 59, 59, 999);
      setIsWrite(writeStart <= now && now <= writeEnd);
      setIsModifiable(modifiableStart <= now && now <= modifiableEnd);
    }
  }, [responseData]);

  useEffect(() => {
    setShow(true);
  }, []);

  function onChangeDate(changeYear: number, changeQuarter: number) {
    setShow(false);
    request(changeYear, changeQuarter, user?.id);
    setTimeout(() => setShow(true), 200);
  }

  const onUpdateOKR = (id: number) => {
    setUpdateOKRId(id);
    setOkrWriteType("update");
    setIsWriteOpen(true);
  };

  return (
    <div
      className={
        isMy
          ? "section-group-2 col-auto h-sm-100 flex-grow-1 w-100px d-flex flex-column"
          : "section-2 col-auto h-sm-100 flex-grow-1 w-100px d-flex flex-column px-0"
      }
    >
      <div className="card card-custom card-stretch rounded-bottom-0">
        <div className="card-header border-0">
          <h3 className="card-title font-weight-bolder">
            {isMy ? "My OKR" : `${user?.name} OKR`}
          </h3>

          {!isMy && (
            <div className="fb-btn-group d-flex w-100px flex-grow-1 align-items-center">
              <a
                className="btn btn-text-dark-50 btn-icon-gray btn-hover-icon-primary text-hover-primary font-weight-bold btn-sm text-left p-0 align-items-center mx-5 d-none"
                href="javascript:;"
                data-toggle="modal"
                data-target="#modal_sendFeedback"
                onClick={() => showModal("sendFeedback", user)}
              >
                <span className="svg-icon svg-icon-md mr-3">
                  <SVG name="sendMessage" />
                </span>
                피드백 보내기
              </a>
              <a
                className="btn btn-text-dark-50 btn-icon-gray btn-hover-icon-primary text-hover-primary font-weight-bold btn-sm text-left p-0 align-items-center mx-5 d-none"
                href="javascript:;"
                data-toggle="modal"
                data-target="#modal_requestFeedback"
                onClick={() => showModal("requestFeedback", user)}
              >
                <span className="svg-icon svg-icon-md mr-3">
                  <SVG name="requestMessage" />
                </span>
                피드백 요청하기
              </a>
              <div className="dropdown dropdown-inline">
                <button
                  type="button"
                  className="btn btn-lg btn-hover-icon-primary bg-hover-light font-weight-bolder rounded font-size-sm p-2 ml-2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="svg-icon m-0">
                    <SVG name="message" />
                  </span>
                </button>
                <div className="dropdown-menu">
                  <a
                    className="dropdown-item"
                    href="javascript:;"
                    data-toggle="modal"
                    data-target="#modal_sendFeedback"
                    onClick={() => showModal("sendFeedback", user)}
                  >
                    피드백 보내기
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:;"
                    data-toggle="modal"
                    data-target="#modal_requestFeedback"
                    onClick={() => showModal("requestFeedback", user)}
                  >
                    피드백 요청하기
                  </a>
                </div>
              </div>
            </div>
          )}
          <div className="card-toolbar">
            <select
              onChange={({ target }) => {
                const [changeYear, changeQuarter] = target.value.split("_");
                onChangeDate(Number(changeYear), Number(changeQuarter));
              }}
              className="custom-select form-control border-0 shadow-none pr-5 bgi-position-x-right"
            >
              {availableDates &&
                availableDates.map(
                  ({ year: selectYear, quarter: selectQuarter }: any) => (
                    <option
                      selected={
                        selectYear === year && selectQuarter === quarter
                      }
                      value={`${selectYear}_${selectQuarter}`}
                    >{`${selectYear}년 ${selectQuarter}분기`}</option>
                  )
                )}
            </select>
          </div>
        </div>

        <div className="card-body pt-2 overflow-y-auto">
          <DataValidationContainer isFetching={!availableDates && isFetching}>
            <div className="gutter-t mb-10">
              <div className="d-flex justify-content-between align-items-center">
                <OKRGraph
                  show={show}
                  rowScore={data?.progressLow}
                  mediumScore={data?.progressMid}
                  highScore={data?.progressHigh}
                />
              </div>
            </div>
            {!data ? (
              isWrite && isMy ? (
                <div className="text-center my-10">
                  <p className="font-size-h5 mb-6">
                    {`${year}년 ${quarter}분기 OKR을 작성해 주세요.`}
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    data-toggle="layer"
                    data-target="#layer_createOKR"
                    onClick={() => {
                      setOkrWriteType("write");
                      setIsWriteOpen(true);
                    }}
                  >
                    <span className="svg-icon">
                      <SVG name="write" />
                    </span>
                    OKR 작성
                  </button>
                </div>
              ) : (
                <div className="text-center my-10">
                  <p className="font-size-h5 mb-6">
                    {`${year}년 ${quarter}분기 OKR Data가 없습니다.`}
                  </p>
                </div>
              )
            ) : (
              <>
                <OKRAccordion
                  onUpdateOKR={onUpdateOKR}
                  objectives={data?.objective}
                  user={user}
                />
                {isMy && (isWrite || isModifiable) && (
                  <div className="text-center mt-n4">
                    <a
                      className="svg-icon svg-icon-primary svg-icon-xxl"
                      onClick={() => {
                        setOkrWriteType("add");
                        setIsWriteOpen(true);
                      }}
                    >
                      <SVG name="bigPlus" />
                    </a>
                  </div>
                )}
              </>
            )}
          </DataValidationContainer>
        </div>
        <OKRWrite
          type={okrWriteType}
          show={isWriteOpen}
          close={() => setIsWriteOpen(false)}
          updateOKRId={updateOKRId}
          year={year}
          quarter={quarter}
        />
      </div>
    </div>
  );
}
