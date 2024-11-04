import React, { useState } from "react";
import { Header, InfoUserSaldo, InputField } from "../components";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  purchaseAction,
  resetPurchaseStatus,
} from "../redux/actions/purchaseActions";

function PurchasePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { icons, textIcon, serviceFee, serviceCode } = location.state || {};
  const { loading, purchaseStatus } = useSelector((state) => state.purchase);
  const { token } = useSelector((state) => state.auth);
  const [confirmPurchase, setConfirmPurchase] = useState(false);

  const handleConfirm = () => {
    dispatch(purchaseAction(serviceCode, token));
    setConfirmPurchase(false);
  };

  const handleCloseModal = () => {
    if (purchaseStatus) {
      dispatch(resetPurchaseStatus());
    }
    navigate("/homePage");
  };

  return (
    <div className="container-fluid vh-100">
      <Header />
      <div className="container mt-5">
        <InfoUserSaldo />
        <div className="mt-5 container-fluid w-100 p-0">
          <h4 className="mb-3">Pembayaran</h4>
          <div className="d-flex gap-3 mb-5 align-items-center">
            <img
              src={icons}
              className="img-fluid"
              alt={textIcon}
              style={{ maxWidth: 30 }}
            />
            <h5>{textIcon}</h5>
          </div>
          <div className="w-100">
            <div className="mb-3">
              <InputField
                type="text"
                iconClass="fa fa-money"
                value={serviceFee ? parseInt(serviceFee).toLocaleString() : ""}
                placeholder="Masukkan nominal pembayaran"
                isEdit={!false}
              />
            </div>
            <button
              className="btn btn-danger w-100"
              disabled={loading}
              onClick={() => setConfirmPurchase(true)}
            >
              Bayar
            </button>
          </div>
        </div>
      </div>

      {(loading || confirmPurchase || purchaseStatus) && (
        <Modal
          loading={loading}
          confirmPurchase={confirmPurchase}
          purchaseStatus={purchaseStatus}
          textIcon={textIcon}
          serviceFee={serviceFee}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmPurchase(false)}
          onNavigate={handleCloseModal}
        />
      )}
    </div>
  );
}

function Modal({
  loading,
  confirmPurchase,
  purchaseStatus,
  textIcon,
  serviceFee,
  onConfirm,
  onCancel,
  onNavigate,
}) {
  if (loading) {
    return (
      <div className="loading-modal">
        <div className="loading-spinner">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Your purchase is processing...</p>
        </div>
      </div>
    );
  }

  if (confirmPurchase) {
    return (
      <div className="loading-modal">
        <div className="loading-spinner">
          <div className="d-flex flex-column align-items-center p-4">
            <i
              className="fa fa-credit-card-alt text-white bg-danger p-3 mb-3"
              style={{ borderRadius: "50%" }}
            ></i>
            <small className="text-secondary">Bayar {textIcon} senilai</small>
            <h5 className="mb-4">Rp. {serviceFee.toLocaleString("id-ID")}</h5>
            <div className="gap-3 d-flex flex-column">
              <h6
                className="text-danger small"
                style={{ cursor: "pointer" }}
                onClick={onConfirm}
              >
                Ya, Lanjutkan bayar
              </h6>
              <h6
                className="text-secondary small"
                style={{ cursor: "pointer" }}
                onClick={onCancel}
              >
                Batalkan
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (purchaseStatus) {
    return (
      <div className="loading-modal">
        <div className="loading-spinner">
          <div className="d-flex flex-column align-items-center p-4">
            <i
              className={`fa ${
                purchaseStatus === "success" ? "fa-check" : "fa-close"
              } text-white ${
                purchaseStatus === "success" ? "bg-success" : "bg-danger"
              } p-3 mb-3`}
              style={{ borderRadius: "50%" }}
            ></i>
            <small className="text-secondary">
              Pembayaran {textIcon} sebesar
            </small>
            <h5 className="h5">Rp. {serviceFee.toLocaleString("id-ID")}</h5>
            <small className="text-secondary mb-4">
              {purchaseStatus === "success" ? "Berhasil" : "Gagal"}
            </small>
            <div className="gap-3 d-flex flex-column">
              <h6
                className="text-secondary small"
                style={{ cursor: "pointer" }}
                onClick={onNavigate}
              >
                Kembali ke Beranda
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default PurchasePage;
