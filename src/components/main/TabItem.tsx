import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function TabItem({ path }: { path: string }) {
  const location = useLocation();
  return (
    <li className="nav-item col-4">
      <Link
        to={`/${path}`}
        className={`nav-link ${location.pathname === `/${path}` && "active"}`}
      >
        <span className="nav-title text-uppercase">{path || "Feedback"}</span>
      </Link>
    </li>
  );
}
