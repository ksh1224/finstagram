/* eslint-disable react-hooks/rules-of-hooks */
import OKRSearchInput from "components/input/OKRSearchInput";
import SearchListItem from "components/item/SearchListItem";
import Profile from "components/Profile";
import { useAuth, useMyOKR, useUserOKR } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { searchList } from "utils/searchUtil";
import SVG from "utils/SVG";
import ObjectiveItem from "./ObjectiveItem";
import OKRGraph from "./OKRGraph";
import TeamList from "./TeamList";

type UserOKRType = {
  isMy?: boolean;
};

export default function UserOKR({ isMy }: UserOKRType) {
  let responseData;
  let isFetching;
  let requset: (arg0: number, arg1: number, arg2?: number) => void;
  if (isMy) ({ data: responseData, isFetching, requset } = useMyOKR());
  else ({ data: responseData, isFetching, requset } = useUserOKR());
  const { data, availableDates, year, quarter } = responseData;
  console.log("responseData", responseData);
  console.log("data", data);
  const [show, setShow] = useState(false);

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
          {!data && (
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
          )}
          {data && (
            <div
              className="accordion accordion-toggle-arrow mb-10"
              id={`okr_ac_${data?.id}`}
            >
              {data?.objective &&
                data?.objective.map((objective: any, objectIndex: number) => (
                  <ObjectiveItem
                    objective={objective}
                    objectIndex={objectIndex}
                    animationIndex={data?.id}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
