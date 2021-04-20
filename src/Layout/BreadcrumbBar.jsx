import React from "react";
import { Link } from "react-router-dom";

function BreadcrumbBar({ nav1 = "nav1", link1 = "#", nav2 = false }) {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link
              to={`${link1}`}
              className={nav2 ? "breadcrumb-item" : "breadcrumb-item active"}
            >
              {nav1}
            </Link>
          </li>
          {nav2 ? (
            <li className="breadcrumb-item active" aria-current="page">
              {nav2}
            </li>
          ) : null}
        </ol>
      </nav>
    </>
  );
}

export default BreadcrumbBar;
