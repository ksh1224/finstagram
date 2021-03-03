import { useReviewMain } from "hooks/useReview";
import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function TabItem({ path }: { path: string }) {
  const location = useLocation();
  const [selectMeta, setSelectMeta] = useState<any>();
  const { request, availableMetas = [], data = {} } = useReviewMain();

  const { meta = {} } = data;

  useEffect(() => {
    if (!selectMeta) setSelectMeta(availableMetas[0]);
  }, [availableMetas]);

  return (
    <li className="nav-item col-4">
      <Link
        to={`/${path}`}
        className={`nav-link ${
          location.pathname.toUpperCase() === `/${path}`.toUpperCase() &&
          "active"
        }`}
        data-target="#content_tab_review"
      >
        <span className="d-flex align-items-center nav-title">
          {path === "Review" ? (
            <DropdownButton
              className="d-flex flex-center review-tab-select"
              title={meta?.name}
              variant="light"
              size="lg"
            >
              {availableMetas &&
                availableMetas.map((metaData: any) => (
                  <Dropdown.Item
                    onClick={() => {
                      setSelectMeta(metaData);
                      request(metaData.id);
                    }}
                  >
                    {metaData.name}
                  </Dropdown.Item>
                ))}
            </DropdownButton>
          ) : (
            <></>
          )}
          {path || "Feedback"}
        </span>
      </Link>
    </li>
  );
}
