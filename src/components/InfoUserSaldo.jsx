import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBalanceAction,
  loadProfileAction,
} from "../redux/actions/authActions";
import { BGSaldo } from "../assets/icon";
import { ProfilePicture } from "../assets/icon";

function InfoUserSaldo() {
  const dispatch = useDispatch();
  const { saldo, profile, token } = useSelector((state) => state.auth);
  const [showSaldo, setShowSaldo] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchBalanceAction(token));
      dispatch(loadProfileAction(token));
    }
  }, [dispatch, token]);

  const toggleSaldo = () => setShowSaldo(!showSaldo);
  const formattedValue = showSaldo
    ? parseInt(saldo).toLocaleString()
    : parseInt(saldo).toString();

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              profile &&
              profile.profilePicture &&
              profile.profilePicture === "No Picture"
                ? profile.profilePicture
                : ProfilePicture
            }
            alt="Profile"
            className="img-fluid mb-4"
            style={{ maxWidth: 70, borderRadius: "50%" }}
          />
          <h6>Selamat Datang,</h6>
          <h2 style={{ textTransform: "capitalize" }}>
            {profile
              ? `${profile.namaDepan} ${profile.namaBelakang}`
              : "Loading..."}
          </h2>
        </div>
        <div className="col-md-6 position-relative d-none d-md-block p-0">
          <img
            src={BGSaldo}
            alt="Saldo Container"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "fill" }}
          />
          <div
            className="position-absolute top-50 translate-middle text-white"
            style={{ zIndex: 1, left: 240 }}
          >
            <h6 className="mb-3">Saldo Anda</h6>
            <div className="d-flex flex-row">
              <h2>Rp </h2>
              <input
                type={`${showSaldo ? "text" : "password"}`}
                value={showSaldo ? formattedValue : "1234567"}
                className="text-white h2 ps-2"
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                }}
                readOnly
              />
            </div>
            <div className="d-flex flex-row align-items-center">
              <small>Lihat Saldo</small>
              <i
                className={`fa ${showSaldo ? "fa-eye-slash" : "fa-eye"} mx-3`}
                onClick={toggleSaldo}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoUserSaldo;
