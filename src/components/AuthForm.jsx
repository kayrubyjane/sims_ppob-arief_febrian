import React from "react";
import InputField from "./InputField";
import { Link } from "react-router-dom";
import { Logo } from "../assets/icon";

function AuthForm({
  textHeader,
  smallText,
  route,
  btnText,
  field,
  onSubmit,
  error,
  success,
}) {
  return (
    <div className="container-fluid px-5 mx-5">
      <div className="d-flex align-items-center justify-content-center mb-4">
        <img src={Logo} className="img-fluid me-2" width="32" alt="Logo" />
        <h4 className="mb-0">SIMS PPOB</h4>
      </div>

      <h2 className="text-center mb-4">{textHeader}</h2>

      {field.map((field, index) => (
        <InputField
          key={index}
          type={field.type}
          placeholder={field.placeholder}
          iconClass={field.iconClass}
          value={field.value}
          onChange={field.onChange}
          togglePassword={field.togglePassword}
          showPassword={field.showPassword}
          isValid={field.isValid}
          errorMessage={field.errorMessage}
        />
      ))}

      <button className="my-4 btn btn-danger w-100" onClick={onSubmit}>
        {btnText}
      </button>

      <small className="text-center d-block text-secondary">
        {smallText}{" "}
        <Link
          to={route}
          className="text-danger"
          style={{ textDecoration: "none" }}
        >
          di sini
        </Link>
      </small>
      {error && (
        <div
          className="alert alert-danger"
          style={{
            color: "#ff3b3b",
            fontSize: "0.85em",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className="alert alert-success"
          style={{
            fontSize: "0.85em",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          {success}
        </div>
      )}
    </div>
  );
}

export default AuthForm;
