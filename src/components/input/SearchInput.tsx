import SVG from "utils/SVG";
import React, { useEffect, useState } from "react";

type InputType = {
  value?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
};

export default function Input({ value, onChange }: InputType) {
  // const [text, setText] = useState("");

  return (
    <div className="quick-search quick-search-inline quick-search-has-result gutter-b bg-white rounded">
      <div className="quick-search-form">
        <div className="input-group rounded shadow-xs">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <span className="svg-icon svg-icon-lg">
                <SVG name="search" />
              </span>
            </span>
          </div>
          <input
            type="text"
            className="form-control h-45px"
            value={value}
            onChange={({ target }) => onChange && onChange(target.value)}
            // onBlur={() => onChange && onChange("")}
            placeholder="팀 또는 이름을 입력해 주세요."
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <i
                className="quick-search-close ki ki-close icon-sm text-muted"
                style={{ display: "none" }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
