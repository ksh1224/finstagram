import React from "react";
import TabItem from "../../components/main/TabItem";
import Topbar from "./Topbar";

type LayoutType = {
  children: JSX.Element[] | JSX.Element;
};

export default function SwitchContainer({ children }: LayoutType) {
  return (
    <div className="container-fluid d-flex flex-column flex-column-fluid py-0 flex-grow-1 h-100px">
      <div className="main tab-content d-flex flex-column-fluid h-100 bg-white">
        {children}
      </div>
    </div>
  );
}
