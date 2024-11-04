import axios from "axios";
import { TOPUP_REQUEST, TOPUP_SUCCESS, TOPUP_FAILURE } from "../types/actionTypes";
import { baseUrl } from "../../api";

export const topUpRequestAction = (amount, token) => async (dispatch) => {
     dispatch({ type: TOPUP_REQUEST });

     try {
          const response = await axios.post(
               `${baseUrl}topup`,
               { top_up_amount: amount },
               { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.status === 0) {
               dispatch({
                    type: TOPUP_SUCCESS,
                    payload: response.data.message,
               });
          } else {
               dispatch({
                    type: TOPUP_FAILURE,
                    error: response.data.message || "Terjadi Kesalahan",
               });
          }
     } catch (error) {
          const errorMessage = error.response?.data?.message || "Terjadi Kesalahan";
          dispatch({
               type: TOPUP_FAILURE,
               error: errorMessage,
          });
     }
};
