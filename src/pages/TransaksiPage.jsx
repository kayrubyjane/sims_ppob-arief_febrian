import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, InfoUserSaldo } from "../components";
import { loadHistoryAction } from "../redux/actions/transactionActions";
import { formatInTimeZone } from "date-fns-tz";

function TransaksiPage() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { history, loading } = useSelector((state) => state.transaction);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    dispatch(loadHistoryAction(token, limit));
  }, [limit, token, dispatch]);

  return (
    <div className="container-fluid vh-100">
      <Header />
      <div className="container mt-5">
        <InfoUserSaldo />
        <div className="mt-5 container-fluid w-100 p-0">
          <h4 className="mb-4">Semua Transaksi</h4>
          {history.map((transactionHistory) => {
            const formattedDate = formatInTimeZone(
              transactionHistory.created_on,
              "Asia/Jakarta",
              "d MMMM yyyy HH:mm 'WIB'"
            );
            return (
              <div className="card p-3 mb-4" key={transactionHistory.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <h5
                    className={`${
                      transactionHistory.transaction_type !== "TOPUP"
                        ? "text-danger"
                        : "text-success"
                    }`}
                  >
                    {transactionHistory.transaction_type !== "TOPUP"
                      ? "-"
                      : "+"}{" "}
                    Rp.{" "}
                    {parseInt(transactionHistory.total_amount).toLocaleString(
                      "id-ID"
                    )}
                  </h5>
                  <h6>{transactionHistory.description}</h6>
                </div>
                <small>{formattedDate}</small>
              </div>
            );
          })}
          <h6
            className="text-danger small text-center btn w-100"
            onClick={() => setLimit(limit + 5)}
          >
            Show More
          </h6>
        </div>
      </div>
      {loading && (
        <div className="loading-modal">
          <div className="loading-spinner">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading Transaction History...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransaksiPage;
