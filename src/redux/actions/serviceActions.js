import axios from "axios";
import { baseUrl } from "../../api";
import {
     FETCH_SERVICES_START,
     FETCH_SERVICES_SUCCESS,
     FETCH_SERVICES_ERROR,
} from '../types/actionTypes';

export const fetchServices = (token) => async (dispatch) => {
     dispatch({ type: FETCH_SERVICES_START });
     try {
          const response = await axios.get(`${baseUrl}services`, {
               headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.status === 0) {
               dispatch({ type: FETCH_SERVICES_SUCCESS, payload: response.data.data });
          }
     } catch (error) {
          dispatch({
               type: FETCH_SERVICES_ERROR,
               payload: error.response?.data?.message || "Terjadi kesalahan",
          });
     }
};
