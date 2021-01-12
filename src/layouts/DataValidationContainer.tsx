import React from "react";

type LayoutType = {
  children?: JSX.Element[] | JSX.Element | null;
  loadingView?: JSX.Element;
  noDataView?: JSX.Element;
  isFetching?: boolean;
};

export default function DataValidationContainer({
  children,
  isFetching,
  loadingView,
  noDataView,
}: LayoutType) {
  let view: any = null;
  if (isFetching) view = loadingView;
  else if (Array.isArray(children) ? children.length !== 0 : children)
    view = children;
  else view = noDataView;
  return <>{view}</>;
}

DataValidationContainer.defaultProps = {
  children: null,
  loadingView: (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50%",
        width: "100%",
      }}
    >
      <div className="spinner spinner-primary spinner-lg spinner-center w-100 h-50px" />
    </div>
  ),
  noDataView: <></>,
  isFetching: false,
};
