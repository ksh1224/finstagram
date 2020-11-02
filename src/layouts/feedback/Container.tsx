import React from "react";

type LayoutType = {
  children?: JSX.Element[] | JSX.Element;
};

export default function Container({ children }: LayoutType) {
  return (
    <div className="container-fluid d-flex flex-column flex-column-fluid py-0 flex-grow-1 h-100px">
      <div className="main tab-content d-flex flex-column-fluid h-100 bg-white">
        <div className="content container-fluid tab-pane pb-0 active">
          <div className="row h-100">{children}</div>
        </div>
      </div>
    </div>
  );
}
