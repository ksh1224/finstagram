import SVG from "utils/SVG";
import React, { useEffect, useState } from "react";

type InputType = {
  value?: string;
  onFocus?: (isForcus: boolean) => void;
  onChangeState?: React.Dispatch<React.SetStateAction<string>>;
};

export default function OKRSearchInput({
  value,
  onChangeState,
  onFocus,
}: InputType) {
  return (
    <div className="card-header align-items-center px-5">
      <div
        className="quick-search quick-search-has-result input-group input-group-solid"
        data-toggle="search"
        data-list="#layer_okr_srchList"
      >
        <div className="input-group-prepend">
          <span className="input-group-text">
            <span className="svg-icon svg-icon-lg">
              <SVG name="search" />
            </span>
          </span>
        </div>
        <input
          value={value}
          onChange={({ target }) =>
            onChangeState && onChangeState(target.value)
          }
          onFocus={() => onFocus && onFocus(true)}
          // onBlur={() => onFocus && onFocus(false)}
          type="text"
          className="form-control py-4 h-auto"
          placeholder="팀 또는 이름을 입력해 주세요."
        />

        <div className="input-group-append">
          <span className="input-group-text">
            <i
              className="quick-search-close ki ki-close icon-sm text-muted"
              style={{
                display: value && value.length !== 0 ? "block" : "none",
              }}
              onClick={() => onChangeState && onChangeState("")}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

OKRSearchInput.defaultProps = {
  value: "",
  onChangeState: undefined,
};
