import React from "react";
import { Link } from "react-router-dom";

function HomeIcons({ icons, alt, textIcon, serviceFee, serviceCode }) {
  return (
    <Link
      to="/purchasePage"
      state={{ icons, textIcon, serviceCode, serviceFee }}
      className="nav-link"
    >
      <div
        className="d-flex flex-column align-items-center text-center"
        style={{ maxWidth: 75 }}
      >
        <img src={icons} alt={alt} className="img-fluid mb-3" />
        <small>{textIcon}</small>
      </div>
    </Link>
  );
}

export default HomeIcons;
