import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AccountPage, HomePage, LoginPage, PurchasePage, RegistrationPage, TopUpPage, TransaksiPage } from "./pages";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

function AppRoutes() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/homePage" /> : <LoginPage />} />
      <Route path="/registrationPage" element={token ? <Navigate to="/homePage" /> : <RegistrationPage />} />
      <Route path="/homePage" element={!token ? <Navigate to="/" /> : <HomePage />} />
      <Route path="/accountPage" element={!token ? <Navigate to="/" /> : <AccountPage />} />
      <Route path="/purchasePage" element={!token ? <Navigate to="/" /> : <PurchasePage />} />
      <Route path="/topUpPage" element={!token ? <Navigate to="/" /> : <TopUpPage />} />
      <Route path="/transaksiPage" element={!token ? <Navigate to="/" /> : <TransaksiPage />} />
    </Routes>
  );
}

export default App;
