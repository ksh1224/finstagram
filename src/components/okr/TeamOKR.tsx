import Profile from "components/Profile";
import { useAuth } from "hooks/useRedux";
import { useTeamOKR } from "hooks/useOKRRedux";
import React, { useEffect, useState } from "react";
import DataValidationContainer from "layouts/DataValidationContainer";
import OKRAccordion from "./OKRAccordion";
import OKRGraph from "./OKRGraph";

export default function TeamOKR() {
  const { data: responseData = {}, isFetching, request } = useTeamOKR();
  const {
    data,
    availableDates,
    year,
    quarter,
    organizationId,
    organizationName,
  } = responseData;
  const memberData = data?.data;
  const { user: my } = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  function changeDate(changeYear: number, changeQuarter: number) {
    setShow(false);
    request(changeYear, changeQuarter, organizationId, organizationName);
    setTimeout(() => setShow(true), 200);
  }

  return (
    <div className="section-2 col-auto h-sm-100 flex-grow-1 w-100px d-flex flex-column px-0">
      <div className="card card-custom card-stretch rounded-bottom-0 shadow-none">
        <div className="card-header border-0">
          <h3 className="card-title font-weight-bolder">
            {organizationName || "Team OKR"}
          </h3>
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
            {(!memberData || memberData.length === 0) && (
              <div className="text-center my-10">
                <p className="font-size-h5 mb-6">
                  {(data?.progressLow || 0) +
                    (data?.progressMid || 0) +
                    (data?.progressHigh || 0) ===
                  0
                    ? `${year}년 ${quarter}분기 OKR Data가 없습니다.`
                    : ``}
                </p>
              </div>
            )}
            {memberData &&
              memberData.map((member: any) => (
                <>
                  <div className="d-flex align-items-center w-100 mb-3">
                    <Profile user={member?.user} />
                    <div className="font-weight-bolder text-dark font-size-lg ml-3">
                      {member?.user?.name}
                    </div>
                    {my.id === member?.user?.id && (
                      <span className="label label-lg label-info font-weight-bolder ml-2">
                        나
                      </span>
                    )}
                  </div>
                  <OKRAccordion
                    objectives={member?.objective}
                    user={member?.user}
                  />
                </>
              ))}
          </DataValidationContainer>
        </div>
      </div>
    </div>
  );
}
