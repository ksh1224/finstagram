import React from "react";

type LayoutType = {
  children?: JSX.Element[] | JSX.Element;
};

export default function Container({ children }: LayoutType) {
  return (
    <div className="container-fluid d-flex flex-column flex-column-fluid py-0 flex-grow-1 h-md-100px">
      <div className="main tab-content d-flex flex-column-fluid h-md-100 bg-white">
        <div
          className="content container-fluid tab-pane pb-0 active"
          id="content_tab_feedback"
        >
          <div className="row h-md-100">{children}</div>
        </div>
      </div>
    </div>
  );
}
