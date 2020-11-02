/* eslint-disable import/export */
import React, { useEffect } from "react";
import Notifications from "components/main/Notifications";
import Search from "components/main/Search";
import User from "components/main/User";

export default function Topbar() {
  return (
    <div className="topbar topbar-top" id="kt_header_topbar">
      <Search />
      <Notifications />
      <User />
    </div>
  );
}
