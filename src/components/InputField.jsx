import React from "react";

function InputField({
  type,
  placeholder,
  iconClass,
  value,
  onChange,
  togglePassword,
  showPassword,
  isValid,
  errorMessage,
  isEdit,
}) {
  return (
    <div className="mb-4">
      <div
        className="form-control d-flex align-items-center"
        style={{ borderColor: !isValid ? "inherit" : "#ff3b3b" }}
      >
        <i
          className={`${iconClass} me-3 text-secondary`}
          style={{ color: !isValid ? "inherit" : "#ff3b3b" }}
        ></i>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            border: "none",
            width: "100%",
            outline: "none",
            boxShadow: "none",
          }}
          readOnly={isEdit}
        />
        {togglePassword && (
          <i
            className={`fa ${
              showPassword ? "fa-eye-slash" : "fa-eye"
            } ms-2 text-secondary`}
            onClick={togglePassword}
            style={{ cursor: "pointer" }}
          ></i>
        )}
      </div>
      {errorMessage && (
        <div
          style={{
            color: "#ff3b3b",
            fontSize: "0.85em",
            textAlign: "right",
            marginTop: "4px",
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default InputField;
