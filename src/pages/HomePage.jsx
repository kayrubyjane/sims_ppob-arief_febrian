import React, { useEffect } from "react";
import { Banner1, Banner2, Banner3, Banner4, Banner5 } from "../assets/icon";
import { HomeIcons, Header, InfoUserSaldo } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../redux/actions/serviceActions";

function HomePage() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { services, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    if (token) {
      dispatch(fetchServices(token));
    }
  }, [dispatch, token]);

  return (
    <div className="container-fluid vh-100">
      <Header />
      <div className="container mt-5">
        <InfoUserSaldo isLoading={loading} />

        {error && <p className="text-danger">Error: {error}</p>}

        <div className="d-flex justify-content-between mt-5">
          {loading ? (
            <div className="loading-modal">
              <div className="loading-spinner">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading services...</p>
              </div>
            </div>
          ) : (
            services.map((serviceData) => (
              <HomeIcons
                key={serviceData.service_code}
                icons={serviceData.service_icon}
                alt={serviceData.service_name}
                textIcon={serviceData.service_name}
                serviceCode={serviceData.service_code}
                serviceFee={serviceData.service_tariff}
              />
            ))
          )}
        </div>

        <div
          className="container-fluid p-0 my-3"
          style={{ overflow: "hidden" }}
        >
          <h6 className="h6 mb-4">Temukan Promo Menarik</h6>
          <div
            className="d-flex gap-4 custom-scroll"
            style={{ overflowX: "auto", whiteSpace: "nowrap", padding: 8 }}
          >
            <img src={Banner1} className="img-fluid" alt="Banner Promo 1" />
            <img src={Banner2} className="img-fluid" alt="Banner Promo 2" />
            <img src={Banner3} className="img-fluid" alt="Banner Promo 3" />
            <img src={Banner4} className="img-fluid" alt="Banner Promo 4" />
            <img src={Banner5} className="img-fluid" alt="Banner Promo 5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
