/* eslint-disable import/export */
import React, { useEffect } from "react";
import Notifications from "components/main/Notifications";
import Search from "components/main/Search";
import User from "components/main/User";

type Props = {
  on?: boolean;
};

export default function Topbar({ on }: Props) {
  return (
    <div className={`topbar ${on ? "on" : ""}`} id="kt_header_topbar">
      <Search on={on} />
      <Notifications />
      <User />
    </div>
  );
}
