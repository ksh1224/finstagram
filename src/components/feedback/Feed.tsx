import React, { useEffect, useState } from "react";
import FeedListItem from "components/item/FeedListItem";

const tabName = ["최신 피드백", "내가 받은 피드백", "내가 보낸 피드백"];

export default function Feed() {
  const [tab, setTab] = useState(0);
  return (
    <div className="col-auto h-sm-100 flex-grow-1 w-100px d-flex flex-column overflow-hidden">
      <ul className="nav nav-tabs nav-tabs-line gutter-b border-light-dark">
        {tabName.map((name, i) => (
          <li className="nav-item">
            <a
              className={`nav-link pt-1 pb-5 font-weight-bolder ${
                i === tab && "active"
              }`}
              data-toggle="tab"
              href={`#feedback_tab_${i}`}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content h-100px flex-grow-1 overflow-y-auto m-n7 p-7">
        {tabName.map((name, i) => (
          <div
            className={`tab-pane fade ${i === tab && "show active"}`}
            id={`feedback_tab_${i}`}
            role="tabpanel"
            aria-labelledby={`feedback_tab_${i}`}
          >
            <FeedListItem />
          </div>
        ))}
      </div>
    </div>
  );
}
