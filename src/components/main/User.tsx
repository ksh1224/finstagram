import SVG from "utils/SVG";
import React from "react";

export default function User() {
  return (
    <div className="dropdown">
      <div className="topbar-item" data-toggle="dropdown" data-offset="0px,0px">
        <div className="btn btn-icon btn-clean h-40px w-40px btn-dropdown">
          <span className="svg-icon svg-icon-lg">
            <SVG name="user" />
          </span>
        </div>
      </div>
    </div>
  );
}
