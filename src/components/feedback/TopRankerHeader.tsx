import { useModal } from "hooks/useRedux";
import React, { useEffect, useState } from "react";

type TopRankerHeaderType = {
  isQuerter?: boolean;
  orgGroupId?: number;
  setIsQuerter?: React.Dispatch<React.SetStateAction<boolean>>;
  setOrgGroupId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  AllGroup?: {
    orgGroup: {
      id: number;
      name: string;
    };
  }[];
  QuerterGroup?: {
    orgGroup: {
      id: number;
      name: string;
    };
  }[];
};

export default function TopRankerHeader({
  isQuerter,
  setIsQuerter,
  AllGroup,
  QuerterGroup,
  orgGroupId,
  setOrgGroupId,
}: TopRankerHeaderType) {
  const { showModal } = useModal();

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
      <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
        <ul className="nav nav-tabs nav-tabs-line border-0 flex-grow-1">
          {isQuerter
            ? AllGroup?.map(({ orgGroup }) => (
                <li key={orgGroup.id} className="nav-item">
                  <a
                    className={`nav-link border-0 ${
                      orgGroup.id === orgGroupId ? "active" : ""
                    }`}
                    onClick={() => setOrgGroupId && setOrgGroupId(orgGroup.id)}
                  >
                    {orgGroup.name}
                  </a>
                </li>
              ))
            : QuerterGroup?.map(({ orgGroup }) => (
                <li key={orgGroup.id} className="nav-item">
                  <a
                    href="javascript:;"
                    className={`nav-link border-0 ${
                      orgGroup.id === orgGroupId ? "active" : ""
                    }`}
                    onClick={() => setOrgGroupId && setOrgGroupId(orgGroup.id)}
                  >
                    {orgGroup.name}
                  </a>
                </li>
              ))}
        </ul>
        <a
          href="javascript:;"
          className="text-dark-75 font-weight-bold"
          onClick={() => showModal("topRanker", { orgGroupId })}
        >
          더보기
        </a>
      </div>
    </div>
  );
}

TopRankerHeader.defaultProps = {
  isQuerter: false,
  orgGroupId: -1,
  setIsQuerter: () => {},
  setOrgGroupId: () => {},
  AllGroup: [],
  QuerterGroup: [],
};
