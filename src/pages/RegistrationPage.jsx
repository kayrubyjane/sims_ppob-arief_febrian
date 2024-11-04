import React, { useState } from "react";
import { AuthForm } from "../components";
import { Login } from "../assets/icon";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../redux/actions/authActions";

function RegistrationPage() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const isPasswordInvalid = password.length > 0 && password.length < 8;
  const isConfirmPasswordInvalid =
    confirmPassword && confirmPassword !== password;

  const fields = [
    {
      type: "email",
      placeholder: "masukkan email anda",
      iconClass: "fa fa-at",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      isEdit: true,
    },
    {
      type: "text",
      placeholder: "masukkan nama depan",
      iconClass: "fa fa-user",
      value: namaDepan,
      onChange: (e) => setNamaDepan(e.target.value),
      isEdit: true,
    },
    {
      type: "text",
      placeholder: "masukkan nama belakang",
      iconClass: "fa fa-user",
      value: namaBelakang,
      onChange: (e) => setNamaBelakang(e.target.value),
      isEdit: true,
    },
    {
      type: showPassword ? "text" : "password",
      placeholder: "masukkan password anda",
      iconClass: "fa fa-lock",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      togglePassword,
      showPassword,
      isValid: isPasswordInvalid,
      errorMessage: isPasswordInvalid ? "Password minimal 8 karakter" : "",
      isEdit: true,
    },
    {
      type: showConfirmPassword ? "text" : "password",
      placeholder: "konfirmasi password",
      iconClass: "fa fa-lock",
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
      togglePassword: toggleConfirmPassword,
      showPassword: showConfirmPassword,
      isValid: isConfirmPasswordInvalid,
      errorMessage: isConfirmPasswordInvalid ? "Password tidak sama" : "",
      isEdit: true,
    },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(registerUserAction(email, namaDepan, namaBelakang, password));
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <AuthForm
            textHeader="Lengkapi data untuk membuat akun"
            smallText="sudah punya akun? login"
            btnText="Registrasi"
            field={fields}
            route="/"
            onSubmit={onSubmit}
            error={error}
            success={success}
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
            <p>Registration on process...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationPage;
