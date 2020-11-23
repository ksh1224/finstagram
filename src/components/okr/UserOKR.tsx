/* eslint-disable react-hooks/rules-of-hooks */
import { useAuth, useModal } from "hooks/useRedux";
import { useMyOKR, useUserOKR } from "hooks/useOKRRedux";
import React, { useEffect, useState } from "react";
import SVG from "utils/SVG";
import OKRAccordion from "./OKRAccordion";
import OKRGraph from "./OKRGraph";

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
  let requset: (arg0: number, arg1: number, arg2?: number) => void;
  if (isMy) ({ data: responseData, isFetching, requset } = useMyOKR());
  else ({ data: responseData, isFetching, requset } = useUserOKR());
  const { showModal } = useModal();
  const { data, availableDates, year, quarter, user } = responseData;
  const [show, setShow] = useState(false);
  const [isWrite, setIsWrite] = useState(false);
  const [isModifiable, setIsModifiable] = useState(false);

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

  function changeDate(changeYear: number, changeQuarter: number) {
    setShow(false);
    requset(changeYear, changeQuarter);
    setTimeout(() => setShow(true), 200);
  }

  return (
    <div className="section-group-2 col-auto h-sm-100 flex-grow-1 w-100px d-flex flex-column">
      <div className="card card-custom card-stretch rounded-bottom-0">
        <div className="card-header border-0">
          <h3 className="card-title font-weight-bolder">My OKR</h3>
          <div className="card-toolbar">
            <select
              onChange={({ target }) => {
                const [changeYear, changeQuarter] = target.value.split("_");
                changeDate(Number(changeYear), Number(changeQuarter));
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
          {!data &&
            (isWrite && isMy ? (
              <div className="text-center my-10">
                <p className="font-size-h5 mb-6">
                  {`${year}년 ${quarter}분기 OKR을 작성해 주세요.`}
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-toggle="layer"
                  data-target="#layer_createOKR"
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
            ))}
          {data && (
            <>
              <OKRAccordion objectives={data?.objective} user={user} />
              {isMy && (isWrite || isModifiable) && (
                <div className="text-center mt-n4">
                  <a
                    href="javascript:;"
                    className="svg-icon svg-icon-primary svg-icon-xxl"
                    data-toggle="layer"
                    data-target="#layer_createOKR"
                  >
                    <SVG name="plus" />
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
