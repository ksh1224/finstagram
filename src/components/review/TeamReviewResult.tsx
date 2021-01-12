import Profile from "components/Profile";
import { useModal } from "hooks/useRedux";
import { useReviewMain, useReviewTeamList } from "hooks/useReview";
import React, { useEffect, useState } from "react";
import { searchList } from "utils/searchUtil";
import SVG from "utils/SVG";

export default function TeamReviewResult() {
  const { showModal } = useModal();
  const { data = {} } = useReviewMain();
  const { data: teamListData, request: teamListRequest } = useReviewTeamList();
  const [text, setText] = useState("");
  const { meta } = data || {};

  useEffect(() => {
    teamListRequest(meta.id);
  }, [meta]);

  const findList =
    text.trim().length > 1
      ? searchList(teamListData, text, ["user", "name"])
      : teamListData;
  return (
    <div className="mb-30 tab-group">
      <h3 className="d-flex h-40px font-weight-bolder align-items-center mb-0">
        팀원 Review 결과
      </h3>
      <div className="d-flex flex-column position-relative overflow-y-auto flex-grow-1 mt-10">
        <div className="d-flex flex-column">
          <div className="quick-search quick-search-inline quick-search-has-result bg-white rounded">
            <div className="quick-search quick-search-has-result input-group input-group-solid">
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
                placeholder="이름을 입력해 주세요."
                value={text}
                onChange={({ target }) => setText(target.value)}
              />

              <div className="input-group-append">
                <span className="input-group-text">
                  <i
                    className="quick-search-close ki ki-close icon-sm text-muted"
                    style={text === "" ? { display: "none" } : {}}
                    onClick={() => setText("")}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column position-relative bg-light-light mt-8 p-8">
          <div className="d-flex flex-grow-1 flex-row pb-4 justify-content-between">
            <div className="d-flex w-150px justify-content-center">구성원</div>
            <div className="flex-grow-1 text-center max-w-120px">비고</div>
          </div>
          {findList &&
            findList.map(({ user }: any) => (
              <div className="d-flex py-4 border-top border-light-dark">
                <div className="d-flex w-150px">
                  <Profile user={user} className="mr-3" width={50} />
                  <div className="overflow-hidden w-100px flex-grow-1 font-size-lg">
                    <div className="font-weight-bold">{user.name}</div>
                    <small className="d-block text-truncate">
                      {user.organization.name}
                    </small>
                  </div>
                </div>
                <div className="d-flex flex-grow-1 align-items-center justify-content-end">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => showModal("teamReview", { user, meta })}
                  >
                    Review 결과 보기
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
