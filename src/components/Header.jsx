import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../assets/icon";

function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "nav-link activate" : "nav-link";
  };
  return (
    <nav
      className="navbar navbar-expand-sm bg-white border-bottom sticky-top"
      style={{ borderBottom: "2px solid black" }}
    >
      <div className="container">
        <Link to="/homePage" className="navbar-brand">
          <img src={Logo} className="img-fluid me-2" width="32" alt="Logo" />
          SIMS PPOB
        </Link>
        <div className="d-flex justify-content-end">
          <ul className="navbar-nav gap-5">
            <li className="nav-item">
              <Link className={isActive("/topUpPage")} to="/topUpPage">
                Top Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className={isActive("/transaksiPage")} to="/transaksiPage">
                Transaction
              </Link>
            </li>
            <li className="nav-item">
              <Link className={isActive("/accountPage")} to="/accountPage">
                Akun
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
