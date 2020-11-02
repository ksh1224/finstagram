import React from "react";
import TabItem from "../../components/main/TabItem";
import Topbar from "./Topbar";

type LayoutType = {
  children: JSX.Element[];
};

export default function Header() {
  return (
    <div id="kt_header" className="header flex-column header-fixed">
      <div className="header-top">
        <div className="container-fluid">
          <h1 className="d-none d-lg-flex align-items-center mr-3">
            <div className="mr-20 text-dark-50">Finstagram</div>
          </h1>
          <Topbar />
        </div>
      </div>

      <div className="header-bottom h-auto" id="kt_header_bottom">
        <div className="container-fluid d-flex flex-column">
          <ul className="header-tabs nav flex-column-auto" role="tablist">
            <TabItem path="" />
            <TabItem path="OKR" />
            <TabItem path="Review" />
          </ul>
        </div>
      </div>
    </div>
  );
}
