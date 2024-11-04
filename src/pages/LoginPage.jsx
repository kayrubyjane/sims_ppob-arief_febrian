import React, { useState } from "react";
import { Login } from "../assets/icon";
import { AuthForm } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./../redux/actions/authActions";

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state) => state.auth);

  const togglePassword = () => setShowPassword(!showPassword);
  const isPasswordValid = password.length > 0 && password.length < 8;

  const field = [
    {
      type: "email",
      placeholder: "masukkan email anda",
      iconClass: "fa fa-at",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      isEdit: true,
    },
    {
      type: !showPassword ? "password" : "text",
      placeholder: "masukkan password anda",
      iconClass: "fa fa-lock",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      togglePassword,
      showPassword,
      isValid: isPasswordValid,
      errorMessage: isPasswordValid ? "Password minimal 8 karakter" : "",
      isEdit: true,
    },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password))
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <AuthForm
            textHeader="Masuk atau buat akun untuk memulai"
            smallText="belum punya akun? registrasi"
            btnText="Masuk"
            field={field}
            route="/registrationPage"
            onSubmit={onSubmit}
            error={error}
          />
        </div>

        <div className="col-md-6 d-none d-md-block p-0">
          <img
            className="img-fluid w-100 h-100"
            src={Login}
            alt="Login Illustration"
            style={{ objectFit: "cover", backgroundColor: "#f8f0f4" }}
          />
        </div>
      </div>
      {loading && (
        <div className="loading-modal">
          <div className="loading-spinner">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Logging in...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
