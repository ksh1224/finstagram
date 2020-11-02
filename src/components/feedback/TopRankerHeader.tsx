import React, { useEffect, useState } from "react";

type TopRankerHeaderType = {
  isQuerter?: boolean;
  setIsQuerter?: React.Dispatch<React.SetStateAction<boolean>>;
  setOrgGroupId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  AllGroup?: [
    {
      orgGroup: {
        id: number;
        name: string;
      };
    }
  ];
  QuerterGroup?: [
    {
      orgGroup: {
        id: number;
        name: string;
      };
    }
  ];
};

export default function TopRankerHeader({
  isQuerter,
  setIsQuerter,
  AllGroup,
  QuerterGroup,
  setOrgGroupId,
}: TopRankerHeaderType) {
  return (
    <div className="card-header border-0 pt-3 min-h-auto">
      <h3 className="card-title font-weight-bolder">Top Ranker</h3>
      <div className="card-toolbar">
        <div
          className="btn-group card-toolbar"
          role="group"
          data-toggle="switchBtn"
          data-act-css="btn-light-dark btn-hover-light-dark"
          data-inact-css="btn-light"
        >
          <button
            type="button"
            className={`btn btn-sm ${
              !isQuerter ? "btn-light-dark btn-hover-light-dark" : "btn-light"
            }`}
            onClick={() => setIsQuerter && setIsQuerter(false)}
          >
            연간
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              isQuerter ? "btn-light-dark btn-hover-light-dark" : "btn-light"
            }`}
            onClick={() => setIsQuerter && setIsQuerter(true)}
          >
            분기
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center w-100">
        <ul className="nav nav-tabs nav-tabs-line border-0 w-100px flex-grow-1">
          {isQuerter
            ? AllGroup?.map(({ orgGroup }) => (
                <li className="nav-item">
                  <a
                    className="nav-link border-0"
                    data-toggle="tab"
                    href={`#ranking_tab_${orgGroup.id}`}
                    onClick={() => setOrgGroupId && setOrgGroupId(orgGroup.id)}
                  >
                    {orgGroup.name}
                  </a>
                </li>
              ))
            : QuerterGroup?.map(({ orgGroup }) => (
                <li className="nav-item">
                  <a
                    className="nav-link border-0"
                    data-toggle="tab"
                    href={`#ranking_tab_${orgGroup.id}`}
                  >
                    {orgGroup.name}
                  </a>
                </li>
              ))}
        </ul>
        <a
          className="text-dark-75 font-weight-bold"
          href="javascript:;"
          data-toggle="modal"
          data-target="#modal_topRanker"
        >
          더보기
        </a>
      </div>
    </div>
  );
}

TopRankerHeader.defaultProps = {
  isQuerter: false,
  setIsQuerter: () => {},
};
