import React from "react";

type LayoutType = {
  children: JSX.Element[];
};

export default function Body({ children }: LayoutType) {
  return (
    <div className="d-flex flex-row flex-column-fluid page">
      <div
        id="finsta_wrapper"
        className="d-flex flex-column flex-row-fluid wrapper p-0"
      >
        {children}
      </div>
    </div>
  );
}
