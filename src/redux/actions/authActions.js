import axios from "axios";
import { baseUrl } from "../../api";
import {
     GET_PROFILE,
     GET_PROFILE_SUCCESS,
     GET_PROFILE_FAILURE,
     LOGOUT,
     UPDATE_PROFILE,
     UPDATE_PROFILE_SUCCESS,
     UPDATE_PROFILE_FAILURE,
     UPDATE_PROFILE_IMAGE,
     UPDATE_PROFILE_IMAGE_SUCCESS,
     UPDATE_PROFILE_IMAGE_FAILURE,
     LOGIN,
     LOGIN_SUCCESS,
     LOGIN_FAILURE,
     FETCH_BALANCE,
     FETCH_BALANCE_SUCCESS,
     FETCH_BALANCE_FAILURE,
     REGISTER,
     REGISTER_SUCCESS,
     REGISTER_FAILURE,
} from "./../types/actionTypes";

export const loginUser = (email, password) => async (dispatch) => {
     dispatch({ type: LOGIN });
     try {
          const response = await axios.post(`${baseUrl}login`, { email, password });

          if (response.data.status === 0) {
               console.log(response.data.data.token)
               dispatch({ type: LOGIN_SUCCESS, payload: response.data.data });
          } else {
               dispatch({
                    type: LOGIN_FAILURE,
                    error: response.data.message || "Terjadi Kesalahan",
               });
          }
     } catch (error) {
          const errorMessage = error.response?.data?.message || "Terjadi Kesalahan";
          dispatch({ type: LOGIN_FAILURE, error: errorMessage });
     }
};

export const loadProfileAction = (token) => async (dispatch) => {
     dispatch({ type: GET_PROFILE });
     try {
          const response = await axios.get(`${baseUrl}profile`, {
               headers: { Authorization: `Bearer ${token}` },
          });
          dispatch({
               type: GET_PROFILE_SUCCESS,
               payload: response.data.data,
          });
     } catch (error) {
          dispatch({
               type: GET_PROFILE_FAILURE,
               error: "Failed to load profile data.",
          });
     }
};

export const updateProfileAction = (firstName, lastName, token) => async (dispatch) => {
     dispatch({ type: UPDATE_PROFILE })
     try {
          const response = await axios.put(
               `${baseUrl}profile/update`,
               { first_name: firstName, last_name: lastName },
               { headers: { Authorization: `Bearer ${token}` } }
          );

          dispatch({
               type: UPDATE_PROFILE_SUCCESS,
               payload: response.data,
          });
     } catch (error) {
          dispatch({
               type: UPDATE_PROFILE_FAILURE,
               payload: error.message || "Gagal memperbarui profil",
          });
          throw new Error(error.message || "Gagal memperbarui profil");
     } finally {
          dispatch(loadProfileAction(token));
     }
};

export const updateProfileImageAction = (imageData, token) => async (dispatch) => {
     dispatch({ type: UPDATE_PROFILE_IMAGE });
     try {
          await axios.put(`${baseUrl}profile/image`, imageData, {
               headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
               },
          });
          dispatch({
               type: UPDATE_PROFILE_IMAGE_SUCCESS,
          });
     } catch (error) {
          dispatch({
               type: UPDATE_PROFILE_IMAGE_FAILURE,
               error: "Failed to update profile image.",
          });
     } finally {
          dispatch(loadProfileAction(token));
     }
};

export const logoutAction = () => {
     return { type: LOGOUT };
};

export const fetchBalanceAction = (token) => async (dispatch) => {
     dispatch({ type: FETCH_BALANCE });
     try {
          const response = await axios.get(`${baseUrl}balance`, {
               headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.status === 0) {
               dispatch({
                    type: FETCH_BALANCE_SUCCESS,
                    payload: response.data.data.balance,
               });
          } else {
               dispatch({
                    type: FETCH_BALANCE_FAILURE,
                    error: response.data.message || "Failed to fetch balance.",
               });
          }
     } catch (error) {
          dispatch({
               type: FETCH_BALANCE_FAILURE,
               error: "Terjadi kesalahan saat memuat saldo.",
          });
     }
};

export const registerUserAction = (email, namaDepan, namaBelakang, password) => async (dispatch) => {
     dispatch({ type: REGISTER });
     try {
          const response = await axios.post(`${baseUrl}registration`, {
               email,
               first_name: namaDepan,
               last_name: namaBelakang,
               password,
          });

          if (response.data.status === 0) {
               dispatch({
                    type: REGISTER_SUCCESS,
                    payload: response.data.message,
               });
          } else {
               dispatch({
                    type: REGISTER_FAILURE,
                    error: response.data.message || "Terjadi Kesalahan",
               });
          }
     } catch (error) {
          const errorMessage = error.response?.data?.message || "Terjadi Kesalahan";
          dispatch({
               type: REGISTER_FAILURE,
               error: errorMessage,
          });
     }
};