import React, { useEffect, useState } from "react";

export default function Error404() {
  return (
    <div
      className="d-flex flex-column flex-root"
      style={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        top: 0,
        zIndex: 9999,
        left: 0,
      }}
    >
      <div
        className="error error-4 d-flex flex-row-fluid bgi-size-cover bgi-position-center"
        style={{
          backgroundImage:
            "url(https://static.fnf.co.kr/_template/metronic_v7.0.8/theme/html/demo11/dist/assets/media/error/bg4.jpg)",
        }}
      >
        <div className="d-flex flex-column flex-row-fluid align-items-center align-items-md-start justify-content-md-center text-center text-md-left px-10 px-md-30 py-10 py-md-0 line-height-xs">
          <h1 className="error-title text-success font-weight-boldest line-height-sm">
            404
          </h1>
          <p className="error-subtitle text-success font-weight-boldest mb-10">
            ERROR
          </p>
          <p className="display-4 text-danger font-weight-boldest mt-md-0 line-height-md">
            Nothing left to do here.
          </p>
          <p className="font-size-h3">
            We're working on it and we'll get it fixedas soon possible.You can
            back or use our Help Center.
          </p>
        </div>
      </div>
    </div>
  );
}
