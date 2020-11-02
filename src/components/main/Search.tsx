import SVG from "utils/SVG";
import React from "react";

export default function Search() {
  return (
    <div className="topbar-item mr-3 w-100 w-lg-auto justify-content-start">
      <div
        className="quick-search quick-search-inline w-auto w-lg-200px"
        id="kt_quick_search_inline"
      >
        <form method="get" className="quick-search-form">
          <div className="input-group rounded bg-secondary">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="svg-icon svg-icon-lg">
                  <SVG name="search" />
                </span>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="quick-search-close ki ki-close icon-sm" />
              </span>
            </div>
          </div>
        </form>

        <div
          id="kt_quick_search_toggle"
          data-toggle="dropdown"
          data-offset="10px, 10px"
        />

        <div className="dropdown-menu dropdown-menu-left dropdown-menu-lg dropdown-menu-anim-up">
          <div
            className="quick-search-wrapper scroll"
            data-scroll="true"
            data-height="350"
            data-mobile-height="200"
          />
        </div>
      </div>
    </div>
  );
}
