import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header, InfoUserSaldo, InputField } from "../components";
import { loadProfileAction } from "../redux/actions/authActions";
import { topUpRequestAction } from "./../redux/actions/topUpActions";

function TopUpPage() {
  const [nominal, setNominal] = useState("");
  const [loading, setLoading] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const [confirmPurchase, setConfirmPurchase] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleNominalClick = (amount) => {
    setNominal((prevNominal) =>
      (parseInt(prevNominal.replace(/,/g, "") || 0) + amount).toString()
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setNominal(value);
  };

  const validation = parseInt(nominal) >= 10000 && parseInt(nominal) <= 1000000;

  const handleConfirm = () => {
    setLoading(true);
    setConfirmPurchase(false);

    try {
      dispatch(topUpRequestAction(parseInt(nominal), token));
      dispatch(loadProfileAction(token));
      setPurchaseStatus("success");
    } catch (error) {
      setPurchaseStatus("failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <Header />
      <div className="container mt-5">
        <InfoUserSaldo />
        <div className="mt-5">
          <h4>Silahkan masukkan</h4>
          <h2>Nominal Top Up</h2>
          <div className="row mt-5 d-flex align-items-start">
            <div className="col-md-8">
              <div className="mb-3">
                <InputField
                  type="text"
                  iconClass="fa fa-credit-card-alt"
                  value={nominal ? parseInt(nominal).toLocaleString() : ""}
                  onChange={handleInputChange}
                  placeholder="masukkan nominal top up"
                  isValid={!validation}
                  errorMessage={
                    !validation
                      ? "Saldo minimal 10.000 dan maksimal 1.000.000"
                      : ""
                  }
                />
              </div>
              <button
                className="btn btn-danger w-100"
                disabled={!validation}
                onClick={() => setConfirmPurchase(true)}
              >
                Top Up
              </button>
            </div>

            <div className="col-md-4">
              <div className="row row-cols-3 g-3">
                {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
                  <div className="col" key={amount}>
                    <button
                      className="btn btn-outline-secondary w-100"
                      onClick={() => handleNominalClick(amount)}
                    >
                      Rp. {amount.toLocaleString()}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {(loading || confirmPurchase || purchaseStatus) && (
        <Modal
          loading={loading}
          confirmPurchase={confirmPurchase}
          purchaseStatus={purchaseStatus}
          nominal={nominal}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmPurchase(false)}
          onNavigate={() => {
            setPurchaseStatus(null);
            navigate("/homePage");
          }}
        />
      )}
    </div>
  );
}

function Modal({
  loading,
  confirmPurchase,
  purchaseStatus,
  nominal,
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
            <small className="text-secondary">
              Anda yakin untuk Top Up sebesar
            </small>
            <h5 className="mb-4">
              Rp. {parseInt(nominal).toLocaleString("id-ID")}
            </h5>
            <div className="gap-3 d-flex flex-column">
              <h6
                className="text-danger small"
                style={{ cursor: "pointer" }}
                onClick={onConfirm}
              >
                Ya, Lanjutkan Top Up
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
            <small className="text-secondary">Top Up sebesar</small>
            <h5 className="h5">Rp. {nominal.toLocaleString("id-ID")}</h5>
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

export default TopUpPage;
