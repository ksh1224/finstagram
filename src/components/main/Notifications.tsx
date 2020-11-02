import SVG from "utils/SVG";
import React from "react";

export default function Notifications() {
  return (
    <div className="dropdown">
      <div
        className="topbar-item mr-3"
        data-toggle="dropdown"
        data-offset="10px,0px"
        aria-expanded="true"
      >
        <div className="btn btn-icon btn-secondary pulse pulse-white">
          <span className="svg-icon svg-icon-lg">
            <SVG name="notification" />
          </span>
          <span className="pulse-ring" />
        </div>
      </div>
    </div>
  );
}
