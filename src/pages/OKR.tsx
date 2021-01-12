import UserOKR from "components/okr/UserOKR";
import TeamList from "components/okr/TeamList";
import TeamOKR from "components/okr/TeamOKR";
import { useMyOKR, useTeamOKR, useUserOKR } from "hooks/useOKRRedux";
import React, { useEffect } from "react";

export default function OKR() {
  const { request: teamOKRRequest } = useTeamOKR();
  const { request: myOKRRequest } = useMyOKR();
  const { data } = useUserOKR();
  useEffect(() => {
    teamOKRRequest();
    myOKRRequest();
  }, []);
  return (
    <div
      className="content container-fluid tab-pane pb-0 active"
      id="content_tab_okr"
    >
      <div className="row h-100">
        <div className="section-group-1 col-auto flex-grow-1 w-100px h-100">
          <div className="card card-custom flex-row h-100">
            <TeamList />
            {data ? <UserOKR /> : <TeamOKR />}
          </div>
        </div>
        <UserOKR isMy />
      </div>
    </div>
  );
}
