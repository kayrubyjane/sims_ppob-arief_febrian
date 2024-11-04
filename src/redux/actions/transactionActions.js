import axios from "axios";
import { baseUrl } from "../../api";
import {
     LOAD_HISTORY,
     LOAD_HISTORY_SUCCESS,
     LOAD_HISTORY_FAILURE,
} from "../types/actionTypes";

export const loadHistoryAction = (token, limit = 5) => async (dispatch) => {
     dispatch({ type: LOAD_HISTORY });
     try {
          const response = await axios.get(
               `${baseUrl}transaction/history?offset=0&limit=${limit}`,
               {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               }
          );
          dispatch({
               type: LOAD_HISTORY_SUCCESS,
               payload: response.data.data.records,
          });
     } catch (error) {
          dispatch({
               type: LOAD_HISTORY_FAILURE,
               error: error.message,
          });
     }
};
