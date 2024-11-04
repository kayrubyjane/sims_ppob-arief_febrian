import React, { useState, useEffect } from "react";
import { Header, InputField } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutAction,
  loadProfileAction,
  updateProfileAction,
  updateProfileImageAction,
} from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { ProfilePicture } from "../assets/icon";

function AccountPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, profile } = useSelector((state) => state.auth);

  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [emailForm, setEmailForm] = useState("");
  const [namaDepanForm, setNamaDepanForm] = useState("");
  const [namaBelakangForm, setNamaBelakangForm] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormValid = namaDepanForm === "" || namaBelakangForm === "";

  useEffect(() => {
    const loadProfile = () => {
      if (token) {
        dispatch(loadProfileAction(token));
      }
    };

    loadProfile();
  }, [token, dispatch]);

  useEffect(() => {
    if (profile.namaDepan && profile.namaBelakang) {
      setNamaDepan(profile.namaDepan);
      setNamaBelakang(profile.namaBelakang);
      setProfilePicture(profile.profilePicture);
      setEmailForm(profile.email);
      setNamaDepanForm(profile.namaDepan);
      setNamaBelakangForm(profile.namaBelakang);
    }
  }, [profile]);

  const saveProfile = async () => {
    setLoading(true);
    try {
      dispatch(updateProfileAction(namaDepanForm, namaBelakangForm, token));
    } catch (error) {
      setErrorMessage("Gagal memperbarui profil.");
      setShowErrorModal(true);
    } finally {
      setIsEdit(false);
      setLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 100 * 1024) {
        setShowErrorModal(true);
        setErrorMessage("Ukuran file melebihi 100 KB.");
        return;
      } else {
        const imageData = new FormData();
        imageData.append("file", file);

        try {
          setLoading(true);
          dispatch(updateProfileImageAction(imageData, token));
        } catch (error) {
          setShowErrorModal(true);
          setErrorMessage("Gagal memperbarui foto profil.");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const logout = () => {
    try {
      dispatch(logoutAction());
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="container-fluid vh-100">
      <Header />
      <div className="container px-5 mx-5 mt-5 d-flex flex-column justify-content-center align-items-center">
        <div className="position-relative mb-3">
          <img
            src={
              profile &&
              profile.profilePicture &&
              profile.profilePicture === "No Picture"
                ? profilePicture
                : ProfilePicture
            }
            alt="Profile"
            className="img-fluid"
            width="100"
            style={{ borderRadius: "50%", maxWidth: 100 }}
          />
          <div
            className="position-absolute bg-white d-flex align-items-center justify-content-center"
            style={{
              bottom: 0,
              right: 0,
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            <i className="fa fa-pencil"></i>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              style={{
                opacity: 0,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <h2>{`${namaDepan} ${namaBelakang}`}</h2>
        <div className="w-50">
          <label className="form-label text-left">Email</label>
          <InputField
            iconClass="fa fa-at"
            type="email"
            value={emailForm}
            onChange={(e) => setEmailForm(e.target.value)}
            placeholder="masukkan email anda"
            style={{ width: "100%" }}
            isEdit={!false}
          />
        </div>
        <div className="w-50">
          <label className="form-label text-left">Nama Depan</label>
          <InputField
            iconClass="fa fa-user"
            type="text"
            value={namaDepanForm}
            onChange={(e) => setNamaDepanForm(e.target.value)}
            placeholder="masukkan nama depan"
            style={{ width: "100%" }}
            isEdit={!isEdit}
            isValid={isFormValid}
            errorMessage={isFormValid ? "Form tidak boleh kosong" : ""}
          />
        </div>
        <div className="w-50">
          <label className="form-label text-left">Nama Belakang</label>
          <InputField
            iconClass="fa fa-user"
            type="text"
            value={namaBelakangForm}
            onChange={(e) => setNamaBelakangForm(e.target.value)}
            placeholder="masukkan nama belakang"
            style={{ width: "100%" }}
            isEdit={!isEdit}
            isValid={isFormValid}
            errorMessage={isFormValid ? "Form tidak boleh kosong" : ""}
          />
        </div>
        <div className="w-50">
          {!isEdit ? (
            <>
              <button
                className="btn btn-danger mb-4 w-100"
                onClick={() => setIsEdit(true)}
              >
                Edit Profil
              </button>
              <button className="btn btn-outline-danger w-100" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-danger mb-4 w-100"
                onClick={saveProfile}
                disabled={isFormValid}
              >
                Simpan
              </button>
              <button
                className="btn btn-outline-danger mb-4 w-100"
                onClick={() => {
                  setIsEdit(false);
                  setNamaDepanForm(namaDepan);
                  setNamaBelakangForm(namaBelakang);
                }}
              >
                Batalkan
              </button>
            </>
          )}
        </div>
        {showErrorModal && (
          <div className="loading-modal">
            <div className="loading-spinner">
              <div className="d-flex flex-column align-items-center p-4">
                <i
                  className="fa fa-close bg-danger p-3 mb-3 text-white"
                  style={{ borderRadius: "50%" }}
                ></i>
                <h5 className="h5 mb-3">{errorMessage}</h5>
                <h6
                  className="small btn btn-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowErrorModal(false)}
                >
                  Tutup
                </h6>
              </div>
            </div>
          </div>
        )}
      </div>
      {loading && (
        <div className="loading-modal">
          <div className="loading-spinner">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountPage;
