import axios from "axios";
import { baseUrl } from "../../api";
import {
     PURCHASE_REQUEST,
     PURCHASE_SUCCESS,
     PURCHASE_FAILURE,
     RESET_PURCHASE_STATUS,
} from "../types/actionTypes";

export const purchaseAction = (serviceCode, token) => async (dispatch) => {
     dispatch({ type: PURCHASE_REQUEST });
     try {
          const response = await axios.post(
               `${baseUrl}transaction`,
               { service_code: serviceCode },
               {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               }
          );

          if (response.data.status === 0) {
               dispatch({ type: PURCHASE_SUCCESS });
          } else {
               dispatch({ type: PURCHASE_FAILURE, error: "Purchase failed" });
          }
     } catch (error) {
          dispatch({ type: PURCHASE_FAILURE, error: error.message });
     }
};

export const resetPurchaseStatus = () => ({
     type: RESET_PURCHASE_STATUS,
});